import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, notification, Row, Select, Splitter } from 'antd'
import axios from "axios"
import { dateProcessing, dateTimeProcessing } from '../../utils/dateConvertor'
import { RMark } from '../../utils/markdown/render'
import DOMPurify from 'dompurify';
import { marked } from 'marked'

const axiosRequest = async (values) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/post/createPost",
    withCredentials: true,
    data: {
      title: values.title,
      desc: values.desc,
      tags: values.tags
    }
  }).then((req) => {
    return req
  }).catch((req) => {
    return req.response
  })
}

const CreateNewPost = () => {
  const date = new Date()
  const [api, contextHolder] = notification.useNotification()
  const [tags, setTags] = useState()
  const [textAreaText, setTextAreaText] = useState("")

  useEffect(() => {
    document.title = "Создание поста"
    axios({
      method: "get",
      url: "http://localhost:8000/tag/tagGet",
      withCredentials: true,
    }).then((req) => {
      let tag = []
      req.data.map((el) => {
        tag.push({ label: el.tag, value: el.id, key: el.id })
      })
      setTags(tag)
    })
  }, [])

  const onFinish = async (values) => {
    const axiosResult = await axiosRequest(values)
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
        description: "Пост успешно добавлен!",
        showProgress: true,
      })
    }
  }

  return (

    <>
      {contextHolder}
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <p className="noteDateTitle">{dateProcessing(date)}</p>
        <div className="listItemNote">
          <div className="listItemNoteDate">
            <div className="listItemNoteDateTitleContainer">
              <p className="listItemNoteDateTitle">{dateTimeProcessing(date)}</p>
            </div>
          </div>
          <div className="diaryFieldEditing">
            <Form
              onFinish={(values) => onFinish(values)}
              layout="vertical"
            >
              <Row>
                <Col span={12}><Form.Item
                  name="title"
                  label="Заголовок">
                  <Input />
                </Form.Item></Col>
                <Col span={8}></Col>
                <Col span={4}><Form.Item
                  name="tags"
                  label="Тэги">
                  <Select
                    mode="multiple"
                    options={tags ? tags : ""}
                  />
                </Form.Item></Col>
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
      </div>
    </>
  )
}

export default CreateNewPost