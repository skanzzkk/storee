import axios from 'axios';

export class AxiosInterceptor {
  //  @ts-expect-error environment variable may be missing
  private static readonly baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL;

  public static $get = async (endpoint: string) => {
    const { data } = await axios.get(AxiosInterceptor.baseURL + endpoint);
    return data;
  };

  public static $post = async (endpoint: string, data: any) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    console.log(AxiosInterceptor.baseURL);
    console.log(data);

    const { data: body } = await axios.post(AxiosInterceptor.baseURL + endpoint, data, { headers });
    return body;
  };

  constructor() {
    console.log('baseurl:', AxiosInterceptor.baseURL);
  }
}

new AxiosInterceptor();
