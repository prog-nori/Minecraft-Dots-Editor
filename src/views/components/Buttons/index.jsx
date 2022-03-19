import React from 'react'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { VStack } from '@/views/components/VStack'

const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 7px;
    border-radius: 4px;
    transition: background-color .2s;
    &:hover {
        // background-color: rgb(233, 235, 236);
        // background-color: rgb(218, 220, 221);
        background-color: rgba(196, 196, 198, 0.5);
    }
`

const Icon = ({
    icon,
    style={},
    onClick,
    minWidth
}) => {
    return (
        <StyledIcon style={{
            minWidth: minWidth? minWidth: 'auto'
        }} onClick={onClick}>
            <FontAwesomeIcon style={style} icon={icon} />
        </StyledIcon>
    )
}

const IconLabel = styled.span`
font-size: 10px;
color: #252525;
margin: 3px 0 5px;
text-align: center;
cursor: default;
`

const StyledIconWrapper = styled.div`
display: flex;
align-items: center;
padding: 5px;
user-select: none;
-webkit-user-select: none;
`

const SmallButton = ({
    icon,
    children,
    color,
    minWidth,
    onClick,
    isActive=false }) => {
    return (
        <StyledIconWrapper>
            <VStack>
                <Icon icon={icon} style={{
                    width: '12px',
                    height: '12px',
                    color: color
                }}
                minWidth={minWidth}
                onClick={onClick} />
                {children}
            </VStack>
        </StyledIconWrapper>
    )
}

const LargeButton = ({
    icon,
    children,
    color,
    minWidth,
    onClick,
    isActive=false }) => {
    return (
        <StyledIconWrapper>
            <VStack>
                <Icon icon={icon} style={{
                    width: '100%',
                    height: '12px',
                    color: color
                }}
                minWidth={minWidth}
                onClick={onClick} />
                {children}
            </VStack>
        </StyledIconWrapper>
    )
}

export const Button = ({
    type,
    icon,
    children,
    color='rgb(75, 77, 77)',
    onClick,
    minWidth=undefined
    }) => {
    if(type == 'large') {
        // テキストの幅に合わせて横長なボタンを作る\
        return (
            <LargeButton
                icon={icon}
                color={color}
                minWidth={minWidth}
                onClick={onClick}>
                {children && <IconLabel>{children}</IconLabel>}
            </LargeButton>
        )
    } else if (type == 'small') {
        // 正方形のボタンを作る
        return (
            <SmallButton
                icon={icon}
                color={color}
                minWidth={minWidth}
                onClick={onClick}>
                {/* {children} */}
                {children && <IconLabel>{children}</IconLabel>}
            </SmallButton>
        )
    } else if (type == 'show') {
        // 正方形のボタンを作る
        const size = '32px'
        return (
            <StyledIconWrapper>
                <VStack>
                    <svg
                    viewBox="0 0 233.30078125 159.98291015625"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ic-9ba7b6 layout-box"
                    style={{
                        width: size,
                        height: size,
                        color: 'rgb(75, 77, 77)'
                    }}>
                        <g transform="matrix(1 0 0 1 46.33783935546876 115.221435546875)">
                            <path d="M 28.5156 10.4492 L 112.061 10.4492 C 122.656 10.4492 128.174 4.98047 128.174 -5.46875 L 128.174 -64.8926 C 128.174 -75.3418 122.656 -80.8105 112.061 -80.8105 L 28.5156 -80.8105 C 17.9688 -80.8105 12.4512 -75.3906 12.4512 -64.8926 L 12.4512 -5.46875 C 12.4512 4.98047 17.9688 10.4492 28.5156 10.4492 Z M 29.1504 0.732422 C 24.6582 0.732422 22.168 -1.61133 22.168 -6.34766 L 22.168 -64.0137 C 22.168 -68.75 24.6582 -71.0938 29.1504 -71.0938 L 51.416 -71.0938 L 51.416 0.732422 Z M 111.426 -71.0938 C 115.918 -71.0938 118.408 -68.75 118.408 -64.0137 L 118.408 -6.34766 C 118.408 -1.61133 115.918 0.732422 111.426 0.732422 L 60.6445 0.732422 L 60.6445 -71.0938 Z M 41.8457 -53.2227 C 43.6035 -53.2227 45.0684 -54.7363 45.0684 -56.3965 C 45.0684 -58.0566 43.6035 -59.5215 41.8457 -59.5215 L 31.8359 -59.5215 C 30.0781 -59.5215 28.6133 -58.0566 28.6133 -56.3965 C 28.6133 -54.7363 30.0781 -53.2227 31.8359 -53.2227 Z M 41.8457 -40.0879 C 43.6035 -40.0879 45.0684 -41.5527 45.0684 -43.2617 C 45.0684 -44.9219 43.6035 -46.3867 41.8457 -46.3867 L 31.8359 -46.3867 C 30.0781 -46.3867 28.6133 -44.9219 28.6133 -43.2617 C 28.6133 -41.5527 30.0781 -40.0879 31.8359 -40.0879 Z M 41.8457 -27.002 C 43.6035 -27.002 45.0684 -28.418 45.0684 -30.127 C 45.0684 -31.7871 43.6035 -33.2031 41.8457 -33.2031 L 31.8359 -33.2031 C 30.0781 -33.2031 28.6133 -31.7871 28.6133 -30.127 C 28.6133 -28.418 30.0781 -27.002 31.8359 -27.002 Z" />
                        </g>
                    </svg>
                    {children && <IconLabel>{children}</IconLabel>}
                </VStack>
            </StyledIconWrapper>
        )
    } else {
        // その他が与えられたらタイポさん召喚
        return (
            <span style={{
                color: 'red',
                fontSize: 24,
                fontWeight: 'bold'
            }}>Missing "type" attribute in a Button Component</span>
        )
    }
}