import express from 'express';

import * as postController from '../controllers/postController';
import { validateToken } from '../middleware/validateToken';

const router = express.Router();

router.use(validateToken);

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;
