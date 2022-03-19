import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/views/components/Buttons'
import { VStack } from '@/views/components/VStack'
import { HStack } from '@/views/components/HStack'

import {
    fileUtil
} from '@/functions/fileUtil'

// import '@/assets/css/overlay.css';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const CreateNewProject = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [projectnameCaptionIsShow, setProjectnameCaptionIsShow] = useState(false);
    const [filenameCaptionIsShow, setFilenameCaptionIsShow] = useState(false);
    const vStackStyle = {
        boxSizing: 'content-box',
        maxWidth: '288px',
        margin: '0 auto'
    }
    const projectnameRef = useRef(null)
    const filenameRef = useRef(null)

    const handleClose = () => {
        setIsOpen(false)
        setProjectnameCaptionIsShow(false)
        setFilenameCaptionIsShow(false)
    }

    const handleClick = () => {
        if(projectnameRef.current.value && filenameRef.current.value) {
            fileUtil.project.create({
                projectName: projectnameRef.current.value,
                fileName: filenameRef.current.value
            }).then(res => {
                alert('プロジェクトを作成しました。')
                handleClose()
            })
            return
        }
        if(!projectnameRef.current.value) {
            setProjectnameCaptionIsShow(true)
        }
        if(!filenameRef.current.value) {
            setFilenameCaptionIsShow(true)
        }
        alert('入力に不備があります。')
    }

    return (
        <Wrapper>
            <Button type="small" icon={ faPlus } color="#000" minWidth={50} onClick={() => setIsOpen(true)} />
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleClose}
            overlayClassName={{
                base: "overlay-base",
                afterOpen: "overlay-after",
                beforeClose: "overlay-before"
            }}
            className={{
                base: "content-base",
                afterOpen: "content-after",
                beforeClose: "content-before"
            }}
            closeTimeoutMS={200}>
                <h2 style={{ boxSizing: 'content-box', fontSize: '28px', margin: '46px 0' }}>新規プロジェクトの作成</h2>
                <div style={{ boxSizing: 'content-box', margin: '32px 0 46px', padding: '0 10px' }}>
                    <VStack style={vStackStyle}>
                        <HStack>
                            <h3 className="label">プロジェクト名</h3>
                            { projectnameCaptionIsShow && <caption>*必須項目</caption> }
                        </HStack>
                        <input
                            type="text"
                            ref={projectnameRef}
                            placeholder='プロジェクト名'/>
                    </VStack>
                    <VStack style={vStackStyle}>
                        <HStack>
                            <h3 className="label">ファイル名</h3>
                            { filenameCaptionIsShow && <caption>*必須項目</caption> }
                        </HStack>
                        <input
                            type="text"
                            ref={filenameRef}
                            placeholder='ファイル名'/>
                    </VStack>
                    <button id={'create-project'} className={'submit'} onClick={() => {
                        handleClick()
                        props.handleThen()
                    }}>プロジェクトを作成</button>
                </div>
            </Modal>
        </Wrapper>
    )
}