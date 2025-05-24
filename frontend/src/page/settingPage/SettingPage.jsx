import { useEffect } from 'react'
import { Button, Checkbox, Typography } from "antd"
import { useNavigate } from 'react-router-dom'
import "./settingpage.css"
const SettingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Настройки"
    console.log(localStorage.getItem("NotNew"))
  }, [])

  const onClickResetTheme = () => {
    navigate(0)
    localStorage.clear()
    localStorage.setItem("NotNew", false)
  }

  const onClickDarkTheme = () => {
    navigate(0)
    localStorage.setItem("darkTheme", true)

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
      <div className="col">
        <div className="row">
          <Typography.Title>Настройки оформления</Typography.Title>
        </div>
        <div className="row">
          <div className="card" >
            <img src="../../../public/mooncard.svg" alt="" className="card-image" />
            <div className="card-body">
              <Typography.Title level={2}>Темная тема</Typography.Title>
              <Button disabled={localStorage.getItem("darkTheme")} onClick={() => onClickDarkTheme()}>Переключиться</Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card_sun" >
            <img src="../../../public/sun.svg" alt="" className="card-image" />
            <div className="card-body">
              <Typography.Title level={2}>Светлая тема</Typography.Title>
              <Button disabled={!localStorage.getItem("darkTheme")} onClick={() => onClickResetTheme()}>Переключиться</Button>
            </div>
          </div>
        </div>

      </div>
      {/* <Button onClick={onClickDarkTheme}>Темная тема</Button>
      <Button onClick={onClickResetTheme}>Ресет</Button> */}
    </>
  )
}

export default SettingPage