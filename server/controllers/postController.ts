import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as postService from '../services/postService';
import { createError, createResponse } from '../utils/responseUtils';
import { POST_VALIDATION_ERRORS } from '../utils/validator';
import type { PostInput } from '../types/posts';

export const createPost = async (req: Request, res: Response) => {
  const { title, unit, goal }: PostInput = req.body;

  if (title) {
    const post = await postService.createPost({
      title,
      goal,
      unit,
      current: 0,
    });

    return res.status(StatusCodes.OK).send(createResponse(post));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(POST_VALIDATION_ERRORS.INVALID_VALUE));
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const { countOnly } = req.query;

  const posts = postService.findPosts();

  if (posts) {
    if (countOnly) {
      return res.status(StatusCodes.OK).send(createResponse(posts.length));
    }
    return res.status(StatusCodes.OK).send(createResponse(posts));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(POST_VALIDATION_ERRORS.POST_SOMETHING_WRONG));
  }
};

export const getPostById = (req: Request, res: Response) => {
  const { id: postId } = req.params;

  const post = postService.findPost((post) => post.id === postId);

  if (post) {
    return res.status(StatusCodes.OK).send(createResponse(post));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(POST_VALIDATION_ERRORS.POST_SOMETHING_WRONG));
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { title, current, goal, unit } = req.body;

  const post = postService.findPost((post) => post.id === postId);

  if (post) {
    await postService.updatePost(post, { title, current, goal, unit });

    return res.status(StatusCodes.OK).send(createResponse(post));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(POST_VALIDATION_ERRORS.POST_SOMETHING_WRONG));
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id: postId } = req.params;

  const post = postService.findPost((post) => post.id === postId);

  if (!post) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(POST_VALIDATION_ERRORS.POST_SOMETHING_WRONG));
  }

  await postService.deletePost(post);

  return res.status(StatusCodes.OK).send(createResponse(null));
};
