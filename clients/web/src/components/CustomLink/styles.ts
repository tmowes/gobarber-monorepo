import Link from 'next/link'
import styled, { css } from 'styled-components'
import { CustomLinkVariantProps } from './types'

const variants = {
  white: css`
    ${({ theme }) => css`
      color: ${theme.colors.white};
      background: ${theme.colors.transparent};
    `}
  `,
  default: css`
    ${({ theme }) => css`
      color: ${theme.colors.orange};
      background: ${theme.colors.transparent};
    `}
  `,
}

export const Container = styled(Link)``

export const Content = styled.div<CustomLinkVariantProps>`
  ${({ variant }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${variant && variants[variant]};
  `}
`

export const Label = styled.span`
  margin-left: 0.8rem;
  &:hover {
    text-decoration: underline;
  }
`
