import React from 'react'
import SecurityAdminPage from '../securityPage/SecurityAdminPage'
import { Card, Col, notification, Row, Statistic, Typography } from "antd"

const AdminPage = () => {
    return (
        <SecurityAdminPage>
            <div className="container" style={{ justifyContent: "normal", alignItems: "normal", flexDirection: "column", height: "100%" }}>
        <Row>
          <Typography.Title level={3}>Админ панель</Typography.Title>
        </Row>
        <Row>
          <Typography.Title level={4}>Стастистика сайта</Typography.Title>
        </Row>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          {/* <Col span={6}>
            <Card className="cardStatisticUser"
              variant="borderless"
              children={<Statistic title="Количество постов" precision={2} formatter={formatter} />}
            />
          </Col> */}
        </Row>
        <Row>
          <Typography.Title level={4}>Пользователи</Typography.Title>
        </Row>
      </div>
        </SecurityAdminPage>
    )
}

export default AdminPage