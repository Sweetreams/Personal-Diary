import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import ProfileContext from '../../components/context/ProfileContext.jsx'
import OpenMenuContext from '../../components/context/OpenMenuContext.jsx'

const SecurityPage = ({ children }) => {
  const navigate = useNavigate()
  const [content, setContent] = useState()
  const [security, setSecurity] = useState(false)
  const [openBurgerMenu, isOpenBurgerMenu] = useState(false)


  useEffect(() => {
    const controller = new AbortController()

    const authResponse = () => axios({
      method: "get",
      url: "https://personal-diary-s9tr.onrender.com/user/profileUser",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      withCredentials: true,
    })
      .then((res) => {
        setContent(res.data.data[0])
        setSecurity(true)
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login", { replace: true })
          setSecurity(false)
        }
      })

    authResponse()
    return () => controller.abort()
  }, [])

  return security
    ? <ProfileContext.Provider value={content}>
      <OpenMenuContext.Provider value={{ openBurgerMenu, isOpenBurgerMenu }}>
        {children}
      </OpenMenuContext.Provider>
    </ProfileContext.Provider>
    : <Spin spinning={security}></Spin>
}

export default React.memo(SecurityPage)