import Axios from "./axios";

const GetService = async ({ route, params }: { route: string; params?: {} }) =>
  await Axios.get(route, { params: params });

const PostService = async ({
  route,
  params,
  body = {},
}: {
  route: string;
  params?: any;
  body?: {};
}) => {
  const response = await Axios.post(route, body, { params: params });
  return response;
};

const DeleteService = async ({
  route,
  params,
}: {
  route: string;
  params?: any;
  body?: any;
}) => {
  const response = await Axios.delete(route, { params });
  return response;
};

const PutService = async ({
  route,
  params,
  body,
}: {
  route: string;
  params?: any;
  body?: any;
}) => {
  const response = await Axios.put(route, body, { params });
  return response;
};

export { PostService, DeleteService, GetService, PutService };
