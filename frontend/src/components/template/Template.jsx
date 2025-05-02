import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import "./template.css"
import "../../globalStyles/colorStyle.css"
import SecurityPage from '../../page/securityPage/SecurityPage'
import Headers from './Headers'
import { Button, ConfigProvider, Layout, Modal, Typography } from 'antd'
import "../../globalStyles/colorStyle.css"

const Template = () => {
  const [collapse, isCollapse] = useState(false)
  const [openModal, isOpenModal] = useState(!localStorage.getItem("NotNew"))
  const onCancel = () => {
    isOpenModal((v) => localStorage.setItem("NotNew", !v))
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverBorderColor: localStorage.getItem("defaultHoverBorderColor") ? localStorage.getItem("defaultHoverBorderColor") : "var(--color-c7c7)",
            defaultHoverColor: localStorage.getItem("defaultHoverColor") ? localStorage.getItem("defaultHoverColor") : "var(--color-5959)",
            defaultBg: localStorage.getItem("defaultBg") ? localStorage.getItem("defaultBg") : "#ffffff",
            defaultActiveBg: localStorage.getItem("defaultActiveBg") ? localStorage.getItem("defaultActiveBg") : "#ffffff",
            defaultHoverBg: localStorage.getItem("defaultHoverBg") ? localStorage.getItem("defaultHoverBg") : "#ffffff",

            defaultColor: localStorage.getItem("defaultColor") ? localStorage.getItem("defaultColor") : "#333333",
            colorBorder: localStorage.getItem("colorBorder") ? localStorage.getItem("colorBorder") : "#d9d9d9",
            defaultActiveBorderColor: localStorage.getItem("defaultActiveBorderColor") ? localStorage.getItem("defaultActiveBorderColor") : "#0958d9",
            defaultActiveColor: localStorage.getItem("defaultActiveColor") ? localStorage.getItem("defaultActiveColor") : "#0958d9"
          },
          Layout: {
            headerPadding: "0 20px",
            bodyBg: localStorage.getItem("bodyBg") ? localStorage.getItem("bodyBg") : "#f8f8f8",
            siderBg: localStorage.getItem("siderBg") ? localStorage.getItem("siderBg") : "#ffffff",
            headerBg: localStorage.getItem("headerBg") ? localStorage.getItem("headerBg") : "#ffffff",
            triggerBg: "#ffffff"
          },
          Typography: {
            colorText: localStorage.getItem("colorText") ? localStorage.getItem("colorText") : "var(--color-3333)",
            colorLink: "var(--color-5959)",
            colorLinkHover: "var(--color-c7c7)",
            fontFamilyCode: "TT Commons"
          },
          Input: {
            colorBorder: "var(--color-5959)",
            hoverBorderColor: "var(--color-c7c7)",
            activeBorderColor: "var(--color-c7c7)"
          },
          Dropdown: {
            colorBgElevated: localStorage.getItem("siderBg") ? localStorage.getItem("siderBg") : "#ffffff",
            controlItemBgHover: localStorage.getItem("controlItemBgHover") ? localStorage.getItem("controlItemBgHover") : "rbga(0,0,0,0.04)"
          },
          Card: {
            bodyPadding: 20,
            borderRadiusLG: 20,
            colorBgContainer: localStorage.getItem("siderBg") ? localStorage.getItem("siderBg") : "#ffffff",
            colorBorderSecondary: localStorage.getItem("colorBorder") ? localStorage.getItem("colorBorder") : "#f0f0f0"
          }
        },
      }
      }
    >

      <SecurityPage>
        {localStorage.getItem("NotNew")
          ? <></>
          : <Modal width={600} onCancel={onCancel} open={openModal} footer={null}>
            <div style={{padding: "30px 10px 20px 10px"}}>
              <Typography.Title level={2}>Добро пожаловать в ваш личный дневник</Typography.Title>
              <Typography.Text>Здесь хранятся ваши мысли, мечты и моменты, которые стоит запомнить. Этот дневник — ваше безопасное пространство, где можно быть собой, не боясь оценок. Пишите, когда вдохновляетесь, размышляете или просто хотите сохранить кусочек дня.</Typography.Text>
              <br />
              <br />
              <Typography.Text>Начните свою историю сегодня. 💙</Typography.Text>
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button onClick={onCancel}>Начать вести дневник</Button>
              </div>
            </div>
          </Modal>}

        <Layout>
          <Layout.Sider trigger={null} collapsedWidth={80} collapsible collapsed={collapse} style={{ height: '100vh', minWidth: "200px", width: "18vw", maxWidth: "18vw", position: 'sticky', insetInlineStart: 0, top: 0, bottom: 0 }}>
            <SideBar collapse={collapse} isCollapse={isCollapse} />
          </Layout.Sider>

          <Layout>
            <Layout.Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Headers collapse={collapse} isCollapse={isCollapse} />
            </Layout.Header>
            <Layout.Content style={{ margin: "20px" }}>
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout>
      </SecurityPage>
    </ConfigProvider>
  )
}

export default Template