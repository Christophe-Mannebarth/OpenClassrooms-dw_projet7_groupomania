import { Link } from 'react-router-dom'
import { colors } from '_style'
import styled from 'styled-components'

/* Creating a styled link */
export const StyledLink = styled(Link)`
  color: ${({ theme }) => (theme === 'light' ? '#4E5166' : '#ffffff')};
  font-size: 18px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    border-radius: 50px;
    background-color: ${colors.primary};
    color: ${colors.light};
  }
  ${(props) =>
    props.$isPostsCardLink &&
    `border-radius: 50px;
    background-color: ${colors.tertiary};
    color: ${colors.light};
    font-size: 14px;
    display: block;
    margin: auto;
    width: 85px;
    &:hover {
    transition: all 0.2s ease-in-out;
    background-color: ${colors.primary};
    color: ${colors.light};
    }`}
`

export function About() {
  return (
    // 👇️ Link to the dev website 👇️
    <a href="https://chris-info-service.fr/" target="_blank" rel="noreferrer">
      Chris Info Service
    </a>
  )
}
