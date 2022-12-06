import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { history, authHeader, handleResponse } from '_helpers'
import axios from 'axios'

// create slice

const name = 'auth'
const initialState = createInitialState()
const reducers = createReducers()
const extraActions = createExtraActions()
const extraReducers = createExtraReducers()
const slice = createSlice({ name, initialState, reducers, extraReducers })

// implementation

function createInitialState() {
  return {
    user: null,
    error: null,
  }
}

function createReducers() {
  return {
    logout,
  }

  function logout(state) {
    state.user = null
    history.navigate('/login')
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/auth`

  return {
    login: login(),
    signup: signup(),
  }

  function login() {
    return createAsyncThunk(`${name}/login`, async ({ email, password }) => {
      try {
        const response = await axios.post(
          `${baseUrl}/login`,
          { email, password },
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

  function signup() {
    return createAsyncThunk(
      `${name}/signup`,
      async ({ username, email, password }) => {
        try {
          const response = await axios.post(
            `${baseUrl}/signup`,
            { username, email, password },
            {
              headers: authHeader(baseUrl),
            }
          )
          return handleResponse(response)
        } catch (error) {
          return handleResponse(error.response)
        }
      }
    )
  }
}

function createExtraReducers() {
  return {
    ...login(),
    ...signup(),
  }

  function login() {
    const { pending, fulfilled, rejected } = extraActions.login
    return {
      [pending]: (state) => {
        state.error = null
      },
      [fulfilled]: (state, action) => {
        state.user = action.payload
        // get return url to home page
        history.navigate('/')
      },
      [rejected]: (state, action) => {
        state.error = action.error
      },
    }
  }

  function signup() {
    const { pending, fulfilled, rejected } = extraActions.signup
    return {
      [pending]: (state) => {
        state.error = null
      },
      [fulfilled]: (state, action) => {
        state.user = action.payload
        // get return url to home page
        history.navigate('/')
      },
      [rejected]: (state, action) => {
        state.error = action.error
      },
    }
  }
}

// exports

export const authActions = { ...slice.actions, ...extraActions }
export const authReducer = slice.reducer
