import React, { useEffect, useState } from 'react'
import request from 'superagent'
import styled from 'styled-components'

import { Wrapper } from '@/views/components/wrapper'
import { VStack } from '@/views/components/VStack'
import { HStack } from '@/views/components/HStack'
import { Navigation, NavigationLink } from '@/views/components/Navigation'
// import { TitleBar } from '@/views/components/TitleBar'
import { Header, Title } from '@/views/components/Header'

import { fileUtil } from '@/functions/fileUtil'

const Spacer = styled.div`
padding-top: 50px;
`

export const Index = () => {
    const [choseProject, setChoseProject] = useState({})
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(-1)

    const openThisProject = (aProject) => {
        setChoseProject(aProject)
    }

    const handleThen = () => {
        fileUtil.project.read.all()
        .then(resp => setProjects(resp))
        return
    }
    useEffect(handleThen, [])

    const [result, setResult] = useState('')
    const api = () => {
        request.get('api/kuji').end((err, res) => {
            if (err) {
                console.log(err)
                return
            }
            const result = res.body.result
            setResult(result)
        })
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
                            setSelectedProject(anIndex)
                            openThisProject(anElement)
                        }}
                        key={anIndex} />
                    ))
                }
            </Navigation>
            <VStack className={'w-100 vh-100'}>
                <Header>
                    <Title>{choseProject.projectName || '名称未設定'}</Title>
                </Header>
                <Spacer />
                {/* <Wrapper background={'#f2f4f5'}> */}
                <Wrapper background={'#ececec'}>
                    {/* <p>{result}</p>
                    <button onClick={ e => api() }>ひくわー</button> */}
                </Wrapper>
            </VStack>
        </HStack>
    )
}