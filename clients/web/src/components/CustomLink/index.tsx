import { useTheme } from 'styled-components'
import { Container, Content, Label } from './styles'
import { CustomLinkProps } from './types'

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  variant = 'default',
  label,
  icon: Icon,
  size = 20,
}) => {
  const { colors } = useTheme()
  return (
    <Container href={href}>
      <Content variant={variant}>
        {Icon && <Icon size={size} color={colors.orange} />}
        <Label>{label}</Label>
      </Content>
    </Container>
  )
}

export default CustomLink
