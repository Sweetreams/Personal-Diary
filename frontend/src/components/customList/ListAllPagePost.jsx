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
import { emotion } from '../../utils/emotion.js'

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
    const [emotionSelect, setEmotionSelect] = useState({})
    const [dataList, setDataList] = useState(data)

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
                    setDataList(dataList.filter(post => post.id !== values))
                    api.success({
                        message: "Успешно",
                        description: "Пост успешно удалён!",
                        showProgress: true,
                    })
                }
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
        setEmotionSelect(prev => ({
            ...prev,
            [id_post]: emotion[key.engName].img
        }))
        axiosRequest({ id_post: id_post, emotions: key.engName })
    }

    return dataList.map((el) => {
        const dateCurrent = dateTimeProcessingForRequest(el)
        const emotions = el.emotions
        const currentEmotion = emotion[emotions] != undefined ? emotion[emotions]["img"] : emotion[emotions]
        const displayedEmotion = emotionSelect[el.id] || currentEmotion;

        return (
            <div key={el.id + 100} className="rowNoteCard">
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
                    <Typography.Title level={4}>{el.title}</Typography.Title>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(el.desc)) }} />
                    <div className="dropdown" key={el.id}>
                        <button
                            className="dropdown__face"
                            onClick={() => {
                                isOpen((prev) => ({
                                    ...prev,
                                    [el.id]: !prev[el.id]
                                }))
                            }}
                        >
                            <img style={{ width: 25 }} src={displayedEmotion || emotionSelect} className="dropdown__text" />
                        </button>
                        <ul className={`dropdown__items ${open[el.id] ? 'dropdown__items--open' : ''}`}>
                            {[emotion].map((ell) => {
                                return Object.values(ell).map((elll, index) => {
                                    return (
                                        <Tooltip key={index + 1000} title={elll.desc}>
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