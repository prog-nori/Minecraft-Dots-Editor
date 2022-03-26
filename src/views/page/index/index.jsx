import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Wrapper } from '@/views/components/wrapper'
import { VStack } from '@/views/components/VStack'
import { HStack } from '@/views/components/HStack'
import { Navigation, NavigationLink } from '@/views/components/Navigation'
import { Header, Title, ToolbarContent } from '@/views/components/Header'

import { fileUtil } from '@/functions/fileUtil'

import '@/assets/css/styles.css'

const Spacer = styled.div`
padding-top: 50px;
`

export const Index = () => {
    const [choseProject, setChoseProject] = useState({})
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(-1)

    const openProject = (aProject) => {
        setChoseProject(aProject)
    }

    const handleThen = () => {
        fileUtil.project.read.all()
        .then(resp => {
            const aList = []
            resp.map(anElement => {
                anElement.filePath = `${anElement.filePath}.json`
                aList.push(anElement)
            })
            setProjects(aList)
            // setProjects(resp)
        })
        return
    }
    useEffect(handleThen, [])

    const act = () => {
        alert('action')
    }

    return (
        <HStack>
            <Navigation observeProjects={handleThen}>
                {
                    projects.map((anElement, anIndex) => (
                    <NavigationLink
                        projectName={anElement.projectName}
                        filePath={anElement.filePath}
                        isSelected={selectedProject == anIndex}
                        handleClick={() => {
                            if(selectedProject != -1) {
                                // セーブ処理を行う
                            }
                            console.log(anElement)
                            setSelectedProject(anIndex)
                            openProject(anElement)
                        }}
                        key={anIndex} />
                    ))
                }
            </Navigation>
            <VStack className={'w-100 vh-100'}>
                <Header>
                    <Title>{choseProject.projectName || '名称未設定'}</Title>
                    {
                        selectedProject >= 0 && (
                            <HStack>
                                <ToolbarContent icon={faPlus} action={act} />
                            </HStack>
                        )
                    }
                </Header>
                <Spacer />
                <Wrapper background={'#ececec'}>
                </Wrapper>
            </VStack>
        </HStack>
    )
}