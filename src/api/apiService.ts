import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { stringify } from "query-string";
import { ApiResponse } from "./types";

export class ApiService {
  private instance: AxiosInstance | null = null;

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      timeout: 20000,
      ...config,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });

    this.instance.interceptors.response.use(
      (response) => {
        return { data: response } as any;
      },
      (error) => {
        console.log("apiError", error);
        return Promise.resolve({
          data: {
            error: new Error(error?.message || error),
          },
        });
      }
    );
  }

  public async get<R = any, P = any>(
    endpoint: string,
    params?: P,
    config?: AxiosRequestConfig
  ) {
    const query = params && stringify(params);

    const response = await this.instance!.get<ApiResponse<R>>(
      endpoint + (query ? `?${query}` : ""),
      config
    );

    return response.data;
  }
}
