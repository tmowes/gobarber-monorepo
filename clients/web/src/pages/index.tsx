/* eslint-disable no-console */
import React, { useCallback, useRef } from 'react'
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { MetaTags, Button, CustomLink, Input } from '~/components'
import { Background, Container, Content, Logo, Form } from '~/styles/pages'

const Login = () => {
  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(
    async (data: { email: string; password: string }) => {
      console.log('data', data)
    },
    [],
  )

  return (
    <Container>
      <MetaTags title="Login" />
      <Content>
        <Logo src="/logo.svg" unsized alt="GoBarber 2020" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <strong>Faça seu login</strong>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <CustomLink
            href="/forgot-password"
            variant="white"
            label="Esqueci minha senha"
          />
        </Form>
        <CustomLink href="/signup" icon={FiLogIn} label="Criar conta" />
      </Content>
      <Background />
    </Container>
  )
}

export default Login
