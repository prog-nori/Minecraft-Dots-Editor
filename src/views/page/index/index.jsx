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
    console.log('on load')
    const [choseProject, setChoseProject] = useState({})
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState(-1)
    const [isEdited, setIsEdited] = useState(false)

    const openProject = (aProject) => {
        fileUtil.project.read.byName({fileName: aProject.filePath})
        .then(response => {
            setChoseProject(response)
        })
    }

    const updateNavigationContents = () => {
        console.log('after')
        fileUtil.project.read.all()
        .then(resp => {
            console.log('then')
            setProjects(resp)
        })
        .catch(err => console.log('エラー', err))
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
    useEffect(() => updateNavigationContents(), [])

    const addSheet = () => {
        const row = Array(10)
        row.fill(-1)
        const field = Array(10)
        field.fill(row)
        const keys = Object.keys(choseProject.sheets)
        let len = keys.length + 1
        // 同名のシートがあれば重複がなくなるまで探す[ (O(N) ]
        while(keys.find(aKey => aKey == `Sheet-${len}`)) {
            len++
        }
        choseProject.sheets[`Sheet-${len}`] = field
        setIsEdited(true)
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
                            if(selectedProject == anIndex) {
                                // すでに開いているプロジェクトと同じなら以降の処理をスキップ
                                return
                            }else if(selectedProject != -1 && isEdited) {
                                // セーブ処理を行う
                                const doSave = window.confirm('変更を保存しますか？')
                                if(doSave) {
                                    fileUtil.project.update({
                                        fileName: projects[selectedProject].filePath,
                                        anObject: choseProject
                                    })
                                } else return
                            }
                            setSelectedProject(anIndex)
                            openProject(anElement)
                            setIsEdited(false)
                            console.log('before')
                            updateNavigationContents()
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
                                <ToolbarContent icon={faPlus} action={addSheet} />
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