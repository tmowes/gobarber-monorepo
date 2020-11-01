import React from 'react'

import { Container, ErrorIcon } from './styles'
import { TooltipProps } from './types'

const Tooltip: React.FC<TooltipProps> = ({ title, children, className }) => {
  return (
    <Container className={className}>
      <ErrorIcon size={20} />
      {children}
      <span>{title}</span>
    </Container>
  )
}

export default Tooltip
