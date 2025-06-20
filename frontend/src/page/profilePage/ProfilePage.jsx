import { useContext, useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Spin } from "antd"
import ProfileContext from '../../components/context/ProfileContext'
import { useForm } from 'antd/es/form/Form'
import { useNavigate } from 'react-router-dom'
import "./profilePage.css"
import userService from '../../api/service/userService'

const ProfilePage = () => {
  const profileData = useContext(ProfileContext)
  const [disable, setDisable] = useState(true)
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  const [form] = useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = "Профиль"
  }, [])

  const onClick = (e) => {
    const textButton = e.target.outerText
    if (textButton === "Сохранить") {
      const formChange = form.getFieldValue()
      setLoading(true)
      userService.changeUserRequest(formChange)
        .then(() => { setLoading(false) })
        .catch(() => { setLoading(false) })
    }
    setDisable((prev) => !prev)
  }

  const deleteUser = () => {
    navigate("/login")
    userService.deleteUserRequest()
  }

  const onChange = (file) => {
    if (!file) return 0
    let reader = new FileReader()
    reader.onload = () => {
      const readerresult = reader.result
      const match = readerresult.match(/data:image\/(png|jpeg);base64,([^\n]+)/)
      userService.changeUserRequest({ imgURL: match[2] })
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div className="profileContainer">
        <div className="profileContainerLineUp" />
        <div className="profileContainerContent">
          <div className="row profileContainerContentUp">
            <div className="col profileContainerContentUpLeft">
              <Spin percent="auto" spinning={loading}>
                <div className="row profileContainerContentUpLeftImage">
                  <img className="profileImg" src={profileData.imgURL} alt="profileImg" />
                  <label className="inputFileBase64">
                    <span>Изменить изображение</span>
                    <input type="file" onChange={(f) => { onChange(f.target.files[0]) }}></input>
                  </label>
                </div>
              </Spin>
              <div className="row profileContainerContentUpLeftDesc">
                <p>{profileData.name}</p>
                <p className="profileContainerContentUpLeftDescEMail">{profileData.email}</p>
              </div>
            </div>
            <div className="col profileContainerContentUpRight">
              <Button onClick={(e) => onClick(e)}>
                {disable ? "Изменить" : "Сохранить"}
              </Button>
            </div>
          </div>

          <div>
            <Form
              form={form}
              layout="vertical">
              <Form.Item
                label="Логин"
                name="login">
                <Input disabled={disable} defaultValue={profileData.login} />
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="bcryptpassword">
                <Input disabled={disable} defaultValue="*******" />
              </Form.Item>
              <Form.Item
                label="E-mail"
                name="email">
                <Input disabled={disable} defaultValue={profileData.email} />
              </Form.Item>
              <Form.Item
                label="Имя"
                name="name">
                <Input disabled={disable} defaultValue={profileData.name} />
              </Form.Item>
            </Form>
            <div>
              <p>Опасная зона</p>
              <Button danger onClick={() => {
                modal.confirm({
                  title: "Удалить аккаунта?",
                  content: "Удалённый аккаунт невозможно будет восстановить!",
                  className: "listItemNoteDateDeletePost",
                  okText: "Удалить",
                  cancelText: "Назад",
                  onOk: () => deleteUser()
                })
              }}>Удалить аккаунт</Button>
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  )
}

export default ProfilePage