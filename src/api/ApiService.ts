import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import JwtService from "./JwtService";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      // headers: {
      //   Authorization: `Bearer ${}`,
      // },
    });
this.api.interceptors.request.use((config) => {
      const token = JwtService.getToken(); // get the token value from wherever you store it
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    this.api.interceptors.response.use(
      (res) => res,
      (err) => Promise.reject(err)
    );
  }

  public get(
    resource: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.api.get(resource, config);
  }

  public post(
    resource: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.api.post(resource, body, config);
  }

  public patch(
    resource: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.api.patch(resource, body, config);
  }

  public put(
    resource: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.api.put(resource, body, config);
  }

  public delete(
    resource: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.api.delete(resource, config);
  }
}

const apiService = new ApiService();

export default apiService;
