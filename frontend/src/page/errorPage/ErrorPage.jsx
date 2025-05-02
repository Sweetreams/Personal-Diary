import React from 'react'
import { useRouteError } from 'react-router-dom'
import "./errorPage.css"
import "../../globalStyles/colorStyle.css"

const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div className="container">
      <div className="containerText">
        <p className="textHeader">Упс!</p>
        <p className="textDesc">К сожалению, произошла непредвиденная ошибка</p>
        <p className="textStatusError">{error.statusText} {error.status}</p>
      </div>
    </div>
  )
}

export default ErrorPage