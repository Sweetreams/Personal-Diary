import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Upload } from "antd"
import ProfileContext from '../../components/context/ProfileContext'
import axios from "axios"
import { useForm } from 'antd/es/form/Form'
import { useNavigate } from 'react-router-dom'
import "./profilePage.css"

const axiosRequest = async (data) => {
  axios({
    method: "put",
    url: "https://personal-diary-s9tr.onrender.com/user/changeUser",
    withCredentials: true,
    data: data
  })
    .then((req) => { return req })
    .catch((req) => { return req.response })
}

const axiosRequestDeleteUser = async () => {
  axios({
    method: "delete",
    url: "https://personal-diary-s9tr.onrender.com/user/deleteUser",
    withCredentials: true,
  })
    .then((req) => { return req })
    .catch((req) => { return req.response })
}

const ProfilePage = () => {
  const profileData = useContext(ProfileContext)
  const [disable, setDisable] = useState(true)
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  const [form] = useForm()

  useEffect(() => {
    document.title = "Профиль"
  }, [])

  const onClick = (e) => {
    const textButton = e.target.outerText
    if (textButton === "Сохранить") {
      const formChange = form.getFieldValue()
      axiosRequest(formChange)
    }
    setDisable((prev) => !prev)
  }

  const deleteUser = () => {
    navigate("/login")
    axiosRequestDeleteUser()
  }

  const onChange = (file) => {
    if (!file) return 0
    let reader = new FileReader()
    reader.onload = () => {
      const readerresult = reader.result
      const match = readerresult.match(/data:image\/(png|jpeg);base64,([^\n]+)/)
      axiosRequest({ imgURL: match[2] })
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <div style={{ flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg, #E9EDC9, #FAEDCD)", width: "100%", height: "150px", borderRadius: "30px 30px 0px 0px" }} />
        <div style={{ background: "#FFFFFF", width: "100%", height: "100%", padding: "30px 70px 30px 70px", borderRadius: "0px 0px 30px 30px" }}>
          <div className="row" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", gap: 15, marginBottom: 50 }}>
            <div className="col" style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
              <div className="row">
                <img className="profileImg" style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover" }} src={profileData.imgURL} alt="" />
              </div>
              <div className="row">
                <p>{profileData.name}</p>
                <p style={{ color: "#C7C7C7" }}>{profileData.email}</p>
              </div>
            </div>
            <div className="col">
              <Button onClick={(e) => onClick(e)}>
                {disable ? "Изменить" : "Сохранить"}
              </Button>
            </div>
          </div>
          <label className="inputFileBase64">
            <span>Изменить изображение</span>
            <input type="file" onChange={(f) => { onChange(f.target.files[0]) }}></input>
          </label>
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