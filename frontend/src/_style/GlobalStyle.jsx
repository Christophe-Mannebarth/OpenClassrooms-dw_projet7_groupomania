import { createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectTheme } from '_helpers'

// COLORS
/* Creating a constant variable called colors
 * and assigning it to an object with properties.
 */
export const colors = {
  primary: '#FD2D01',
  secondary: '#FFD7D7',
  tertiary: '#4E5166',
  backgroundLight: '#F9F9FC',
  backgroundDark: '#4F4C6B',
  dark: '#212529',
  light: '#fff5f5',
  black: '#000000',
  white: '#ffffff',
  lightgrey: '#f1f1f4',
}

// Creating a styled component for the global style.
const StyledGlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif;
  }
  html {
    position: relative;
    min-height: 100%;
  }

  body {
    background-color: ${(props) =>
      props.isDarkMode ? `${colors.tertiary}` : `${colors.white}`};
    margin: 0 0 150px 0;
    padding: 0;
  }

  a {
    padding: 5px 5px;
    text-decoration: none;
    
  }

  .header-update,
  .header-publish,
  .header-login,
  .header-signup {
    background-color: ${(props) =>
      props.isDarkMode ? `${colors.dark}` : `${colors.light}`};
    color: ${(props) =>
      props.isDarkMode ? `${colors.white}` : `${colors.black}`};
  }

  //------------------------------ Header --------------------------//

  .navbar {
    background-color: ${(props) =>
      props.isDarkMode ? `${colors.dark}` : `${colors.light}`};
  }
  .navbar-collapse {
    flex-grow: inherit;
  }

//--------------------------------- Forms --------------------------//

  .form-login,
  .form-signup,
  .form-update,
  .form-publish {
    margin: auto;
    max-width: 540px;
  }

//------------------------------ Home Page --------------------------//

  .col-posts {
    max-width: 350px;
  }

  .img-posts {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-posts,
  .footer-posts {
    width: 100%;
    background-color: ${(props) =>
      props.isDarkMode ? `${colors.dark}` : `${colors.light}`};
    color: ${(props) =>
      props.isDarkMode ? `${colors.white}` : `${colors.black}`};
  }

  .content-posts {
    margin: 0;
    width: 100%;
  }

  //------------------------------ Post Page --------------------------//

  .card-post {
    background-color: ${(props) =>
      props.isDarkMode ? `${colors.dark}` : `${colors.light}`};
    border-color: ${(props) =>
      props.isDarkMode ? `${colors.white}` : `${colors.lightgrey}`};
  }

  .card-body-post {
    background-color: ${colors.white};
  }

  .col-post {
    width: auto;
    padding: 0;
  }

  .col-left-post {
    max-width: 100%;
  }

  .col-right-post {
    flex-direction: column;
    margin: 0;
  }

  .img-post {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-post,
  .footer-post {
    width: 100%;
    height: 35px;
    align-items: center;
    flex-direction: row;
    background-color: ${(props) =>
      props.isDarkMode ? `${colors.dark}` : `${colors.light}`};
    color: ${(props) =>
      props.isDarkMode ? `${colors.white}` : `${colors.black}`};
  }

  .content-post {
    margin: 0;
    width: 100%;
  }

  .author-post {
    width: 320px;
  }

  .container-links-post {
    background-color: ${colors.white};
  }

  .links-post {
    flex-direction: row;
    width: 65%;
  }

  .thumbs-post {
    justify-content: flex-end;
  }

  .button-thumb-up-post,
  .button-thumb-down-post {
    background-color: transparent;
    border: none;
    &:hover {
      background-color: transparent;
    }
  }
  
  .thumb-up-post {
    cursor: pointer;
    font-size: x-large;
    color: ${(props) =>
      props.isDarkMode ? `${colors.lightgrey}` : `${colors.tertiary}`};
    &:hover {
      transition: all 0.2s ease-in-out;
      color: royalblue!important;
    }
  }

  .thumb-down-post {
    cursor: pointer;
    font-size: x-large;
    color: ${(props) =>
      props.isDarkMode ? `${colors.lightgrey}` : `${colors.tertiary}`};
    &:hover {
      transition: all 0.2s ease-in-out;
      color: red!important;
    }
  }

  .tooltip-inner {
    text-align: left;
  }
  
  //------------------------------ Responsive --------------------------//

  @media(max-width:420px){
    .under-logo
    {
      flex-direction: column;
    }
  }

  @media(max-width:767px){
    .row
    {
      justify-content: center;
    }
    .links-post {
      width: 85%;
    }
  }

  @media(max-width:991px){
    .page-title,
    .page-subtitle {
      text-align: center;
    }
  }

  @media(min-width:992px){
    .page-title,
    .page-subtitle {
      text-align: right;
    }
    .col-left-post {
      padding-right: 0;
    }
    .col-right-post {
      padding-left: 0;
    }
  }
  `
/**
 * If the theme is dark, then set the isDarkMode prop to true,
 * otherwise set it to false.
 * @returns A styled component that is a global style.
 */
function GlobalStyle() {
  // Using the useSelector hook to get the theme from the Redux store.
  const theme = useSelector(selectTheme)
  // @ts-ignore
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

// EXPORT GLOBAL STYLE
export { GlobalStyle }
