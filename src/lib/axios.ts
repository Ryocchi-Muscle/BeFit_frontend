import useApiClient from "@/hooks/useApiClient";

const useApi = () => {
  const client = useApiClient();

  const post = (url: string, body: any) => client.post(url, body);
  const del = (url: string) => client.delete(url);
  const get = (url: string) => client.get(url);
  const put = (url: string, body: any) => client.put(url, body);

  return { post, del, get, put };
};

export default useApi;
