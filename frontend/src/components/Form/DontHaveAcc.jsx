import React from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, Spin, Typography } from 'antd'
const DontHaveAcc = () => {
  return (
    <Typography.Text style={{ marginBottom: "10px" }}>У меня нет аккаунта, <a className="a_typeClass" >зарегистрироваться?</a> </Typography.Text>
  )
}

export default DontHaveAcc