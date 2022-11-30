import { useSelector } from 'react-redux'
import { selectTheme } from '_helpers'

import { About, FooterContainer, FooterTitle } from '_style'

// FOOTER
/**
 * It's a function that returns a FooterContainer component that
 * contains a link .
 * @returns A function that returns a component.
 */
function Footer() {
  // SELECTOR
  const theme = useSelector(selectTheme)

  return (
    <FooterContainer className="shadow-lg" theme={theme}>
      <FooterTitle theme={theme}>
        Powered by ©
        <About />
        2022
      </FooterTitle>
    </FooterContainer>
  )
}

export { Footer }
