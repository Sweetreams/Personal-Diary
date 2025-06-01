import React from 'react'
import { Card, Col, Row, Statistic, Typography } from "antd"
import CountUp from 'react-countup';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"
import ListFormEmotionsStatistic from '../../components/customList/ListFormEmotionsStatistic';
import { Column } from '@ant-design/plots';

const formatter = value => <CountUp end={value} separator="," />;

const StatisticPage = () => {
  const [statistic, setStatistic] = useState(1)

  useEffect(() => {
    document.title = "Стастистика"
  }, [])

  useEffect(() => {

    const controller = new AbortController()

    axios({
      method: "get",
      url: "https://personal-diary-s9tr.onrender.com/stat/statisticCount",
      withCredentials: true,
      signal: controller.signal
    }).then((req) => {
      console.log(req.data.data)
      setStatistic(req.data.data)
    }).catch((req) => {
      console.log(req.response.data)
    })

    return () => { controller.abort() }
  }, [])

  const config = {
    data: statistic[1],
    xField: 'count',
    yField: 'emotions'
  }

  return (
    <div className="container" style={{ justifyContent: "normal", alignItems: "normal", flexDirection: "column", height: "100%" }}>
      <Row>
        <Typography.Title level={3}>Статистка пользователя</Typography.Title>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card
            variant="borderless"
            children={<Statistic title="Количество постов" value={statistic[0]} precision={2} formatter={formatter} />}
          />
        </Col>
      </Row>
      <Row>
        <Typography.Title level={3}>Статистика постов</Typography.Title>
      </Row>
      <Row>
        <Col span={6} style={{ minWidth: 150 }}>
          <ListFormEmotionsStatistic emotions={statistic[1]} />
        </Col>
        <Col span={18} style={{ display: "flex", alignItems: "center" }}>
          <Column
            {...config}
          />
        </Col>

      </Row>

    </div>
  )
}

export default StatisticPage