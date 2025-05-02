import React, { useEffect, useState, memo } from 'react'
import axiosCache from "../../utils/axios.js"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Card, List, notification, Spin, Typography } from 'antd'
import "./pagesDiary.css"
import { RMark } from '../../utils/markdown/render'
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import DOMPurify from 'dompurify';
import axios from 'axios'
import { dateProcessingForRequest, dateTimeProcessingForRequest } from '../../utils/dateConvertor.js'
import ListTags from '../../components/customList/ListTags.jsx'

const PagesDiary = () => {

  const [cardNote, setCardNote] = useState([])
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const location = useLocation()
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  const onDelete = (values) => {
    axios({
      method: "delete",
      url: "http://localhost:8000/post/deletePost",
      data: {
        "id": values
      },
      withCredentials: true
    })
      .then((req) => {
        if (req.status === 200) {
          api.success({
            message: "Успешно",
            description: "Пост успешно удалён!",
            showProgress: true,
          })
        }

        navigate(0)
      })
      .catch((req) => {
        api.error({
          message: "Ошибка",
          description: req.response.data.message.errorMessage,
          showProgress: true,
        })
      })
  }

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

  const noteDateTitle = dateProcessingForRequest(params.date)
  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>

        <Typography.Text className="noteDateTitle">{noteDateTitle}</Typography.Text>
        <List
          locale={{ emptyText: "Нет данных" }}
          key={cardNote.id}
          dataSource={cardNote}
          renderItem={(item) => {
            let dateTimeAfterProcessing = dateTimeProcessingForRequest(item);
            return (
              <>
                <div className="listItemNote" id={"post_" + item.id} >
                  <div className="listItemNoteDate">
                    <div className="listItemNoteDateTitleContainer">
                      <Typography.Text className="listItemNoteDateTitle">{dateTimeAfterProcessing}</Typography.Text>
                    </div>

                    <div className="listItemNoteDateIcon">
                      <Link className="listItemNoteDateIconIcon" to={"/editingPost/" + item.id}><EditOutlined /></Link>
                      <DeleteOutlined className="listItemNoteDateIconIcon" onClick={() => {
                        onDelete(item.id)
                      }} />
                    </div>

                    <div className="listItemNoteDateTagsList">
                      <ListTags props={item.TagsAndPost}/>
                      

                    </div >
                  </div>

                  <Card style={{wordBreak: "break-all"}}>

                    <div>
                      <Typography.Text>{item.title}</Typography.Text>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(new RMark().render(item.desc)) }} ></div>
                  </Card>
                </div>

              </>
            )
          }}
        />
      </Spin>

    </>

  )
}

export default memo(PagesDiary)