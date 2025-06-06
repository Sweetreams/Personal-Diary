import { useEffect, useState } from 'react'
import { Button, Col, ColorPicker, Form, Input, notification, Popconfirm, Row, Select, Splitter } from 'antd'
import axiosCache from "../../utils/axios.js"
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';
import axios from "axios"
import { marked } from 'marked';
import { dateProcessing, dateTimeProcessing } from '../../utils/dateConvertor.js';
import { HexConverterRgb } from '../../utils/LumaColor.js';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

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

const axiosRequestTagDelete = async (values) => {
    return axios({
        method: "delete",
        url: "https://personal-diary-s9tr.onrender.com/tag/tagdelete",
        withCredentials: true,
        data: values
    }).then((req) => {
        return req
    }).catch((req) => {
        return req.response
    })
}

const axiosRequestTag = async (values) => {
    return axios({
        method: "post",
        url: "https://personal-diary-s9tr.onrender.com/tag/tagcreate",
        withCredentials: true,
        data: values
    }).then((req) => {
        return req
    }).catch((req) => {
        return req.response
    })
}

const EditingNewDiary = () => {
    const date = new Date()
    const [dataFromResponse, setDataFromResponse] = useState([])
    const [textAreaText, setTextAreaText] = useState("")
    const [tags, setTags] = useState([])
    const [form] = Form.useForm()
    const params = useParams()
    const [api, contextHolder] = notification.useNotification()

    const onFinish = async (values) => {
        const tagsId = []
        const valuesTags = values.tags

        for (let i = 0; i < valuesTags.length; i++) {
            for (let j = 0; j < tags.length; j++) {
                if (valuesTags[i] === tags[j].value) {
                    tagsId.push(tags[j].key)
                }
            }
        }

        const axiosResult = await axiosRequest({ id_post: params.id, title: values.title, tags: tagsId, desc: values.desc })

        if (axiosResult.status === 400) {
            api.error({
                message: "Ошибка",
                description: axiosResult.data.message.errorMessage,
                showProgress: true,
            })
        }
        if (axiosResult.status === 200) {
            api.success({
                message: "Успешно",
                description: "Пост успешно обновлен!",
                showProgress: true,
            })
            window.location.pathname = "/main"
        }
    }

    const onFinishTag = () => {
        const name = document.getElementsByClassName("formTagNameInput")[0].value
        const color = document.getElementsByClassName("ant-color-picker-color-block-inner")[0].style.background.match(/rgb\((\d*), (\d*), (\d*)\)/)
        const colorConvert = HexConverterRgb([color[1], color[2], color[3]])
        return axiosRequestTag({ "tag": name, "color": colorConvert })
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

    const optionRender = (props) => {
        const data = props.data
        return (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", position: "relative", gap: 10 }}>
                <span style={{ position: "relative", top: 2 }}>{data.label}</span>
                <Popconfirm
                    title="Удалить тэг?"
                    description="Удалёный тэг невозможно будет восстановить!"
                    placement="left"
                    okText="Удалить"
                    cancelText="Отмена"
                    onConfirm={() => {
                        axiosRequestTagDelete({ id_tags: data.key })
                    }}>
                    <DeleteOutlined />
                </Popconfirm>
            </div>
        )
    }

    return (
        <>
            {contextHolder}
            <div style={{ maxWidth: "1000px", margin: "auto" }}>
                <Row className="noteDateTitle">
                    <span >{dateProcessing(date)}</span>
                </Row>
                <div className="listItemNote">
                    <div className="listItemNoteDate">
                        <div className="listItemNoteDateTitleContainer">
                            <p className="listItemNoteDateTitle">{dateTimeProcessing(date)}</p>
                        </div>
                    </div>
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
                            <Row className="formRow">
                                <Col span={12}>
                                    <Form.Item
                                        name="title"
                                        label="Заголовок"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={3}></Col>
                                <Col span={9}>
                                    <Form.Item
                                        name="tags"
                                        label={
                                            <div style={{ display: "flex", flexDirection: "flex", alignItems: "center", gap: 10 }}>
                                                <span>Тэги</span>
                                                <Popconfirm
                                                    className="popconfirmMe"
                                                    title="Добавление Тега"
                                                    icon={null}
                                                    description={
                                                        <>
                                                            <Form.Item
                                                                name="Name"
                                                                label="Название"
                                                                className="formTagName"
                                                                rules={[
                                                                    { required: true, message: "Поле обязательно для заполения!" },
                                                                    { type: "string", message: "Поле должно быть текстовым" },]}>
                                                                <Input className="formTagNameInput" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                name="Color"
                                                                label="Цвет фона"
                                                                className="formTagColorPicker">
                                                                <ColorPicker format="hex" defaultValue="#FBEECE" className="formTagColorPickerInput" />
                                                            </Form.Item>
                                                        </>}
                                                    okText="Создать"
                                                    cancelText="Отмена"
                                                    onConfirm={() => onFinishTag()}
                                                >
                                                    <PlusOutlined />
                                                </Popconfirm>
                                            </div>
                                        }
                                        style={{ position: "relative" }}>

                                        <Select
                                            notFoundContent="Не найдено"
                                            mode="multiple"
                                            optionRender={optionRender}
                                            options={tags ? tags : ""}
                                        ></Select>
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
                                        className="previows"
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
            </div>
        </>
    )
}

export default EditingNewDiary