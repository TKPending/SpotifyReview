import axios, { AxiosResponse, AxiosError } from "axios";

export interface NextResponse<T = any> {
  status: number;
  data: T | null;
  error?: AxiosError<any> | undefined;
}

export async function GET<T>(
  accessToken: any,
  url: string,
): Promise<NextResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      status: response.status, 
      data: response.data,
    };
  } catch (error) {
    return {
      status: (error as AxiosError).response?.status || 500,
      data: null,
      error: error as AxiosError<any>,
    };
  }
}