import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { history, selectAuthUser } from '_helpers'

// PRIVATEROUTE
/* A function that takes in children as a parameter. */
function PrivateRoute({ children }) {
  // SELECTOR
  const authUser = useSelector(selectAuthUser)

  if (!authUser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />
  }

  // authorized so return child components
  return children
}

export { PrivateRoute }
