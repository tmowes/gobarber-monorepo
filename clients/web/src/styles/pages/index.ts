import Image from 'next/image'
import styled, { css } from 'styled-components'
import { Form as UnForm } from '@unform/web'

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'content image';
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  height: 100vh;
  width: 100%;
`

export const Content = styled.main`
  grid-area: 'content';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const Logo = styled(Image)`
  width: 24rem;
  height: auto;
`

export const Form = styled(UnForm)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8rem 0 2.4rem;
    > strong {
      font-size: 2.4rem;
      margin-bottom: 2.4rem;
    }
    > input {
      padding: 1.6rem;
      width: 34rem;
      border-radius: ${theme.radii.default};
      background: ${theme.colors.inputs};
      color: ${theme.colors.white};
      ::placeholder {
        color: ${theme.colors.grayHard};
      }
      + input {
        margin-top: 0.8rem;
      }
    }
  `}
`

export const Background = styled.div`
  grid-area: 'image';
  object-fit: cover;
  width: 100%;
  height: 100%;
  background: url('/signin-bg.png') no-repeat center;
  background-size: cover;
  mix-blend-mode: luminosity;
`
