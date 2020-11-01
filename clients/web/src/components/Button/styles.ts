import styled, { css } from 'styled-components'

export const Container = styled.button`
  ${({ theme: { colors, radii } }) => css`
    background: ${colors.orange};
    color: ${colors.background};
    border-radius: ${radii.default};
    /* text-transform: uppercase; */
    font-size: 2.4rem;
    font-weight: 500;
    height: 5.6rem;
    padding: 1.6rem 2rem;
    width: 100%;
    margin: 1.6rem 0;
    transition: background-color 0.2s;
    &:hover {
      background: ${colors.orangeHover};
    }
  `}
`
