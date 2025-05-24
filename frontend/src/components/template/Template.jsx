import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import "./template.css"
import "../../globalStyles/colorStyle.css"
import SecurityPage from '../../page/securityPage/SecurityPage'
import Headers from './Headers'
import { ConfigProvider, Layout } from 'antd'
import "../../globalStyles/colorStyle.css"
import { theme } from '../../globalStyles/themeAntd'
import ModalNotNew from '../component/ModalNotNew'

const Template = () => {
  const [collapse, isCollapse] = useState(false)
  const [openModal, isOpenModal] = useState(!localStorage.getItem("NotNew"))
  
  useEffect(() => {
    document.title = "SoulTrack"
  }, [])

  return (
    <ConfigProvider
      theme={theme}
    >

      <SecurityPage>
        {localStorage.getItem("NotNew")
          ? <></>
          : <ModalNotNew isOpenModal={isOpenModal} openModal={openModal}/>}

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