import React from 'react'
import { Button, Checkbox, ConfigProvider, Form, Input, Spin, Typography } from 'antd'
import FormItem from './FormItem'
import TextArea from 'antd/es/input/TextArea'

const onFinish = values => {
    console.log(values)
}

const FormComponent = () => {
    return (
        <Form
            name="formAuth"
            variant='filled'
            layout="vertical"
            onFinish={onFinish}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
            }}
        >
            <FormItem values={[
                {
                    name: "login",
                    label: "Логин",
                    type: Input,
                },
                {
                    name: "password",
                    label: "Пароль",
                    type: Input,
                },
                {
                    name: "checkbox",
                    content: "Запомнить меня?",
                    type: Checkbox,
                },
                {
                    content: "Войти",
                    htmlType: "submit",
                    type: Button,
                },
            ]}/>
        </Form>
    )
}

export default FormComponent