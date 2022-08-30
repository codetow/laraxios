import { AxiosError, AxiosRequestConfig } from "axios";
interface LaraxiosRequestConfig extends AxiosRequestConfig {
    errorHandler?: undefined | ErrorHandlerCallback;
}
type RequestDataValue = Array<number | string | boolean | Blob> | string | number | boolean | Blob;
type RequestData = {
    [key: string]: RequestDataValue;
};
interface ErrorHandlerCallback {
    (error: AxiosError): void;
}
declare const _default: (configuration?: LaraxiosRequestConfig) => {
    request(config?: LaraxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * GET Request.
     * @param url
     * @param config
     */
    get(url: string, config?: LaraxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * POST Request.
     * @param url
     * @param data
     * @param config
     */
    post(url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * PUT Request.
     * @param url
     * @param data
     * @param config
     */
    put(url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * PATCH Request.
     * @param url
     * @param data
     * @param config
     */
    patch(url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * DELETE Request.
     * @param url
     * @param config
     */
    delete(url: string, config?: LaraxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    sanctum: {
        /**
         * Send /sanctum/csrf request.
         * @param url
         */
        csrf(url?: string): Promise<import("axios").AxiosResponse<any, any>>;
    };
};
export default _default;

//# sourceMappingURL=types.d.ts.map
