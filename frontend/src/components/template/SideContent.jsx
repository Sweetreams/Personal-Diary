import { useEffect, useMemo, useState } from 'react'
import { Menu, Spin } from "antd"
import "./sideContent.css"
import "../../globalStyles/colorStyle.css"
import ListSideContent from '../customList/ListSideContent.jsx'
import postService from '../../api/service/postService.js'
import { dataProcessing } from '../../utils/dataProcessing.js'
import ListSideBarTags from '../customList/ListSideBarTags.jsx'

const SideContent = ({ collapse }) => {
    const [content, setContent] = useState([])
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const PostsInfo = await postService.getPostsInfo()
            setContent(PostsInfo.postDate)
            setTags(PostsInfo.postTage)
            setLoading(false)
        }
        fetchData()
    }, [])

    let dataAfterProcessing = useMemo(() => dataProcessing(content), [content])
    return (
        <Spin spinning={loading}>
            <div style={{ display: collapse ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: 10, fontSize: 16, padding: "0px 21px 0px 21px" }}>
                <div style={{position:"relative", display: tags ? "flex" : "none", flexDirection: "row", flexWrap: "wrap", columnGap: 5, rowGap: 10, padding: "10px 0px 10px 0px", width: "100%" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 1, background: "#d9d9d9" }}></div>
                    <ListSideBarTags props={tags} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 1, background: "#d9d9d9" }}></div>
                </div>

                <ListSideContent props={dataAfterProcessing} />
            </div>
        </Spin>

    )
}

export default SideContent