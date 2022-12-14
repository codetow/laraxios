import { LaravelMethod, LaraxiosRequestConfig, RequestData, RequestDataValue, } from './types'
import { AxiosRequestConfig } from 'axios'

/**
 * Define baseURL for api based on a slash character as a first character.
 * @param config
 */
export const formatURL = (config: LaraxiosRequestConfig): string | undefined => {
  const baseURL = config.baseURL?.trim()
  if (baseURL?.length && config.url && config.url[0] === '/') {
    const { origin } = new URL(baseURL)
    return `${origin}`
  }

  return config.baseURL
}

/**
 * Convert regular values to acceptable FormData values.
 * @param data
 */
export const convertToFormData = (data: RequestData | undefined): FormData => {
  /**
   * Change the type of data.
   * @param val
   */
  const changeType = (val: RequestDataValue) => {
    if (val instanceof Blob) {
      return val
    } else if (typeof val === 'boolean') {
      return val ? '1' : '0'
    } else {
      return `${val}`
    }
  }

  const formData = new FormData()

  if (data) {
    Object.entries(data)
      .forEach(([key, value]) => {
        // Iterate if array
        if (Array.isArray(value)) {
          value.forEach((val, index) => {
            formData.append(`${key}[${index}]`, changeType(val))
          })
        } else {
          formData.append(key, changeType(value))
        }
      })
  }

  return formData
}

/**
 * Format the config that suits Laravel.
 * @param config
 */
export const requestFormatter = (config: LaraxiosRequestConfig): AxiosRequestConfig => {
  let data = {}
  let method = LaravelMethod.GET
  // Set data according to the method...
  if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
    const formData = convertToFormData(config.data)
    // Laravel uses this field to recognize put and patch...
    formData.append('_method', config.method)
    data = formData
    method = LaravelMethod.POST
  } else if (config.method === 'delete') {
    data = {}
    method = LaravelMethod.DELETE
  }

  const newConfig = {
    ...config,
    ...{
      method,
      params: config.params || {},
      data,
    }
  }

  if (newConfig.baseURL) {
    newConfig.baseURL = formatURL(config)
  }

  return newConfig
}

/**
 * Merge default configs with user configs.
 * @param config
 */
export const mergeConfig = (config: LaraxiosRequestConfig): LaraxiosRequestConfig => {
  return {
    ...{
      errorHandler: (error) => console.error('LARAVEL API ERROR: ' + (error?.response?.statusText || 'Unknown')),
    },
    ...config
  }
}
