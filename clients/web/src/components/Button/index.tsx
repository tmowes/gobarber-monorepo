import { Container } from './styles'
import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
)

export default Button
