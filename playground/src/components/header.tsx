import * as React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: relative;
  margin-bottom: 0.25rem;

  & > h1 {
    font-size: 1.25rem;
    margin-right: 0.5rem;
    display: inline-block;
  }
  & > a {
    font-size: 1rem;
    text-decoration: none;
    color: tomato;
  }
`

interface HeaderProps {
  name: string;
  href: string;
}

export const Header: React.FC<HeaderProps> = ({ name, href }) => (
  <HeaderContainer>
    <h1>{name}</h1>
    <a href={href}>github →</a>
  </HeaderContainer>
)