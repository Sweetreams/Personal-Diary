import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import "./ListSideContent.css"

const mountDate = {
    "01": "Январь",
    "02": "Февраль",
    "03": "Март",
    "04": "Аперль",
    "05": "Май",
    "06": "Июнь",
    "07": "Июль",
    "08": "Август",
    "09": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декарь",
}



const ListSideContent = ({ props }) => {
    const gropedData = props.reduce((acc, [year, month, day]) => {
        if (!acc[year]) acc[year] = {}
        if (!acc[year][month]) acc[year][month] = []
        acc[year][month].push(day)
        return acc
    }, {})

    const itemsmenu = Object.entries(gropedData)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([year, months]) => ({
            key: year,
            label: year,
            children: Object.entries(months)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([month, days]) => ({
                    key: `${year} - ${month}`,
                    label: mountDate[month],
                    children: days
                        .sort(([a], [b]) => b.localeCompare(a))
                        .map(day => ({
                            key: `${year} - ${month} - ${day}`,
                            label: <Link to={`/pagesdiary/${year + month + day}}`} onClick={() => {
                                document.querySelector(".layoutSider--open").className = "layoutSider"
                                document.querySelector(".menuOutline--open").className = "menuOutline"
                            }}><span>{day}.{month}.{year}</span></Link>
                        }))
                        
                }))

        }))

    return <Menu className="menuWithScrollbar" mode="inline" items={itemsmenu} />
}

export default ListSideContent