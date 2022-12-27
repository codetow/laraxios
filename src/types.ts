import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LaraxiosRequestConfig extends AxiosRequestConfig {
  errorHandler?: undefined | ErrorHandlerCallback
}

export interface LaraxiosResponse<T = any, D = any> extends AxiosResponse {
}

export type RequestDataValue =
    Array<number | string | boolean | Blob>
    | string
    | number
    | boolean
    | Blob

export type RequestData = { [key: string]: RequestDataValue }

export enum LaravelMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete'
}

export interface ErrorHandlerCallback {
  (error: AxiosError<any>): void
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
