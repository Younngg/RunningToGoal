import axios, { AxiosRequestConfig } from 'axios';
import type { PostReqType } from '../types/post';

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const postApi = {
  getPosts: async () => {
    const { data } = await axios.get('posts');
    return data.data;
  },
  getPostById: async (id: string) => {
    const { data } = await axios.get(`posts/${id}`);
    return data.data;
  },
  createPost: (post: PostReqType) => {
    return axios.post('posts', post);
  },
  updatePost: (id: string, post: PostReqType | { current: number }) => {
    return axios.put(`posts/${id}`, post);
  },
  deletePost: (id: string) => {
    return axios.delete(`posts/${id}`);
  },
};
