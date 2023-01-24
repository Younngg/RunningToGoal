import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  remove,
  Database,
} from 'firebase/database';
import { firebaseApp } from './firebase';
import axios, { AxiosRequestConfig } from 'axios';
import type { PostReqType } from '../types/goal';

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    console.log(config);

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

class PostRepository {
  db: Database;
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  syncPosts(userId: string, onUpdate: any) {
    const postsRef = ref(this.db, `${userId}/posts/`);
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      data && onUpdate(data);
    });
    return () => off(postsRef);
  }

  savePost(userId: string, post: any) {
    set(ref(this.db, `${userId}/posts/${post.id}`), post);
  }

  removePost(userId: string, id: any) {
    remove(ref(this.db, `${userId}/posts/${id}`));
  }
}

export default PostRepository;
