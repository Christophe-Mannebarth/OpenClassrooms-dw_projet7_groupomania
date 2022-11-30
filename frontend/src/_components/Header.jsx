import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '_store'
import * as themeActions from '_store'
import LightLogo from '../assets/logo-white-900x145.png'
import DarkLogo from '../assets/logo-black-900x145.png'
import { selectTheme, selectAuthUser } from '_helpers'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
  ContainerLogo,
  ContainerUnderLogo,
  HomeLogo,
  NightModeButton,
  NightModeText,
  HeaderWelcome,
  StyledLink,
} from '_style'

// HEADER
/**
 * Returns a Navbar that contains logo and links and
 * contains a NightModeButton component that has an onClick event listener
 * that calls the toggle action from the themeActions.
 * The appearance of the logo and that of the color of the text
 * change depending on whether the theme is Dark or Light.
 * The links change depending on whether the user is connected or not.
 * @returns A React component
 */
function Header() {
  // SELECTORS
  const theme = useSelector(selectTheme)
  const authUser = useSelector(selectAuthUser)

  // Logout action
  const dispatch = useDispatch()
  const logout = () => dispatch(authActions.logout())

  // only show the nav link "logout" when logged in
  return (
    <Navbar
      className="shadow navbar"
      collapseOnSelect
      expand="lg"
      variant={theme === 'light' ? 'light' : 'dark'}
      sticky="top"
    >
      <Container>
        <ContainerLogo>
          {/* The logo */}
          <HomeLogo
            src={theme === 'light' ? DarkLogo : LightLogo}
            alt="Logo Groupomania"
            title="Logo de l'entreprise Groupomania"
          />
          <ContainerUnderLogo className="under-logo">
            {/* The welcome message */}
            <HeaderWelcome theme={theme}>
              {authUser && <>Bienvenue {authUser?.userName}!</>}
            </HeaderWelcome>
            {/* The toggle theme button */}
            <NightModeButton onClick={() => dispatch(themeActions.toggle())}>
              <NightModeText theme={theme}>
                Thème : {theme === 'light' ? '☀️' : '🌙'}
              </NightModeText>
            </NightModeButton>
          </ContainerUnderLogo>
        </ContainerLogo>

        {/* The links */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* If not loggued in*/}
          {!authUser && (
            <Nav className="me-auto" defaultActiveKey="/">
              <Nav.Item>
                <StyledLink theme={theme} to="/login">
                  Connexion
                </StyledLink>
              </Nav.Item>
            </Nav>
          )}
          {/* If loggued in */}
          {authUser && (
            <Nav className="me-auto" defaultActiveKey="/">
              <Nav.Item>
                <StyledLink theme={theme} to="/">
                  Lecture
                </StyledLink>
              </Nav.Item>
              <Nav.Item>
                <StyledLink theme={theme} to="/publish">
                  Publication
                </StyledLink>
              </Nav.Item>
              <Nav.Item>
                <StyledLink theme={theme} to="" onClick={() => logout()}>
                  Déconnexion
                </StyledLink>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export { Header }
