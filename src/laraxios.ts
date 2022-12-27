import { LaraxiosInstance, LaraxiosRequestConfig, RequestData } from './types'
import laraxiosRequest from './request'
import { AxiosStatic } from 'axios'

export default (axios: AxiosStatic, configuration?: LaraxiosRequestConfig): LaraxiosInstance => ({
  axiosInstance: axios.create({
    withCredentials: true,
    headers: {
      Accept: 'application/json'
    }
  }),
  request (config?: LaraxiosRequestConfig) {
    return laraxiosRequest(axios, this.axiosInstance, { ...configuration, ...config })
  },
  /**
   * GET Request.
   * @param url
   * @param config
   */
  get (url: string, config?: LaraxiosRequestConfig) {
    return laraxiosRequest(axios, this.axiosInstance, {
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
  post (url: string, data?: RequestData, config?: LaraxiosRequestConfig) {
    return laraxiosRequest(axios, this.axiosInstance, {
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
  put (url: string, data?: RequestData, config?: LaraxiosRequestConfig) {
    return laraxiosRequest(axios, this.axiosInstance, {
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
  ) {
    return laraxiosRequest(axios, this.axiosInstance, {
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
  delete (url: string, config?: LaraxiosRequestConfig) {
    return laraxiosRequest(axios, this.axiosInstance, {
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
    csrf (url?: string) {
      if (url) {
        return laraxiosRequest(axios, this.axiosInstance, { ...configuration, baseURL: '', url })
      }
      if (configuration?.baseURL) {
        return laraxiosRequest(axios, this.axiosInstance, { ...configuration, url: '/sanctum/csrf-cookie' })
      }
    }
  }
})
