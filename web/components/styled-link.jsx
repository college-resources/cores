import { forwardRef } from 'react'
import Link from 'next/link'
import { styled } from '@material-ui/core/styles'

function StyledLink(props, ref) {
  const { children, href } = props

  const A = styled('a')(({ theme }) => ({
    color: theme.palette.mode === 'dark' && '#00b0f4',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  }))

  return (
    <Link href={href} passHref>
      <A href={href} ref={ref}>
        {children}
      </A>
    </Link>
  )
}

export default forwardRef(StyledLink)
