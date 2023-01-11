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
export const payloadAdapter = (data: RequestData | undefined): FormattedData => {
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
        if (value instanceof File || value instanceof Blob) {
          Object.assign(formattedData, { [key]: value })
        }
        if (Array.isArray(value)) {
          value.forEach((val, index) => {
            Object.assign(formattedData, { [`${key}[${index}]`]: changeType(val) })
          })
        } else if (typeof value === 'object' && value !== null) {
          Object.keys(value).forEach((k) => {
            const valueKeyed = value ? value[k] : ''
            Object.assign(formattedData, { [`${key}[${k}]`]: changeType(valueKeyed) })
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
  let data: object | FormData = {}
  let method = LaravelMethod.GET
  // Set data according to the method...
  if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
    if (config.data instanceof FormData) {
      data = config.data
      if (config.method !== 'post' && data instanceof FormData) {
        data.append('_method', config.method)
      }
    } else {
      if (config.method !== 'post') {
        Object.assign(data, { _method: config.method })
      }
      Object.assign(data, payloadAdapter(config.data))
    }
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
