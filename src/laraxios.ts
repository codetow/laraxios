import { LaraxiosInstance, LaraxiosRequestConfig, RequestData } from './types'
import laraxiosRequest from './request'
import { AxiosStatic } from 'axios'

export default (axios: AxiosStatic, configuration?: LaraxiosRequestConfig): LaraxiosInstance => {
  /**
   * Axios instance.
   */
  const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      Accept: 'application/json'
    }
  })

  /**
   * Basic request.
   * @param config
   */
  const request = (config?: LaraxiosRequestConfig) => {
    return laraxiosRequest(axios, axiosInstance, { ...configuration, ...config })
  }
  /**
   * GET Request.
   * @param url
   * @param config
   */
  const get = (url: string, config?: LaraxiosRequestConfig) => {
    return request({
      url,
      method: 'get',
      ...{ ...configuration, ...config }
    })
  }

  /**
   * POST Request.
   * @param url
   * @param data
   * @param config
   */
  const post = (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => {
    return request({
      url,
      data,
      method: 'post',
      ...{ ...configuration, ...config }
    })
  }
  /**
   * PUT Request.
   * @param url
   * @param data
   * @param config
   */
  const put = (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => {
    return request({
      url,
      data,
      method: 'put',
      ...{ ...configuration, ...config }
    })
  }
  /**
   * PATCH Request.
   * @param url
   * @param data
   * @param config
   */
  const patch = (
    url: string,
    data?: RequestData,
    config?: LaraxiosRequestConfig
  ) => {
    return request({
      url,
      data,
      method: 'patch',
      ...{ ...configuration, ...config }
    })
  }

  /**
   * DELETE Request.
   * @param url
   * @param config
   */
  const del = (url: string, config?: LaraxiosRequestConfig) => {
    return request({
      url,
      method: 'delete',
      ...{ ...configuration, ...config }
    })
  }

  const sanctum = {
    /**
     * Send /sanctum/csrf request.
     * @param url
     */
    csrf: (url?: string) => {
      if (url) {
        return request({ ...configuration, baseURL: '', url })
      }
      if (configuration?.baseURL) {
        return request({ ...configuration, url: '/sanctum/csrf-cookie' })
      }
    }
  }

  return {
    axiosInstance,
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    sanctum
  }
}
