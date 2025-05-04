import { Typography } from 'antd'
import React from 'react'

const NoteEmpty = () => {
    return (
        <div className="container" style={{ height: "100%" }}>
            <div className="row" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <img style={{ marginBottom: 35 }} src="/undraw_online_articles.svg" height={250} />
                <Typography.Title style={{ marginBottom: 10 }} level={2}>Записей нет</Typography.Title>
                <Typography.Text>Похоже, самое время написать что-нибудь</Typography.Text>
            </div>
        </div>
    )
}

export default NoteEmpty