import axios, { AxiosResponse, AxiosError } from "axios";

export async function GET<T>(
  accessToken: any,
  url: string,
): Promise<any> {
  try {
    const response: AxiosResponse<T> = await axios({
      method: "get",
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      data: response,
    };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError<any>,
    };
  }
}
