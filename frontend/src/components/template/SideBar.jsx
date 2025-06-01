import { useState } from 'react'
import { Button, Input, Modal, notification, Typography } from "antd"
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import "./sideBar.css"
import SideContent from './SideContent'
import { Link, useNavigate } from 'react-router-dom'
import ListSearch from '../customList/ListSearch'
import postService from '../../api/service/postService'
import axios from 'axios'

const SideBar = ({ collapse }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [dataRequest, setDataRequest] = useState([])
    const [api, contextHolder] = notification.useNotification()
    const [modal, contextHolderModalPost] = Modal.useModal()
    const navigate = useNavigate()

    const onCancel = () => {
        setModalOpen(false)
    }

    const logOutRequest = () => {
        axios({
            method: "get",
            url: "https://personal-diary-s9tr.onrender.com/user/logout",
            withCredentials: true
        })
            .then((res) => {
                if (res.statusText === "OK") {
                    api.success({
                        message: "Успешно!",
                        description: "Вы успешно вышли их аккаунта",
                        showProgress: true,
                    })
                }
                navigate(0)
            })
            .catch(() => {
                api.error({
                    message: "Ошибка!",
                    description: "Произошла ошибка!",
                    showProgress: true,
                })
            })
    }

    const onSearch = (text) => {
        const textReq = text.target.value.trim()
        setDataRequest([])
        if (text.target.value == "") {
            setDataRequest([])
        }
        if (textReq.length > 0) {
            postService.searchPost({ text: textReq }).then((res) => {
                setDataRequest(res)
            })
        }

    }

    return (
        <>
            {contextHolder}
            <Modal className="modalSearch" title="Поиск" open={modalOpen} footer={null} onCancel={onCancel}>
                <Input
                    onChange={onSearch}
                    style={{ marginBottom: 20 }}
                />
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
                            <div className="containerButtonFieldMobile">
                                <Typography.Link href="/profilePage" className="buttonFieldLink">
                                    <span>Профиль</span>
                                </Typography.Link>
                                {/* <Typography.Link to="/settingPage" className="buttonFieldLink" >
                                    <span>Настройки</span>
                                </Typography.Link > */}
                                <Typography.Link href="/statistica" className="buttonFieldLink">
                                    <span>Статистика</span>
                                </Typography.Link>
                                <Typography.Link className="buttonFieldLink" onClick={() => {
                                    
                                    modal.confirm({
                                        title: "Вы правда хотите выйти из аккаунта?",
                                        content: (
                                            <span>Позже вы сможете вернуться!</span>
                                        ),
                                        className: "listItemNoteDateDeletePost",
                                        okText: "Выйти",
                                        cancelText: "Назад",
                                        onOk: () => logOutRequest()
                                    })
                                }}>
                                    <span>Выйти</span>
                                </Typography.Link >

                            </div>
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
            {contextHolderModalPost}
        </>

    )
}

export default SideBar