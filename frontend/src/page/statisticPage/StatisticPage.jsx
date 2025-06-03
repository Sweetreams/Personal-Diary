import React from 'react'
import { Card, Col, Row, Statistic, Typography } from "antd"
import CountUp from 'react-countup';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"
import ListFormEmotionsStatistic from '../../components/customList/ListFormEmotionsStatistic';
import { Column } from '@ant-design/plots';

const formatter = value => <CountUp end={value} separator="," />;

const emotions = {
  happiness: "Радость",
  anticipation: "Предвкушение",
  sadness: "Грусть",
  anger: "Гнев",
  excitement: "Волнение",
  boredom: "Скука",
  embarrassment: "Смущение",
  other: "Другое"
}

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
      setStatistic(req.data.data)
    }).catch((req) => {
    })

    return () => { controller.abort() }
  }, [])

  const config = {
    className: "columnStatistic",
    height: 400,
    data: statistic[1],
    xField: (d) => emotions[d.emotions],
    yField: "count",
    tooltip: false
  }

  return (
    <div className="container" style={{ justifyContent: "normal", alignItems: "normal", flexDirection: "column", height: "100%" }}>
      <Row>
        <Typography.Title level={3}>Статистка пользователя</Typography.Title>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card className="cardStatisticUser"
            variant="borderless"
            children={<Statistic title="Количество постов" value={statistic[0]} precision={2} formatter={formatter} />}
          />
        </Col>
      </Row>
      <Row>
        <Typography.Title level={3}>Статистика использованных эмоций</Typography.Title>
      </Row>
      <Row>
        <div className="cardStatistic" style={{ display: "flex", width: "100%" }}>
          <div className="cardStatisticLeft" style={{ width: "50%", display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "flex-start", gap: 15 }}>
            <ListFormEmotionsStatistic emotions={statistic[1]} />
          </div>
          <div className="cardStatisticRight" style={{ width: "50%" }}>
            <Column
              {...config}
            />
          </div>
        </div>

        {/* <Col span={12}>
          <Row  style={{ gap: 15 }}>
            
          </Row>
        </Col>
        <Row span={12}>
          
        </Row>
        <Col>

        </Col> */}
        {/* <Row span={24} >
          <Row span={12} style={{ gap: 15, width: "100%" }}>
            <ListFormEmotionsStatistic emotions={statistic[1]} />
          </Row>
          <Col span={12}>
           
          </Col>

        </Row> */}
      </Row>

    </div>
  )
}

export default StatisticPage