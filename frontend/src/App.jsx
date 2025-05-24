import './App.css'
import { useEffect, useState } from 'react'
import axiosCache from './utils/axios'
import NoteEmpty from './components/component/NoteEmpty'
import ListAllPage from './components/customList/ListAllPage'

const axiosRequest = (controller) => {
  return axiosCache({
    method: "get",
    url: `post/getAllPost`,
    withCredentials: true,
    signal: controller.signal
  })
}

const App = () => {
  const [dataRequest, setDataRequest] = useState([])
  const [statusRequest, setStatusRequest] = useState(0)
  useEffect(() => {
      document.title = "SoulTrack - " + "посты"

    const controller = new AbortController()
    axiosRequest(controller)
      .then((data) => {
        setDataRequest(data)
        setStatusRequest(data.status)
      })
      .catch((data) => {
        setDataRequest(data.response)
        setStatusRequest(data.response.status ? data.response.status : "success")
      })
    return () => controller.abort()
  }, [])

  return (
    <>
      {statusRequest === 200
        ?
        <div className="container" style={{ height: "100%", flexDirection: "column", justifyContent: "normal", alignItems: "normal" }}>
          <ListAllPage data={dataRequest ? dataRequest.data : []} />
        </div>
        : <NoteEmpty />
      }
    </>
  )
}

export default App
