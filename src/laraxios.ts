import { ApiResponse, LaraxiosInstance, LaraxiosRequestConfig, RequestData } from './types'
import laraxiosRequest from './request'
import { AxiosResponse } from 'axios'

export default (configuration?: LaraxiosRequestConfig): LaraxiosInstance => ({
  request (config?: LaraxiosRequestConfig) {
    return laraxiosRequest({ ...configuration, ...config })
  },
  /**
   * GET Request.
   * @param url
   * @param config
   */
  get (url: string, config?: LaraxiosRequestConfig): Promise<AxiosResponse> {
    return laraxiosRequest({
      url,
      method: 'get',
      ...{ ...configuration, ...config }
    })
  },
  /**
   * POST Request.
   * @param url
   * @param data
   * @param params
   * @param config
   */
  post (url: string, data?: RequestData, params?: object, config?: LaraxiosRequestConfig): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
      data,
      params,
      method: 'post',
      ...{ ...configuration, ...config }
    })
  },
  /**
   * PUT Request.
   * @param url
   * @param data
   * @param params
   * @param config
   */
  put (url: string, data?: RequestData, params?: object, config?: LaraxiosRequestConfig): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
      data,
      params,
      method: 'put',
      ...{ ...configuration, ...config }
    })
  },
  /**
   * PATCH Request.
   * @param url
   * @param data
   * @param params
   * @param config
   */
  patch (
    url: string,
    data?: RequestData,
    params?: object,
    config?: LaraxiosRequestConfig
  ): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
      data,
      params,
      method: 'patch',
      ...{ ...configuration, ...config }
    })
  },
  /**
   * DELETE Request.
   * @param url
   * @param params
   * @param config
   */
  delete (url: string, params?: object, config?: LaraxiosRequestConfig): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
      params,
      method: 'delete',
      ...{ ...configuration, ...config }
    })
  },
  sanctum: {
    /**
     * Send /sanctum/csrf request.
     * @param url
     */
    csrf (url?: string): Promise<ApiResponse> | void {
      if (url) {
        return laraxiosRequest({ ...configuration, baseURL: '', url })
      }
      if (configuration?.baseURL) {
        return laraxiosRequest({ ...configuration, url: '/sanctum/csrf-cookie' })
      }
    }
  }
})
