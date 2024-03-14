import axios, { AxiosResponse, AxiosError } from "axios";

export interface ApiResponse<T = any> {
  data: T | null;
  error?: AxiosError<any> | undefined;
}

export default async function GET<T>(
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
    console.error(error);
    console.error(
      `Problem making a request to the Spotify API. Check - ${__filename}`
    );

    return {
      data: null,
      error: error as AxiosError<any>,
    };
  }
}
