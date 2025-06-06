import { Card, Col, Row, Statistic } from 'antd'
import React from 'react'
import { emotion } from '../../utils/emotion'
import CountUp from 'react-countup';

const formatter = value => <CountUp end={value} separator="," />;

const ListFormEmotionsStatistic = ({ emotions = [] }) => {
    return emotions.map((el) => {
        const emot = emotion[el.emotions]
        return (

            <Card
                className="ListFormEmotionsStatistic"
                variant="borderless"
                style={{ width: "200px", height: "120px" }}
            >
                <Statistic title={emot.desc} value={el.count} precision={2} formatter={formatter} />
            </Card>

        )
    })
}

export default ListFormEmotionsStatistic