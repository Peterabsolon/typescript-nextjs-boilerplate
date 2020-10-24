import { FC } from 'react'
import NextLink from 'next/link'
import { observer } from 'mobx-react-lite'
import { Link as LinkComponent } from 'rebass'

interface LinkProps {
  to: string
}

export const Link: FC<LinkProps> = observer(({ to, children }) => {
  return (
    <NextLink href={to}>
      <LinkComponent href={to}>{children}</LinkComponent>
    </NextLink>
  )
})
