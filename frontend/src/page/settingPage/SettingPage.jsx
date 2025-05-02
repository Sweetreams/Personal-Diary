import React from 'react'
import { Button } from "antd"
import { useNavigate } from 'react-router-dom'




const SettingPage = () => {
  const navigate = useNavigate()
  
  const onClickResetTheme = () => {
    navigate(0)
    localStorage.clear()
    localStorage.setItem("NotNew", false)
  }

  const onClickDarkTheme = () => {
    navigate(0)
    localStorage.setItem("bodyBg", "#121212")
    localStorage.setItem("siderBg", "#1E1E1E")
    localStorage.setItem("headerBg", "#1E1E1E")
    // button
    localStorage.setItem("defaultHoverBorderColor", "#444444")
    localStorage.setItem("defaultHoverColor", "#FFFFFF")
    localStorage.setItem("defaultBg", "#2D2D2D")
    localStorage.setItem("defaultActiveBg", "#3D3D3D")
    localStorage.setItem("defaultHoverBg", "#3D3D3D")
    localStorage.setItem("defaultColor", "#FFFFFF")
    localStorage.setItem("colorBorder", "#444444")
    localStorage.setItem("defaultActiveBorderColor", "#FBEECE")
    localStorage.setItem("defaultActiveColor", "#FBEECE")
    //Typography
    localStorage.setItem("colorText", "#FFFFFF")
    //Dropdown
    localStorage.setItem("controlItemBgHover", "rgba(45,45,45,0.4)")
  }

  return (
    <>
      <Button onClick={onClickDarkTheme}>Темная тема</Button>
      <Button onClick={onClickResetTheme}>Ресет</Button>
    </>
  )
}

export default SettingPage