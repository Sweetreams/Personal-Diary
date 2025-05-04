import React, { useEffect, useState, memo } from 'react'
import axiosCache from "../../utils/axios.js"
import { useLocation, useParams } from 'react-router-dom'
import { notification, Spin, Typography } from 'antd'
import "./pagesDiary.css"

import ListAllPage from '../../components/customList/ListAllPage.jsx'

const PagesDiary = () => {
  const [cardNote, setCardNote] = useState([])
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const location = useLocation()
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const controller = new AbortController()
    const noteDiary = () => {
      setLoading(true)
      axiosCache({
        method: "get",
        url: `post/getPosts/${params.date}`,
        withCredentials: true,
        signal: controller.signal
      })
        .then((data) => {
          setCardNote(data.data)
        })
        .catch((err) => {
          if (err.message != "canceled") {
            api.error({
              message: "Ошибка!",
              description: "Произошла ошибка!",
              showProgress: true,
            })
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }

    noteDiary()

    return () => controller.abort()
  }, [params.date, api])
  
  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <ListAllPage data={cardNote}/>
      </Spin>

    </>

  )
}

export default memo(PagesDiary)