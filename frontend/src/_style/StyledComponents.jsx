import styled, { keyframes } from 'styled-components'
import { fadeIn, zoomIn } from 'react-animations'
import { colors } from '_style'

/* It's a styled component: a div for the Loader */
export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

/* It's a styled component: a title */
export const PageTitle = styled.h1`
  font-size: 33px;
  margin: 0;
  color: ${({ theme }) =>
    theme === 'light' ? `${colors.secondary}` : `${colors.black}`};
  text-shadow: ${({ theme }) =>
    theme === 'light'
      ? `2px 2px 1px ${colors.black}`
      : `2px 2px 2px ${colors.white}`};
`

/* It's a styled component: a subtitle */
export const PageSubtitle = styled.h2`
  font-size: 16px;
  font-weight: 300;
  padding-bottom: 30px;
  color: ${({ theme }) =>
    theme === 'light' ? `${colors.light}` : `${colors.white}`};
  text-shadow: ${({ theme }) =>
    theme === 'light'
      ? `2px 2px 1px ${colors.black}`
      : `2px 2px 2px ${colors.black}`};
`

/* A styled div for the Logo */
export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
`
/* A styled component for the image. */
export const HomeLogo = styled.img`
  width: 280px;
`
/* A styled div for the welcome text and the  Night Mode button */
export const ContainerUnderLogo = styled.div`
  margin-top: 2px;
  display: flex;
`
/* It's a styled component for the HeaderWelcome. */
export const HeaderWelcome = styled.h1`
  margin: 0;
  text-align: left;
  font-size: 18px;
  width: auto;
  color: ${({ theme }) =>
    theme === 'light' ? `${colors.black}` : `${colors.white}`};
`
/* Creating a styled component for the night mode button. */
export const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`
/* It's a styled component for the HeaderWelcome. */
export const NightModeText = styled.h2`
  margin: 0;
  text-align: left;
  font-size: 14px;
  width: 100px;
  color: ${({ theme }) =>
    theme === 'light' ? `${colors.black}` : `${colors.white}`};
`
/* Creating a styled component for the footer. */
export const FooterContainer = styled.footer`
  background-color: ${({ theme }) =>
    theme === 'light' ? `${colors.light}` : `${colors.dark}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
`
/* It's a styled component for the FooterTitle. */
export const FooterTitle = styled.h6`
  margin: auto;
  max-width: auto;
  color: ${({ theme }) =>
    theme === 'light' ? `${colors.black}` : `${colors.white}`};
`
/* Creating a styled div called EmptyListContainer. */
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`
/* A styled component: a h1 title called EmptyTitle. */
export const EmptyTitle = styled.h1`
  color: ${({ theme }) =>
    theme === 'light' ? `${colors.black}` : `${colors.white}`};
`
/* A styled component: a h3 subtitle called EmptySubTitle. */
export const EmptySubTitle = styled.h3`
  color: ${({ theme }) =>
    theme === 'light' ? `${colors.black}` : `${colors.white}`};
  font-weight: normal;
`
/* Creating a styled component: an image  called EmptyIllustration. */
export const EmptyIllustration = styled.img`
  margin: 30px 0;
`
/* Creating a styled component: a div with fade in effect */
const fadeInAnimation = keyframes`${fadeIn}`
export const FadeInSection = styled.section`
  animation: 2s ${fadeInAnimation};
`
/* Creating a styled component: a div with fade in right effect */
const zoomInAnimation = keyframes`${zoomIn}`
export const ZoomInSection = styled.section`
  animation: 0.5s ${zoomInAnimation};
`
