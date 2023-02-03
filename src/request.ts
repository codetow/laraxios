import { LaraxiosRequest, LaraxiosRequestConfig, LaraxiosResponse } from './types'
import { AxiosInstance, AxiosStatic } from 'axios'
import { mergeConfig, requestFormatter } from './utils'

/**
 * Base request.
 * @param axios
 * @param axiosInstance
 * @param config
 */
const request: LaraxiosRequest =
  async (axios: AxiosStatic, axiosInstance: AxiosInstance, config: LaraxiosRequestConfig)
    : Promise<LaraxiosResponse> => {
    const c = mergeConfig(config)

    // Get the error handler and then remove it from the config...
    const errorHandler = c.errorHandler
    delete c.errorHandler

    try {
      return await axiosInstance.request(requestFormatter(c))
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && errorHandler) {
        // Invoke error handler...
        errorHandler(error)

        // Resolve with error, since the error has been handled...
        return Promise.resolve(error.response)
      }

      return Promise.reject(error)
    }
  }

export default request
