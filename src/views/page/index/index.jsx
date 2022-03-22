import React, { useEffect, useState } from 'react'
import request from 'superagent'
import { Wrapper } from '@/views/components/wrapper'
import { VStack } from '@/views/components/VStack'
import { HStack } from '@/views/components/HStack'
import { Navigation, NavigationLink } from '@/views/components/Navigation'
// import { TitleBar } from '@/views/components/TitleBar'
import { Header, Title } from '@/views/components/Header'

import { fileUtil } from '@/functions/fileUtil'

export const Index = () => {
    const [choseProject, setChoseProject] = useState({})
    const [projects, setProjects] = useState([])

    const openThisProject = (aProject) => {
        // alert(aMessage)
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
                        handleClick={() => openThisProject(anElement)}
                        key={anIndex} />
                    ))
                }
            </Navigation>
            <VStack className={'w-100'}>
                <Header>
                    <Title>{choseProject.projectName || '名称未設定'}</Title>
                </Header>
                <Wrapper>
                    <p>{result}</p>
                    <button onClick={ e => api() }>ひくわー</button>
                </Wrapper>
            </VStack>
        </HStack>
    )
}