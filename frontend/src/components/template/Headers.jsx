import { MenuFoldOutlined, SearchOutlined } from '@ant-design/icons'
import { Dropdown, Input, notification, Select, Typography } from "antd"
import React, { useContext } from 'react'
import "./headers.css"
import ProfileContext from '../context/ProfileContext'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

const Headers = ({ isCollapse }) => {
  const profileData = useContext(ProfileContext)
  const userName = profileData.name;
  const userImg = profileData.imgURL;
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()
  const itemAdmin = profileData.role === "user" ?
    {
      key: '3',
      label: (
        <Typography.Link href="/statistica" className="headersContainerDropDownProfile">
          Статистика
        </Typography.Link>
      ),
    }
    : null

  const logOutRequest = () => {
    axios({
      method: "get",
      url: "http://localhost:8000/user/logout",
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

  const items = [
    {
      key: '1',
      label: (
        <Typography.Link href="/profilePage" className="headersContainerDropDownProfile">
          Профиль
        </Typography.Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/settingPage" className="headersContainerDropDownOut" >
          <Typography.Text>Настройки</Typography.Text>
        </Link>
      ),
    },
    itemAdmin,
    {
      key: '4',
      label: (
        <Typography.Text className="headersContainerDropDownOut" onClick={() => {
          logOutRequest()
        }}>
          Выйти
        </Typography.Text>
      ),
    }
  ];

  return (
    <>
      {contextHolder}
      <Typography.Text><MenuFoldOutlined onClick={() => isCollapse((a) => !a)} /></Typography.Text>
      <div className="headersContainer">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Typography.Text className="headersContainerName">{userName}</Typography.Text>
        </Dropdown>
        <img className="headersContainerImg" src={userImg} />
      </div>
    </>
  )
}

export default Headers