import { create, Data, db, update } from '../models/db';
import type { Post, PostInput } from '../types/posts';

export const createPost = async ({ title, goal, unit }: PostInput) => {
  const post = create<Post>({ title, goal, unit, current: 0 });

  db.data?.posts.push(post);
  await db.write();

  return post;
};

export const findPosts = () => {
  return db.data?.posts;
};

export const findPost = (predicate: (post: Post) => boolean) => {
  return db.data?.posts.find(predicate);
};

export const updatePost = async (post: Post, postValue: Partial<Post>) => {
  update<Post>(Object.assign(post, postValue));

  await db.write();

  return post;
};

export const deletePost = async (postToDelete: Post) => {
  const filteredPosts = db.data?.posts.filter(
    (post) => post.id !== postToDelete.id
  )!;

  (db.data as Data).posts = filteredPosts;

  await db.write();

  return postToDelete;
};
