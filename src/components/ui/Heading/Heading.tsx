import React, { FC, ElementType } from 'react'
import { observer } from 'mobx-react-lite'
import { Box, BoxProps } from 'rebass'
import styled from 'styled-components'

export interface HeadingProps extends BoxProps {
  tag?: 'h2' | 'h3' | 'h4'
}

const StyledBox = styled(Box)`
  h2 {
    font-size: 19px;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 20px;
    font-weight: 500;
  }
` as typeof Box

export const Heading: FC<HeadingProps> = observer(({ tag = 'h2', children, ...rest }) => {
  const Tag = tag as ElementType

  return (
    <StyledBox display="inline-block" {...rest}>
      <Tag>{children}</Tag>
    </StyledBox>
  )
})
