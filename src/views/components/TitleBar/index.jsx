import React from 'react'

const TitleBarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '40px',
    // backgroundColor: `${HEADER_BACKGROUND_COLOR}`,
    // borderBottom: 'solid 1px rgb(212, 212, 212)',
    padding: '0 15px',
    WebkitAppRegion: 'drag',
    // button: {
    //     WebkitAppRegion: 'no-drag !important',
    //     cursor: 'auto',
    // }
}

export const TitleBar = (props) => {
    return (
        <div style={TitleBarStyle} {...props}>
            {props.children}
        </div>
    )
}