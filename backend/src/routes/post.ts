// IMPORT PACKAGES
import express from 'express'

// USE THE ROUTER FUNCTION OF EXPRESS MODULE
const router = express.Router()

// IMPORT AUTHENTICATION MIDDLEWARE
import auth from '../middleware/auth'

// IMPORT MULTER CONFIGURATION MIDDLEWARE
import multer from '../middleware/multer-config'

// IMPORT POST CONTROLLER
import {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/post'

// POST ROUTES
/**
 * pass the authentication middleware as an argument,
 * in order to protect "post" routes.
 * For the "createPost" and "modifyPost" pass the multer middleware,
 * for handling the incoming images.
 * then pass the "post" controller for each route.
 */
router.post('/', auth, multer, createPost)
router.get('/', auth, getAllPosts)
router.get('/:id', auth, getOnePost)
router.put('/:id', auth, multer, updatePost)
router.delete('/:id', auth, deletePost)
router.post('/:id/like', auth, multer, likePost)

// EXPORT POST ROUTES
export default router
