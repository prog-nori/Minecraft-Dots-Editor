import React, { useEffect, useState } from 'react'
import request from 'superagent'
import { Wrapper } from '@/views/components/wrapper'
import { HStack } from '@/views/components/HStack'
import { Navigation, NavigationLink } from '@/views/components/Navigation'
// import { TitleBar } from '@/views/components/TitleBar'
import { Header } from '@/views/components/Header'

import { fileUtil } from '@/functions/fileUtil'

export const Index = () => {
    const [projects, setProjects] = useState([])

    const openThisProject = (aMessage) => {
        alert(aMessage)
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
                        handleClick={() => openThisProject(anElement.projectName)}
                        key={anIndex} />
                    ))
                }
            </Navigation>
            <Wrapper>
                {/* <TitleBar /> */}
                <Header>
                    <h1>ここがヘッダです。</h1>
                </Header>
                <p>{result}</p>
                <button onClick={ e => api() }>ひくわー</button>
            </Wrapper>
        </HStack>
    )
}