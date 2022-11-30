import { store, authActions } from '_store'

// helper functions for the Auth header
// and the responses to the requests to the API

// The auth header handler
export function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = authToken()
  const isAdmin = authIsAdmin()
  const isLoggedIn = !!token
  const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${token} ${isAdmin}` }
  } else {
    return {}
  }
}
// The Token handler
function authToken() {
  return store.getState().auth.user?.token
}
// The isAdmin handler
function authIsAdmin() {
  return store.getState().auth.user?.isAdmin
}

// The response handler
export function handleResponse(response) {
  try {
    const data = response.data

    if (response.statusText !== 'OK') {
      if ([401, 403].includes(response.status) && authToken()) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        const logout = () => store.dispatch(authActions.logout())
        logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  } catch (error) {
    return Promise.reject(
      'Impossible de joindre le serveur, verifiez votre réseau'
    )
  }
}
