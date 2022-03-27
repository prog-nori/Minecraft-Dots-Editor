import React from 'react'
import styled from 'styled-components'

import { Wrapper } from '@/views/components/wrapper'
import { TitleBar } from '@/views/components/TitleBar'
import { CreateNewProject } from '@/views/components/CreateNewProject'

export const NavigationLink = ({projectName, handleClick, isSelected=false}) => {
    const StyledNavigationLink = styled.div`
        width: 100%;
        border-radius: 7px;
        padding: 10px 20px;
        background: ${isSelected? 'rgb(0, 122, 255)': 'none'};
        color: ${isSelected? '#fff': '#333'};
        transition: background .2s;
        &:hover {
            cursor: pointer;
            /* background-color: ${isSelected? 'rgb(0, 92, 191)': '#dfe0e1'}; */
            background-color: ${isSelected? 'rgb(0, 122, 255)': '#dfe0e1'};
        }
    `
    return (
        <StyledNavigationLink onClick={handleClick}>
            {projectName}
        </StyledNavigationLink>
    )
}

const Spacer = styled.div`
padding-top: 50px;
`

/**
 * 再度ナビゲーションを構築する。propsはdataを持ち、dataは「プロジェクト名とファイルパスが格納されたオブジェクト」をラップした配列である。
 * @param {*} props 
 * @returns 
 */
export const Navigation = (props) => {
    const navigationStyle = {
        width: '90%',
        maxWidth: '250px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // background: '#f2f4f5',
        background: '#fafafa',
        // borderRight: 'solid 1px #e7e8e9'
        borderRight: 'solid 1px #d4d4d4'
    }
    return (
        <div style={navigationStyle} {...props}>
            <TitleBar />
            <Spacer />
            <Wrapper>
                {props.children}
                <Spacer />
                <CreateNewProject handleThen={() => props.observeprojects()} />
                <Spacer />
            </Wrapper>
        </div>
    )
}