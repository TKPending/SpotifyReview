import axios, { AxiosResponse, AxiosError } from "axios";

export interface ApiResponse<T = any> {
  data: T | null;
  error?: AxiosError<any> | undefined;
}

export async function GET<T>(
  accessToken: any,
  url: string,
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      data: response.data,
    };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError<any>,
    };
  }
}
