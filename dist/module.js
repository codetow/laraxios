let $81c1b644006d48ec$export$440ca1817514db88;
(function(LaravelMethod) {
    LaravelMethod["GET"] = "get";
    LaravelMethod["POST"] = "post";
    LaravelMethod["DELETE"] = "delete";
})($81c1b644006d48ec$export$440ca1817514db88 || ($81c1b644006d48ec$export$440ca1817514db88 = {}));


const $fab42eb3dee39b5b$export$b1ef46223b559f9d = (config)=>{
    const baseURL = config.baseURL?.trim();
    if (baseURL?.length && config.url && config.url[0] === "/") {
        const { origin: origin  } = new URL(baseURL);
        return `${origin}`;
    }
    return config.baseURL;
};
const $fab42eb3dee39b5b$export$697572e6b3df3226 = (data)=>{
    /**
   * Change the type of data.
   * @param val
   */ const changeType = (val)=>{
        if (val instanceof Blob) return val;
        else if (typeof val === "boolean") return val ? "1" : "0";
        else return `${val}`;
    };
    const formData = new FormData();
    if (data) Object.entries(data).forEach(([key, value])=>{
        // Iterate if array
        if (Array.isArray(value)) value.forEach((val, index)=>{
            formData.append(`${key}[${index}]`, changeType(val));
        });
        else formData.append(key, changeType(value));
    });
    return formData;
};
const $fab42eb3dee39b5b$export$425a08012e9acdfa = (config)=>{
    let data = {};
    let method = (0, $81c1b644006d48ec$export$440ca1817514db88).GET;
    // Set data according to the method...
    if (config.method === "post" || config.method === "put" || config.method === "patch") {
        const formData = $fab42eb3dee39b5b$export$697572e6b3df3226(config.data);
        // Laravel uses this field to recognize put and patch...
        formData.append("_method", config.method);
        data = formData;
        method = (0, $81c1b644006d48ec$export$440ca1817514db88).POST;
    } else if (config.method === "delete") {
        data = {};
        method = (0, $81c1b644006d48ec$export$440ca1817514db88).DELETE;
    }
    const newConfig = {
        ...config,
        method: method,
        params: config.params || {},
        data: data
    };
    if (newConfig.baseURL) newConfig.baseURL = $fab42eb3dee39b5b$export$b1ef46223b559f9d(config);
    return newConfig;
};
const $fab42eb3dee39b5b$export$7ec1ebcfa9d8bd6a = (config)=>{
    return {
        errorHandler: (error)=>console.error("LARAVEL API ERROR: " + (error?.response?.statusText || "Unknown")),
        ...config
    };
};


/**
 * Base request.
 * @param axios
 * @param axiosInstance
 * @param config
 */ const $62208318282b33db$var$request = async (axios, axiosInstance, config)=>{
    const c = (0, $fab42eb3dee39b5b$export$7ec1ebcfa9d8bd6a)(config);
    // Get the error handler and then remove it from the config...
    const errorHandler = c.errorHandler;
    delete c.errorHandler;
    try {
        return await axiosInstance.request((0, $fab42eb3dee39b5b$export$425a08012e9acdfa)(c));
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && errorHandler) {
            // Invoke error handler...
            errorHandler(error);
            // Resolve with error, since the error has been handled...
            return Promise.resolve(error.response);
        }
        return Promise.reject(error);
    }
};
var $62208318282b33db$export$2e2bcd8739ae039 = $62208318282b33db$var$request;


var $5c801b1e53b88a5f$export$2e2bcd8739ae039 = (axios, configuration)=>({
        axiosInstance: axios.create({
            withCredentials: true,
            headers: {
                Accept: "application/json"
            }
        }),
        request (config) {
            return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                ...configuration,
                ...config
            });
        },
        /**
   * GET Request.
   * @param url
   * @param config
   */ get (url, config) {
            return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                method: "get",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * POST Request.
   * @param url
   * @param data
   * @param config
   */ post (url, data, config) {
            return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                data: data,
                method: "post",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * PUT Request.
   * @param url
   * @param data
   * @param config
   */ put (url, data, config) {
            return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                data: data,
                method: "put",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * PATCH Request.
   * @param url
   * @param data
   * @param config
   */ patch (url, data, config) {
            return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                data: data,
                method: "patch",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * DELETE Request.
   * @param url
   * @param config
   */ delete (url, config) {
            return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                method: "delete",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        sanctum: {
            /**
     * Send /sanctum/csrf request.
     * @param url
     */ csrf (url) {
                if (url) return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                    ...configuration,
                    baseURL: "",
                    url: url
                });
                if (configuration?.baseURL) return (0, $62208318282b33db$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                    ...configuration,
                    url: "/sanctum/csrf-cookie"
                });
            }
        }
    });


var $149c1bd638913645$export$2e2bcd8739ae039 = (0, $5c801b1e53b88a5f$export$2e2bcd8739ae039);


export {$149c1bd638913645$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
