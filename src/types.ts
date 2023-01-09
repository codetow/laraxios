import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ErrorHandlerCallback<T = unknown, D = any> {
  (error: AxiosError<T, D>): void
}

export interface LaraxiosRequestConfig extends AxiosRequestConfig {
  errorHandler?: undefined | ErrorHandlerCallback
}

export type LaraxiosResponse<T = any, D = any> = AxiosResponse<T, D>

export type RequestDataValue =
    Array<number | string | boolean | Blob>
    | string
    | number
    | boolean
    | Blob

export type RequestData = { [key: string]: RequestDataValue }

export interface FormattedData {
  [key: string]: string | Blob
}

export enum LaravelMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete'
}

export interface LaraxiosInstance {
  get(url: string, config?: LaraxiosRequestConfig): Promise<LaraxiosResponse>;

  patch(
      url: string,
      data?: RequestData,
      config?: LaraxiosRequestConfig
  ): Promise<LaraxiosResponse>;

  request(config?: LaraxiosRequestConfig): Promise<LaraxiosResponse>;

  axiosInstance: AxiosInstance;

  post(
      url: string,
      data?: RequestData,
      config?: LaraxiosRequestConfig
  ): Promise<LaraxiosResponse>;

  sanctum: { csrf(url?: string): Promise<LaraxiosResponse> };

  delete(url: string, config?: LaraxiosRequestConfig): Promise<LaraxiosResponse>;

  put(
      url: string,
      data?: RequestData,
      config?: LaraxiosRequestConfig
  ): Promise<LaraxiosResponse>;
}
