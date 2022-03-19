import React from 'react'
// import { css } from '@linaria/core'
import styled from 'styled-components'

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export const VStack = (props) => {
    return (
        <StyledDiv {...props}>{props.children}</StyledDiv>
    )
}