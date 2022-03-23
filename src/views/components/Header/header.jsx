import React from 'react'

export const Header = (props) => {
    const wrapperStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '50px',
        display: 'flex',
        // background: '#fff',
        background: '#fafafa',
        padding: '0 15px',
        borderBottom: 'solid 1px #d4d4d4',
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