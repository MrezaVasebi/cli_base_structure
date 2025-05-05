import axios, { AxiosRequestConfig } from "axios";
import { storage } from "../modules";
import { DEV_MODE, STORAGE_KEY } from "../utils";

interface IApiParams {
  token?: string;
  isMultoPart?: boolean;
  isTokenRequired?: boolean;
  options: AxiosRequestConfig;
}

interface IApiResponse<T> {
  data: T | null;
  errMsg: string | null;
  statusCode: number | null;
}

export const handleApiAsync = async <T>(
  params: IApiParams
): Promise<IApiResponse<T>> => {
  const { token, options, isTokenRequired, isMultoPart } = params;

  const headers = {
    Accept: "application/json",
    "Content-Type": isMultoPart ? "multipart/form-data" : "application/json",
  };

  if (token) {
    options.headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  } else if (isTokenRequired) {
    const Token = await storage<string>(STORAGE_KEY.token_key).readData();
    if (!Token) {
      return {
        data: null,
        statusCode: null,
        errMsg: "Token is null",
      };
    }

    options.headers = {
      ...headers,
      Authorization: `Bearer ${Token}`,
    };
  }

  try {
    const { data, status } = await axios.request(options);
    if (!data || status !== 200) {
      return {
        data: null,
        statusCode: null,
        errMsg: "Error in api",
      };
    }

    return {
      data,
      errMsg: null,
      statusCode: status,
    };
  } catch (error: any) {
    const errData = error?.response?.data;
    if (DEV_MODE) {
      console.log(errData);
    }

    const errStatus: number = errData?.status;
    return {
      data: null,
      statusCode: errStatus,
      errMsg: getErrMsgByCode(errStatus),
    };
  }
};

const getErrMsgByCode = (errorCode: number): string => {
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
