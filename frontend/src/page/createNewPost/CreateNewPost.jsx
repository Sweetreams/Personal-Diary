import { useEffect, useState } from 'react'
import { Button, Col, ColorPicker, Form, Input, Modal, notification, Popconfirm, Row, Select, Splitter, Tooltip, Typography } from 'antd'
import axios from "axios"
import { dateProcessing, dateTimeProcessing } from '../../utils/dateConvertor'
import DOMPurify from 'dompurify';
import { marked } from 'marked'
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { HexConverterRgb, HEXtoRGB, RGBtoHEX } from '../../utils/LumaColor';

const axiosRequestTagDelete = async (values) => {
  return axios({
    method: "delete",
    url: "http://localhost:8000/tag/tagdelete",
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

const axiosRequest = async (values) => {
  return axios({
    method: "post",
    url: "https://personal-diary-s9tr.onrender.com/post/createPost",
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
  const [tags, setTags] = useState([])
  const [textAreaText, setTextAreaText] = useState("")
  const [openModal, isModalOpen] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   setTimeout(() => {
  //     const options = document.getElementsByClassName("ant-select-item-option")
  //     for (let index = 0; index < options.length; index++) {
  //       options[index].insertAdjacentHTML("beforeend", <DeleteOutlined/>)
  //     }
  //   }, 2000);
  // }, [])

  useEffect(() => {
    document.title = "Создание поста"
    axios({
      method: "get",
      url: "https://personal-diary-s9tr.onrender.com/tag/tagGet",
      withCredentials: true,
    }).then((req) => {
      let tag = []
      req.data.map((el) => {
        tag.push({ label: el.tag, value: el.id, key: el.id })
      })

      setTags(tag)
    })
  }, [])

  const onFinishTag = () => {
    const name = document.getElementsByClassName("formTagNameInput")[0].value
    const color = document.getElementsByClassName("ant-color-picker-color-block-inner")[0].style.background.match(/rgb\((\d*), (\d*), (\d*)\)/)
    const colorConvert = HexConverterRgb([color[1], color[2], color[3]])
    return axiosRequestTag({ "tag": name, "color": colorConvert })
  }

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
      window.location.pathname = "/main"
    }
  }

  const optionRender = (props) => {
    const data = props.data
    return (
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <span>{data.label}</span>
        <DeleteOutlined onClick={(el => {
          axiosRequestTagDelete({id_tags: data.key})
        })} />
      </div>
    )
  }

  return (

    <>
      {contextHolder}
      <Modal
        className="modalCreate"
        title="О редакторе"
        open={openModal}
        onCancel={() => { isModalOpen(false) }}
        cancelText="Назад"
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn></CancelBtn>
          </>)
        }>
        <div style={{ maxHeight: 450, overflowY: "scroll", marginBottom: "15px", marginTop: "15px", scrollbarWidth: "thin" }}>
          <Typography.Title level={3}>Что такое Markdown?</Typography.Title>
          <Typography.Text>Markdown — это облегчённый и универсальный язык разметки текста. Его используют для создания веб-страниц, документов, презентаций, заметок, книг и технической документации. Он не зависим от платформы и конкретного приложения.</Typography.Text>
          <br />
          <br />
          <Typography.Text>Для эффективного использования редактора ознакомьтесь с основами синтаксиса Markdown, это не займет много времени. Как только вы научитесь оформлять текст на этом языке, вы обязательно его полюбите и сможете использовать практически везде.</Typography.Text>
          <Typography.Title level={3}>Базовый синтаксис</Typography.Title>
          <table>
            <thead>
              <th>Markdown</th>
              <th>Результат</th>
            </thead>
            <tbody>
              <th colSpan={2}>Заголовки и параграф</th>
              <tr>
                <td># Заголовок 1</td>
                <td><h1>Заголовок 1</h1></td>
              </tr>
              <tr>
                <td>## Заголовок 2</td>
                <td><h2>Заголовок 2</h2></td>
              </tr>
              <tr>
                <td>### Заголовок 3</td>
                <td><h3>Заголовок 3</h3></td>
              </tr>
              <tr>
                <td>#### Заголовок 4</td>
                <td><h4>Заголовок 4</h4></td>
              </tr>
              <tr>
                <td>##### Заголовок 5</td>
                <td><h5>Заголовок 5</h5></td>
              </tr>
              <tr>
                <td>###### Заголовок 6</td>
                <td><h6>Заголовок 6</h6></td>
              </tr>
              <tr>
                <td>Просто параграф, блок текста без оформления</td>
                <td><p>Просто параграф, блок текста без оформления</p></td>
              </tr>

              <th colSpan={2}>Списки, цитаты и код</th>

              <tr>
                <td>
                  <p>- Пример</p>
                  <p>- Маркированного</p>
                  <p>- Списка</p>
                </td>
                <td>
                  <ul>
                    <li>Пример</li>
                    <li>Маркированного</li>
                    <li>Списка</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <p>+ Пример</p>
                  <p>+ Маркированного</p>
                  <p>+ Списка</p>
                </td>
                <td>
                  <ul>
                    <li>Пример</li>
                    <li>Маркированного</li>
                    <li>Списка</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <p>* Пример</p>
                  <p>* Маркированного</p>
                  <p>* Списка</p>
                </td>
                <td>
                  <ul>
                    <li>Пример</li>
                    <li>Маркированного</li>
                    <li>Списка</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <p>1. Пример</p>
                  <p>2. Нумерованного</p>
                  <p>3. Списка</p>
                </td>
                <td>
                  <ol>
                    <li>Пример</li>
                    <li>Маркированного</li>
                    <li>Списка</li>
                  </ol>
                </td>
              </tr>
              <tr>
                <td> &#62; Цитата является блочным элементом</td>
                <td><blockquote><p>Цитата является блочным элементом</p></blockquote></td>
              </tr>
              <tr>
                <td>
                  <p>```</p>
                  <p>Блок кода</p>
                  <p>```</p>
                </td>
                <td>
                  <pre>
                    <code>Блок кода</code>
                  </pre>
                </td>
              </tr>

              <th colSpan={2}>Выделение текста</th>

              <tr>
                <td>
                  <p>**Полужирный текст**</p>
                  <p>__Другой Вариант__</p>
                </td>
                <td>
                  <strong>**Полужирный текст**</strong>
                  <br />
                  <strong>__Другой Вариант__</strong>
                </td>
              </tr>

              <tr>
                <td>
                  <p>*Выделение курсивом*</p>
                </td>
                <td>
                  <i>*Выделение курсивом*</i>
                </td>
              </tr>

              <tr>
                <td>
                  <p>~Зачекнутый текст~</p>
                </td>
                <td>
                  <del>*Выделение курсивом*</del>
                </td>
              </tr>

              <tr>
                <td>
                  <p>`Значение`</p>
                </td>
                <td>
                  <code>Значение</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
      <div style={{ maxWidth: "1000px", margin: "auto" }}>
        <Row className="noteDateTitle" style={{ display: "flex", alignItems: "center" }}>
          <span >{dateProcessing(date)}</span>
          <Tooltip title="О редакторе">
            <QuestionCircleOutlined className="noteDateTitleItem" onClick={() => {
              isModalOpen(true)
            }} />
          </Tooltip>
        </Row>
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
              <Row className="formRow">
                <Col span={12}><Form.Item
                  name="title"
                  label="Заголовок">
                  <Input />
                </Form.Item></Col>
                <Col span={3}></Col>
                <Col span={9}><Form.Item
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
                  }>
                  <Select
                    notFoundContent="Не найдено"
                    mode="multiple"
                    optionRender={optionRender}
                    options={tags ? tags : ""}
                  >

                  </Select>
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

export default CreateNewPost