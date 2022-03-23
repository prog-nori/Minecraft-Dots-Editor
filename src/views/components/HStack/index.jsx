import React from 'react'

export const HStack = (props) => {
    const wrapperStyle = {
        // width: '100%',
        height: '100%',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center'
    }
    return (
        <div style={wrapperStyle} {...props}>
            {props.children}
        </div>
    )
}