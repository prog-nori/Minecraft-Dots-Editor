import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Header = (props) => {
    const wrapperStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        background: '#fafafa',
        padding: '0 15px',
        borderBottom: 'solid 1px #d4d4d4',
        WebkitAppRegion: 'drag',
        zIndex: 10,
    }
    return (
        <div style={wrapperStyle} {...props}>
            {props.children}
        </div>
    )
}

export const ToolbarContent = (props) => {
    const Padding = styled.div`
    padding: 12px;
    `
    const Box = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #d4d4d4;
    }
    `
    const style = {
        width: '12px',
        height: '12px',
        color: '#333'
    }
    return (
        <Padding>
            <Box onClick={() => {
                props.action()
                }}>
                <FontAwesomeIcon style={style || {}} icon={props.icon} />
            </Box>
        </Padding>
    )
}