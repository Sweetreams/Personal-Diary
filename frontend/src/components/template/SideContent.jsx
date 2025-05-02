import React, { useEffect, useMemo, useState } from 'react'
import { ConfigProvider, List, Spin } from "antd"
import "./sideContent.css"
import { Link } from 'react-router-dom'
import "../../globalStyles/colorStyle.css"
import axios from "axios"
import ListSideContent from '../customList/listSideContent'

/**
 * 
 * @param {boolean} collapse 
 * @returns {object}
 */
const SideContent = () => {
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const dateRequest = () => {
            axios({
                method: "get",
                url: "http://localhost:8000/post/getPostsDate",
                withCredentials: true
            })
                .then((req) => {
                    setLoading(true)
                    setContent(req.data)
                })
                .catch()
                .finally(() => {
                    setLoading(false)
                })
        }
        return () => dateRequest()
    }, [])

    /**
     * 
     * @param {object} data 
     * @returns {object}
     */
    const dataProcessing = (data) => {
        return data.map((el) => {
            let [, year, month, day] = el.updatedAt.match(/^(\d{4})-(\d{2})-(\d{2})/)
            return [year, month, day]
        })
    }

    let dataAfterProcessing = useMemo(() => dataProcessing(content), [content])

    return (
        <Spin spinning={loading}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontSize: 16}}>
                <ListSideContent props={dataAfterProcessing} />
            </div>
        </Spin>

    )
}

export default SideContent