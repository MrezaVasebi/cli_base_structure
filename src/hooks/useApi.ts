import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { fileHeader, headers, MethodTypeEnum } from "../services/network";
import { DEV_MODE } from "../utils";

type HeaderType = "normal" | "image";

type onInvokeApiAsyncProps = {
  data: any;
  url: string;
  method: MethodTypeEnum;
  headerType: HeaderType;
};

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onInvokeApiAsync = async <T>(props: Partial<onInvokeApiAsyncProps>) => {
    setLoading(true);

    let config: AxiosRequestConfig = {
      url: props.url,
      data: props.data,
      method: props.method,
      headers: {
        ...(props.headerType === "normal" || !props.headerType
          ? headers
          : fileHeader),
      },
    };

    try {
      const response = await axios.request(config);
      if (response && response.status === 200 && response.data) {
        return response.data as Promise<T>;
      }

      throw new Error("request failed");
    } catch (error: any) {
      const errResponse = error?.response?.data;
      if (DEV_MODE) console.log(JSON.stringify(errResponse, null, 2));
      return errMsgByCode(errResponse.code);
    } finally {
      setLoading(false);
    }
  };

  const errMsgByCode = (errorCode: number): string => {
    switch (errorCode) {
      case 500:
        return "Internal server error";
      case 401:
        return "Unauthorized access";
      case 403:
        return "Forbidden access";
      case 422:
        return "Unprocessable entity";
      default:
        return "An error occurred on the server";
    }
  };

  return {
    loading,
    onInvokeApiAsync,
  };
};
