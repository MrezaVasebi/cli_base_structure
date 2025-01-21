import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { headers, MethodTypeEnum, uploadHeader } from "../services/network";
import { DEV_MODE } from "../utils";

type HeaderType = "normal" | "image";

type onCallApiProps = {
  data: any;
  url: string;
  method: MethodTypeEnum;
  headerType: HeaderType;
};

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onInvokeApi = async <T>(props: Partial<onCallApiProps>) => {
    setLoading(true);

    let config: AxiosRequestConfig = {
      url: props.url,
      data: props.data,
      method: props.method,
      headers: {
        ...(props.headerType === "normal" || !props.headerType
          ? headers
          : uploadHeader),
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
    let msg: string;
    switch (errorCode) {
      case 500:
        msg = "";
      case 401:
        msg = "";
      case 403:
        msg = "";
      case 422:
        msg = "";
      default:
        msg = "errorInServer";
    }
    return msg;
  };

  return {
    loading,
    onInvokeApi,
  };
};
