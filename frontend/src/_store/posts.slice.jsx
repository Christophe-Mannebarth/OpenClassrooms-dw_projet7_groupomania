import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { history, authHeader, handleResponse } from '_helpers'
import axios from 'axios'

// Set the URL for the request to the API
const baseUrl = `${process.env.REACT_APP_API_URL}/posts`

// create slice

const name = 'posts'
const initialState = createInitialState()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const slice = createSlice({ name, initialState, extraReducers })

// implementation

function createInitialState() {
  return {
    createOne: {
      isCreated: null,
      error: null,
    },
    getAll: {
      isLoading: false,
      content: null,
      error: null,
    },
    getOne: {
      isLoading: false,
      content: null,
      error: null,
    },
    deleteOne: {
      isDeleted: null,
      error: null,
    },
    likeOne: {
      isLiked: null,
      likes: null,
      usersLiked: null,
      error: null,
    },
    dislikeOne: {
      isDisliked: null,
      dislikes: null,
      usersDisliked: null,
      error: null,
    },
    updateOne: {
      isUpdated: null,
      error: null,
    },
  }
}

function createExtraActions() {
  return {
    createPost: createPost(),
    getAllPosts: getAllPosts(),
    getOnePost: getOnePost(),
    deletePost: deletePost(),
    updatePost: updatePost(),
    likePost: likePost(),
    dislikePost: dislikePost(),
  }

  function createPost() {
    return createAsyncThunk(`${name}/createOne`, async ({ formData }) => {
      try {
        const response = await axios.post(`${baseUrl}`, formData, {
          headers: authHeader(baseUrl),
        })
        return handleResponse(response)
      } catch (error) {
        return handleResponse(error.response)
      }
    })
  }

  function getAllPosts() {
    return createAsyncThunk(`${name}/getAll`, async () => {
      try {
        const response = await axios.get(`${baseUrl}`, {
          headers: authHeader(baseUrl),
        })
        return handleResponse(response)
      } catch (error) {
        return handleResponse(error.response)
      }
    })
  }

  function getOnePost() {
    return createAsyncThunk(`${name}/getOne`, async ({ postId }) => {
      try {
        const response = await axios.get(`${baseUrl}/${postId}`, {
          headers: authHeader(baseUrl),
        })
        return handleResponse(response)
      } catch (error) {
        return handleResponse(error.response)
      }
    })
  }

  function deletePost() {
    return createAsyncThunk(`${name}/deleteOne`, async ({ postId }) => {
      try {
        const response = await axios.delete(`${baseUrl}/${postId}`, {
          headers: authHeader(baseUrl),
        })
        return handleResponse(response)
      } catch (error) {
        return handleResponse(error.response)
      }
    })
  }

  function updatePost() {
    return createAsyncThunk(
      `${name}/updateOne`,
      async ({ postId, formData }) => {
        try {
          const response = await axios.put(`${baseUrl}/${postId}`, formData, {
            headers: authHeader(baseUrl),
          })
          return handleResponse(response)
        } catch (error) {
          return handleResponse(error.response)
        }
      }
    )
  }

  function likePost() {
    return createAsyncThunk(`${name}/likeOne`, async ({ postId, like }) => {
      try {
        const response = await axios.post(
          `${baseUrl}/${postId}/like`,
          { like },
          {
            headers: authHeader(baseUrl),
          }
        )
        return handleResponse(response)
      } catch (error) {
        return handleResponse(error.response)
      }
    })
  }

  function dislikePost() {
    return createAsyncThunk(`${name}/dislikeOne`, async ({ postId, like }) => {
      try {
        const response = await axios.post(
          `${baseUrl}/${postId}/like`,
          { like },
          {
            headers: authHeader(baseUrl),
          }
        )
        return handleResponse(response)
      } catch (error) {
        return handleResponse(error.response)
      }
    })
  }
}

function createExtraReducers() {
  return {
    ...createPost(),
    ...getAllPosts(),
    ...getOnePost(),
    ...deletePost(),
    ...updatePost(),
    ...likePost(),
    ...dislikePost(),
  }

  function createPost() {
    const { pending, fulfilled, rejected } = extraActions.createPost
    return {
      [pending]: (state) => {
        state.createOne = { error: null }
      },
      [fulfilled]: (state, action) => {
        state.createOne = { isCreated: action.payload }
      },
      [rejected]: (state, action) => {
        state.createOne = { error: action.error }
      },
    }
  }

  function getAllPosts() {
    const { pending, fulfilled, rejected } = extraActions.getAllPosts
    return {
      [pending]: (state) => {
        state.getAll = { isLoading: true }
        state.createOne = { isCreated: null }
        state.deleteOne = { isDeleted: null }
        state.updateOne = { isUpdated: null }
        state.getOne = { content: null }
      },
      [fulfilled]: (state, action) => {
        state.getAll = { isLoading: false, content: action.payload }
      },
      [rejected]: (state, action) => {
        state.getAll = { error: action.error }
      },
    }
  }

  function getOnePost() {
    const { pending, fulfilled, rejected } = extraActions.getOnePost
    return {
      [pending]: (state) => {
        state.getOne = { isLoading: true }
      },
      [fulfilled]: (state, action) => {
        state.getOne = { isLoading: false, content: action.payload.post }
        state.likeOne = {
          isLiked: action.payload.isLiked,
          likes: action.payload.likes,
          usersLiked: action.payload.usersLiked,
        }
        state.dislikeOne = {
          isDisliked: action.payload.isDisliked,
          dislikes: action.payload.dislikes,
          usersDisliked: action.payload.usersDisliked,
        }
      },
      [rejected]: (state, action) => {
        state.getOne = { error: action.error }
      },
    }
  }

  function deletePost() {
    const { pending, fulfilled, rejected } = extraActions.deletePost
    return {
      [pending]: (state) => {
        state.deleteOne = { error: null }
      },
      [fulfilled]: (state, action) => {
        state.deleteOne = { isDeleted: action.payload }
        history.navigate('/')
      },
      [rejected]: (state, action) => {
        state.deleteOne = { error: action.error }
      },
    }
  }

  function updatePost() {
    const { pending, fulfilled, rejected } = extraActions.updatePost
    return {
      [pending]: (state) => {
        state.updateOne = { error: null }
        state.getAll = { content: null }
      },
      [fulfilled]: (state, action) => {
        state.updateOne = { isUpdated: action.payload }
        state.getOne = { content: action.payload }
        // history.navigate('/')
      },
      [rejected]: (state, action) => {
        state.updateOne = { error: action.error }
      },
    }
  }

  function likePost() {
    const { pending, fulfilled, rejected } = extraActions.likePost
    return {
      [pending]: (state) => {
        state.likeOne = { error: null }
      },
      [fulfilled]: (state, action) => {
        state.likeOne = {
          isLiked: action.payload.isLiked,
          likes: action.payload.likes,
          usersLiked: action.payload.usersLiked,
        }
      },
      [rejected]: (state, action) => {
        state.likeOne = { error: action.error }
      },
    }
  }

  function dislikePost() {
    const { pending, fulfilled, rejected } = extraActions.dislikePost
    return {
      [pending]: (state) => {
        state.dislikeOne = { error: null }
      },
      [fulfilled]: (state, action) => {
        state.dislikeOne = {
          isDisliked: action.payload.isDisliked,
          dislikes: action.payload.dislikes,
          usersDisliked: action.payload.usersDisliked,
        }
      },
      [rejected]: (state, action) => {
        state.dislikeOne = { error: action.error }
      },
    }
  }
}

// exports

export const postsActions = { ...slice.actions, ...extraActions }
export const postsReducer = slice.reducer
