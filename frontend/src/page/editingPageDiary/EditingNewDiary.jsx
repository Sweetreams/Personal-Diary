import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Select, Splitter } from 'antd'
import axiosCache from "../../utils/axios.js"
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { RMark } from '../../utils/markdown/render.js';
import axios from "axios"
import { marked } from 'marked';

const axiosRequest = async (values) => {
    return axios({
        method: "put",
        url: "https://personal-diary-s9tr.onrender.com/post/changePost",
        withCredentials: true,
        data: values
    }).then((req) => {
        return req
    }).catch((req) => {
        return req.response
    })
}

const EditingNewDiary = () => {
    const [dataFromResponse, setDataFromResponse] = useState([])
    const [textAreaText, setTextAreaText] = useState("")
    const [tags, setTags] = useState([])
    const [form] = Form.useForm()
    const params = useParams()

    const onFinish = (values) => {
        const tagsId = []
        const valuesTags = values.tags

        for (let i = 0; i < valuesTags.length; i++) {
            for (let j = 0; j < tags.length; j++) {
                if (valuesTags[i] === tags[j].value) {
                    tagsId.push(tags[j].key)
                }
            }
        }
        axiosRequest({ id_post: params.id, title: values.title, tags: tagsId, desc: values.desc })
    }

    useEffect(() => {
        document.title = "Редактирование поста"
      }, [])

    useEffect(() => {
        const controller = new AbortController()

        axios({
            method: "get",
            url: "https://personal-diary-s9tr.onrender.com/tag/tagGet",
            withCredentials: true,
        }).then((req) => {
            let tag = []
            req.data.map((el) => {
                tag.push({ label: el.tag, value: el.tag, key: el.id })
            })
            setTags(tag)
        })

        axiosCache({
            method: "post",
            url: `post/getPost`,
            data: { id_post: Number(params.id) },
            withCredentials: true,
            signal: controller.signal
        })
            .then((req) => {
                setDataFromResponse(req.data[0])
                const newArray = req.data[0].TagsAndPost.map((el) => {
                    return (el.tags.tag)
                })
                form.setFieldsValue({
                    title: req.data[0]?.title,
                    tags: newArray,
                    desc: req.data[0]?.desc
                })
            })
            .catch((req) => {
                return req.response
            })

        return () => controller.abort()
    }, [params.id, form])

    return (
        <>

            <div className="listItemNote">

                <div className="diaryFieldEditing">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            ["title"]: dataFromResponse?.title,
                            ["tags"]: dataFromResponse?.tags,
                            ["desc"]: dataFromResponse?.desc
                        }}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="title"
                                    label="Заголовок"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}></Col>
                            <Col span={4}>
                                <Form.Item
                                    name="tags"
                                    label="Тэги">
                                    <Select
                                        mode="multiple"
                                        options={tags}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>



                        <Splitter lazy>
                            <Splitter.Panel defaultSize="50%" min="30%" max="70%">
                                <Form.Item
                                    name="desc"
                                    label="Описание">
                                    <Input.TextArea
                                        onChange={(text) => setTextAreaText(text.target.value)}
                                        
                                        style={{ minHeight: "600px" }} />
                                </Form.Item>
                            </Splitter.Panel>
                            <Splitter.Panel defaultSize="50%" min="30%" max="70%">
                                <Form.Item
                                    label="Предпросмотр">
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(textAreaText)) }}></div>
                                </Form.Item>

                            </Splitter.Panel>
                        </Splitter>

                        <Form.Item>
                            <Button htmlType="submit">Отправить</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EditingNewDiary