import React from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, Spin, Typography } from 'antd'
import DontHaveAcc from './DontHaveAcc'
import ForgotPassword from './ForgotPassword'



const FormItem = (props) => {
  return (
    props.values.map((el, index) => {
      return <>
        {index === props.values.length - 1 ? <><DontHaveAcc /> <ForgotPassword /> </> : null}
        <Form.Item
          key={index + 10}
          name={el.name}
          label={el.label}
          style={index === props.values.length - 1 ? { marginBottom: "10px" } : { marginBottom: "20px" }}
        >
          <el.type
          key={index}
          style={
            el.type === Input
              ? { width: "450px", paddingTop: "11px" }
              : el.type === Button
                ? { width: "130px", paddingTop: "3px" }
                : null}
                placeholder={el.label ? el.label + "..." : null} htmlType={el.htmlType ? el.htmlType : null}>{el.content ? el.content : null}</el.type>
        </Form.Item>

      </>
    })
  )
}

export default FormItem