import React from 'react'
import styled from 'styled-components'

import { Wrapper } from '@/views/components/wrapper'
import { TitleBar } from '@/views/components/TitleBar'
import { CreateNewProject } from '@/views/components/CreateNewProject'

export const NavigationLink = ({projectName, filePath, handleClick}) => {
    const StyledNavigationLink = styled.div`
        width: 100%;
        border-radius: 7px;
        padding: 10px 20px;
        transition: background .2s;
        &:hover {
            cursor: pointer;
            background-color: #dfe0e1;
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
        backgroundColor: '#f2f4f5',
        borderRight: 'solid 1px #e7e8e9'
    }
    return (
        <div style={navigationStyle} {...props}>
            <TitleBar />
            <Spacer />
            <Wrapper>
                {props.children}
                <Spacer />
                <CreateNewProject handleThen={() => props.observeProjects()} />
                <Spacer />
            </Wrapper>
        </div>
    )
}