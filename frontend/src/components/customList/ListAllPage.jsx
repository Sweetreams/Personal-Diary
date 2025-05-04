import { Card, Typography } from 'antd'
import React from 'react'
import { dataTransformer } from '../../utils/dataTransformer'
import ListAllPagePost from './ListAllPagePost'


const ListAllPage = ({ data }) => {
    return dataTransformer(data).map((el, index) => {
        return (
            <div key={Math.floor(Math.random(index) * 10000)} className="row" style={{ marginBottom: 40 }}>
                <Typography.Text className="noteDateTitle">{el[0]}</Typography.Text>
                <ListAllPagePost data={el[1]} />
            </div>
        )
    })

}

export default ListAllPage