import React, { useContext, useState } from 'react'
import { Button, Form, Input } from "antd"
import ProfileContext from '../../components/context/ProfileContext'
import axios from "axios"
import { useForm } from 'antd/es/form/Form'
import { useNavigate } from 'react-router-dom'

const axiosRequest = async(data) => {
  axios({
    method: "put",
    url: "http://localhost:8000/user/changeUser",
    withCredentials: true,
    data: data
  })
  .then((req) => {return req})
  .catch((req) => {return req.response})
}

const axiosRequestDeleteUser = async() => {
  axios({
    method: "delete",
    url: "http://localhost:8000/user/deleteUser",
    withCredentials: true,
  })
  .then((req) => {return req})
  .catch((req) => {return req.response})
}

const ProfilePage = () => {
  const profileData = useContext(ProfileContext)
  const [disable, setDisable] = useState(true)
  const navigate = useNavigate()
  const [form] = useForm()

  const onClick = (e) => {
    const textButton = e.target.outerText
    if(textButton === "Сохранить"){
      const formChange = form.getFieldValue()
      axiosRequest(formChange)
    }
    setDisable((prev) => !prev)
  }

  const deleteUser = () => {
    navigate(0)
    axiosRequestDeleteUser()
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ background: "linear-gradient(135deg, #E9EDC9, #FAEDCD)", width: "100%", height: "20%", borderRadius: "30px 30px 0px 0px" }}>
      </div>
      <div style={{ background: "#FFFFFF", width: "100%", height: "80%", padding: "30px 70px 0px 70px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <img style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover" }} src={profileData.imgURL} alt="" />
            <div>
              <p>{profileData.name}</p>
              <p style={{ color: "#C7C7C7" }}>{profileData.email}</p>
            </div>
          </div>
          <Button onClick={(e) => onClick(e)}>
            {disable ? "Изменить" : "Сохранить"}
          </Button>
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
            <Button onClick={() => {
              deleteUser()
            }}>Удалить аккаунт</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage