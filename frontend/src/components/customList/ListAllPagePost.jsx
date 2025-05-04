import { Card, Dropdown, notification, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import DOMPurify from "dompurify"
import { dateTimeProcessingForRequest } from '../../utils/dateConvertor'
import "./rowNoteCard.css"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ListTags from "./ListTags.jsx"
import { marked } from "marked"
import "./ListAllPagePost.scss"

const emotion = {
    happiness: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//happiness.png",
        desc: "Радость",
        engName: "happiness"
    },
    anticipation: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//anticipation.png",
        desc: "Предвкушение",
        engName: "anticipation"
    },
    sadness: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//sadness.png",
        desc: "Грусть",
        engName: "sadness"
    },
    anger: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//anger.png",
        desc: "Злость",
        engName: "anger"
    },
    excitement: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//excitement.png",
        desc: "Волнение",
        engName: "excitement"
    },
    boredom: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//boredom.png",
        desc: "Скука",
        engName: "boredom"
    },
    embarrassment: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//embarrassment.png",
        desc: "Смущение",
        engName: "embarrassment"
    },
    other: {
        img: "https://acrhdqsdoirdrusfeweb.supabase.co/storage/v1/object/public/emotions//other.png",
        desc: "Другое",
        engName: "other"
    },
}

const axiosRequest = async (values) => {
    return axios({
        method: "put",
        url: "http://localhost:8000/post/changePostEmotions",
        withCredentials: true,
        data: values
    }).then((req) => {
        return req
    }).catch((req) => {
        return req.response
    })
}

const ListAllPagePost = ({ data }) => {
    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification()
    const [open, isOpen] = useState(false)
    const [emotionSelect, setEmotionSelect] = useState("")
    const onDelete = (values) => {
        axios({
            method: "delete",
            url: "http://localhost:8000/post/deletePost",
            data: {
                "id": values
            },
            withCredentials: true
        })
            .then((req) => {
                if (req.status === 200) {
                    api.success({
                        message: "Успешно",
                        description: "Пост успешно удалён!",
                        showProgress: true,
                    })
                }

                navigate(0)
            })
            .catch((req) => {
                api.error({
                    message: "Ошибка",
                    description: req.response.data.message.errorMessage,
                    showProgress: true,
                })
            })
    }

    const emotionClick = (key, id_post) => {
        setEmotionSelect(emotion[key.engName].img)
        axiosRequest({ id_post : id_post, emotions: key.engName})
    }

    return data.map((el) => {
        const dateCurrent = dateTimeProcessingForRequest(el)
        const emotions = el.emotions
        const currentEmotion = emotion[emotions] != undefined ? emotion[emotions]["img"] : emotion[emotions]
        return (
            <div key={Math.floor(Math.random(el) * 1000)} className="rowNoteCard">
                {contextHolder}
                <div className="row" style={{ display: "flex", flexDirection: "row", gap: 20, marginBottom: 10 }}>
                    <div className="listItemNoteDateTitleContainer">
                        <Typography.Text className="listItemNoteDateTitle">{dateCurrent}</Typography.Text>
                    </div>
                    <div className="listItemNoteDateIcon">
                        <Link className="listItemNoteDateIconIcon" to={"/editingPost/" + el.id}><EditOutlined /></Link>
                        <DeleteOutlined className="listItemNoteDateIconIcon" onClick={() => {
                            onDelete(el.id, navigate)
                        }} />
                    </div>
                    <div className="listItemNoteDateTagsList">
                        <ListTags props={el.TagsAndPost} />
                    </div >
                </div>
                <Card style={{ wordBreak: "break-all", position: "relative" }}>
                    <Typography.Title level={2}>{el.title}</Typography.Title>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(el.desc)) }} />
                    <div className="dropdown" key={el.id}>
                        <button
                            className="dropdown__face"
                            onClick={() => isOpen(!open)}
                        >
                            <img style={{ width: 25 }} src={currentEmotion ? currentEmotion : emotionSelect} className="dropdown__text" />
                        </button>
                        <ul className={`dropdown__items ${open ? 'dropdown__items--open' : ''}`}>
                            {[emotion].map((ell) => {
                                return Object.values(ell).map((elll, index) => {
                                    return (
                                        <Tooltip key={Math.floor(Math.random() * 100000)} title={elll.desc}>
                                            <li key={index} style={{ display: "flex" }} onClick={() => {
                                                emotionClick(elll, el.id)
                                            }}>
                                                <img style={{ width: 25 }} src={elll.img} alt={elll.desc} />
                                            </li>
                                        </Tooltip>
                                    )
                                })
                            })}
                        </ul>
                    </div>
                </Card>
            </div>
        )
    })
}

export default ListAllPagePost