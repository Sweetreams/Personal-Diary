import React from 'react'
import { Link } from 'react-router-dom'

const ListSideContent = ({props}) => {
    return props.map((props, index) => {
        return <Link style={{ fontSize: 16}} key={index} to={`/pagesdiary/${props[0] + props[1] + props[2]}`}><p className='ant-typography css-dev-only-do-not-override-144royw'>{props[2]}.{props[1]}.{props[0]}</p></Link>
    })
}

export default ListSideContent