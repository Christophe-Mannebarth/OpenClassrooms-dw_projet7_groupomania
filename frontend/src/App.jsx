import { useNavigate, useLocation } from 'react-router-dom'
import { history } from '_helpers'
import { Header, Footer } from '_components'
import { AppRoutes } from '_routing'

import { GlobalStyle } from '_style'

function App() {
  // Init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate()
  history.location = useLocation()

  return (
    <div className="app-container">
      <GlobalStyle />
      <Header />
      <main className="container pt-4 pb-4">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export { App }
