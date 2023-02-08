import laraxios from './laraxios'
import { AxiosStatic } from 'axios'
import {
  LaraxiosInstance,
  LaraxiosResponse,
  LaraxiosRequestConfig,
  RequestData,
  RequestDataValue,
  LaravelMethod,
  ErrorHandlerCallback
} from './types'

export type {
  LaraxiosInstance,
  LaraxiosRequestConfig,
  LaraxiosResponse,
  RequestData,
  RequestDataValue,
  LaravelMethod,
  ErrorHandlerCallback
}

export default laraxios as (axios: AxiosStatic, configuration?: LaraxiosRequestConfig) => LaraxiosInstance
