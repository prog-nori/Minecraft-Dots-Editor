import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1`
width: 100%;
height: 50px;
line-height: 50px;
font-size: 12.5px;
color: #3e3d3d;
font-weight: medium;
`

export const Title = (props) => {
    return (
        <StyledTitle>{props.children}</StyledTitle>
    )
}