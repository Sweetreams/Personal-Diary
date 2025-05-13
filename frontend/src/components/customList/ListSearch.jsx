import React from 'react'
import { dateTimeProcessingForRequest } from '../../utils/dateConvertor'
import {Typography} from "antd"
const dateProccesing = (date) => {
    return String(date.getFullYear())
        + String(Number(date.getMonth() + 1) < 10 ? "0" + Number(date.getMonth() + 1) : Number(date.getMonth() + 1))
        + String(date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
}

const ListSearch = ({ props, cancel }) => {
    return props.map((item, index) => {
        return (
        <Typography.Link style={{fontFamily: "TT Commons"}} key={index} onClick={(v) => cancel(v)} href={"http://localhost:5173/pagesdiary/" + dateProccesing(new Date(item.updatedAt)) + "#post_" + item.id}>
            <div style={{ display: "flex", gap: "30px" }}>
                <div>{dateTimeProcessingForRequest(item)}</div>
                <div>{item?.title}</div>
            </div>
            <p style={{ height: "30px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{item?.desc}</p>
        </Typography.Link>
        )

    })
}

export default ListSearch