import React from 'react'

export const Wrapper = (props) => {
    console.log(props.background)
    const wrapperStyle = {
        width: '100%',
        height: '100%',
        padding: '0 10px 0',
        // padding: '40px 10px 0',
        background: props.background || 'none',
        overflowY: 'scroll',
    }
    return (
        <div style={wrapperStyle} {...props}>
            {props.children}
        </div>
    )
}