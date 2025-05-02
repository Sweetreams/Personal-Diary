import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import ProfileContext from '../../components/context/ProfileContext'

const SecurityPage = ({ children }) => {
  const navigate = useNavigate()
  const [content, setContent] = useState()
  const [security, setSecurity] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const authResponse = () => axios({
      method: "get",
      url: "http://localhost:8000/user/profileUser",
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
      {children}
    </ProfileContext.Provider>
    : <Spin spinning={security}></Spin>
}

export default React.memo(SecurityPage)