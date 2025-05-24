import React, { useState } from 'react'
import { Button, Input, Modal } from "antd"
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import "./sideBar.css"
import SideContent from './SideContent'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ListSearch from '../customList/ListSearch'
import postService from '../../api/service/postService'

const SideBar = ({ collapse }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [dataRequest, setDataRequest] = useState([])
    const [search, setSearch] = useState(false)
    const [tagSearch, setTagSearch] = useState(false)
    const navigate = useNavigate()

    const onCancel = () => {
        setModalOpen(false)
    }

    const onSearch = (text) => {
        setDataRequest([])
        setTagSearch(true)
        if(text.target.value == ""){
            setDataRequest([])
        }
        postService.searchPost({ text: text.target.value }).then((res) => {
            setDataRequest(res)
        })
        // axiosRequest({ text: text.target.value })
        //     .then((res) => {
        //         setDataRequest(res.data)
        //     })
    }

    const onSearchTag = (tag) => {
        setDataRequest([])
        setSearch(true)
        console.log(tag.target.value)
        postService.searchPost("", String(tag.target.value)).then((res) => {
            console.log(res)
        })
    }

    return (
        <>
            <Modal className="modalSearch" title="Поиск" open={modalOpen} footer={null} onCancel={onCancel}>

                <Input
                    onChange={onSearch}
                    onBlur={() => setTagSearch(false)}
                    disabled={search}
                    style={{ marginBottom: 20 }}
                />
                <label>
                    <span>По тэгам: </span>
                    <Input
                        style={{ width: 150 }}
                        onChange={onSearchTag}
                        onBlur={(e) => {
                            setSearch(false)
                        }}

                        disabled={tagSearch}
                    ></Input>
                </label>

                <div style={{ marginTop: 14 }}>
                    <ListSearch cancel={onCancel} props={dataRequest ? dataRequest : []} />
                </div>
            </Modal>
            <div className={`containerSideBar${collapse ? "-collapse" : ""}`}>
                <div className={`sideBar${collapse ? "-collapse" : ""}`}>
                    <div className={`containerImg${collapse ? "-collapse" : ""}`}>
                        <a href="/main"><img src={collapse ? "/logoSmall.svg" : "/logo.svg"} alt="SoulTrack" /></a>
                    </div>
                    <div className="containerContent">
                        <div className="containerAdvancedFeature">
                            <div className={`containerSearchField${collapse ? "-collapse" : ""}`}>
                                {collapse
                                    ? ((<Button
                                        className={`searchField${collapse ? "-collapse" : ""}`}
                                    ><SearchOutlined /></Button>))
                                    : (<Button
                                        onClick={() => setModalOpen(true)}
                                        className="searchField"
                                        icon={<SearchOutlined />}
                                    >Поиск</Button>)}
                            </div>
                            <div className={`containerButtonField${collapse ? "-collapse" : ""}`}>
                                {collapse
                                    ? ((<Button
                                        className={`buttonField${collapse ? "-collapse" : ""}`}
                                        onClick={() => { navigate("/createPost") }}
                                    ><PlusOutlined /></Button>))
                                    : (<Button
                                        className="buttonField"
                                        icon={<PlusOutlined />}
                                        onClick={() => { navigate("/createPost") }}
                                    >Добавить</Button>)}

                            </div>
                        </div>

                        <div className="containerMainContent">
                            <div className="mainContent">
                                <SideContent collapse={collapse} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SideBar