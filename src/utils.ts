import { FormattedData, LaravelMethod, LaraxiosRequestConfig, RequestData, RequestDataValue } from './types'
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
export const dataAdapter = (data: RequestData | undefined): FormattedData => {
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

  const formattedData = {}

  if (data) {
    Object.entries(data)
      .forEach(([key, value]) => {
        // Iterate if array
        if (Array.isArray(value)) {
          value.forEach((val, index) => {
            Object.assign(formattedData, { [`${key}[${index}]`]: changeType(val) })
          })
        } else {
          Object.assign(formattedData, { [key]: changeType(value) })
        }
      })
  }

  return formattedData
}

/**
 * Format the config that suits Laravel.
 * @param config
 */
export const requestFormatter = (config: LaraxiosRequestConfig): AxiosRequestConfig => {
  const data = {}
  let method = LaravelMethod.GET
  // Set data according to the method...
  if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
    // Laravel uses this field to recognize put and patch...
    if (config.method !== 'post') {
      Object.assign(data, { _method: config.method })
    }
    Object.assign(data, dataAdapter(config.data))
    method = LaravelMethod.POST
  } else if (config.method === 'delete') {
    Object.assign(data, { _method: 'delete' })
    method = LaravelMethod.DELETE
  }

  const newConfig = {
    ...config,
    ...{
      method,
      params: config.params || {},
      data
    }
  }

  if (newConfig.baseURL) {
    newConfig.baseURL = formatURL(config)
  }

  return newConfig
}

const laraxiosConfig = {
  errorHandler: (error) => console.error('LARAVEL API ERROR: ' + (error?.response?.statusText || 'Unknown'))
}

/**
 * Merge default configs with user configs.
 * @param config
 */
export const mergeConfig = (config: LaraxiosRequestConfig): LaraxiosRequestConfig => {
  return {
    ...laraxiosConfig,
    ...config
  }
}
