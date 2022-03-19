import React from 'react'

export const Header = (props) => {
    const wrapperStyle = {
        width: '100%',
        height: '50px',
        display: 'flex',
        background: '#fff',
        padding: '0 15px',
        borderBottom: 'solid 1px #e7e8e9',
        WebkitAppRegion: 'drag',
        // alignItems: 'center',
        // justifyContent: 'center'
    }
    return (
        <div style={wrapperStyle} {...props}>
            {props.children}
        </div>
    )
}