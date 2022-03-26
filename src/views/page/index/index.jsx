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
        fileUtil.project.read.byName({fileName: aProject.filePath})
        .then(response => {
            setChoseProject(response)
        })
    }

    const handleThen = () => {
        fileUtil.project.read.all()
        .then(resp => {
            setProjects(resp)
            setSelectedProject(0)
            openProject(resp[0])
        })
        return
    }
    useEffect(() => {
        fileUtil.project.read.all()
        .then(resp => setProjects(resp))
    }, [])

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
                        isSelected={selectedProject == anIndex}
                        handleClick={() => {
                            if(selectedProject != -1) {
                                // セーブ処理を行う
                            }
                            setSelectedProject(anIndex)
                            openProject(anElement)
                        }}
                        key={anIndex} />
                    ))
                }
            </Navigation>
            <VStack className={'w-100 vh-100'}>
                <Header>
                    <Title>{choseProject.name || '名称未設定'}</Title>
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