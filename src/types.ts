import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LaraxiosRequestConfig extends AxiosRequestConfig {
  errorHandler?: undefined | ErrorHandlerCallback
}

export interface LaraxiosResponse<T = any, D = any> extends AxiosResponse {}

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
