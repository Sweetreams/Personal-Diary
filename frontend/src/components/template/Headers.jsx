import { MenuFoldOutlined, SearchOutlined } from '@ant-design/icons'
import { Dropdown, Input, notification, Select, Typography, Modal } from "antd"
import React, { useContext } from 'react'
import "./headers.css"
import ProfileContext from '../context/ProfileContext'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import OpenMenuContext from '../context/OpenMenuContext'

const Headers = ({ isCollapse }) => {
  const profileData = useContext(ProfileContext)
  const { openBurgerMenu, isOpenBurgerMenu } = useContext(OpenMenuContext)
  const userName = profileData.name;
  const userImg = profileData.imgURL;
  const [modal, contextHolderModalPost] = Modal.useModal()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()
  const itemAdmin = profileData.role === "user" || profileData.role === "admin" ?
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
      url: "https://personal-diary-s9tr.onrender.com/user/logout",
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
    // {
    //   key: '2',
    //   label: (
    //     <Link to="/settingPage" className="headersContainerDropDownOut" >
    //       <Typography.Text>Настройки</Typography.Text>
    //     </Link>
    //   ),
    // },
    itemAdmin,
    {
      key: '4',
      label: (
        <Typography.Text className="headersContainerDropDownOut" onClick={() => {

          modal.confirm({
            title: "Вы правда хотите выйти из аккаунта?",
            content: (
              <span>Позже вы сможете вернуться!</span>
            ),
            className: "listItemNoteDateDeletePost",
            okText: "Выйти",
            cancelText: "Назад",
            onOk: () => logOutRequest()
          })
        }}>
          Выйти
        </Typography.Text>
      ),
    }
  ];

  return (
    <>
      {contextHolder}
      <span className="MenuFoldOutlined"><MenuFoldOutlined onClick={() => isCollapse((a) => !a)} /></span>
      <div className="headersContainer">
        <Dropdown className="dropDownProfile" menu={{ items }} placement="bottomLeft">
          <div style={{display: "flex", alignItems: "center", gap: 12}}>
            <Typography.Text className="headersContainerName">{userName}</Typography.Text>
            <img className="headersContainerImg" src={userImg} />
          </div>
        </Dropdown>

        <a href="/main"><img className="headersContainerLogo" src="/logo.svg" /></a>
        <div className={`menuOutline${openBurgerMenu ? "--open" : ""}`} onClick={() => {
          let layoutSider = document.getElementsByClassName("layoutSider--open")
          isOpenBurgerMenu((pv) => !pv)
          if (layoutSider.length == 0) {
            document.getElementsByClassName("layoutSider")[0].className = "ant-layout-sider ant-layout-sider-dark layoutSider--open css-dev-only-do-not-override-144royw"
            return;
          }
          layoutSider[0].className = "ant-layout-sider ant-layout-sider-dark layoutSider css-dev-only-do-not-override-144royw"
        }}>
          <div className="menuOutlineLine"></div>
          <div className="menuOutlineLine"></div>
        </div>
      </div>
      {contextHolderModalPost}
    </>
  )
}

export default Headers