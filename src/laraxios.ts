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
   * @param config
   */
  post (url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
      data,
      method: 'post',
      ...{ ...configuration, ...config }
    })
  },
  /**
   * PUT Request.
   * @param url
   * @param data
   * @param config
   */
  put (url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
      data,
      method: 'put',
      ...{ ...configuration, ...config }
    })
  },
  /**
   * PATCH Request.
   * @param url
   * @param data
   * @param config
   */
  patch (
    url: string,
    data?: RequestData,
    config?: LaraxiosRequestConfig
  ): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
      data,
      method: 'patch',
      ...{ ...configuration, ...config }
    })
  },
  /**
   * DELETE Request.
   * @param url
   * @param config
   */
  delete (url: string, config?: LaraxiosRequestConfig): Promise<ApiResponse> {
    return laraxiosRequest({
      url,
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
