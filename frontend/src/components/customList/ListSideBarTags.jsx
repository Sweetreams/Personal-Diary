import { Tooltip } from "antd"
import { HEXtoRGB, Luma } from "../../utils/LumaColor"

const ListSideBarTags = ({ props }) => {
  return props
  .map((el) => {
    const color = el.color
    return (
      <Tooltip title={el.tag}>
        <a className="listSideBarTagsLink" style={{background: color}}>
          <div className="listSideBarTagsLinkContainer" >
            <span style={{ position: "absolute", left: 6, top: 1.5 }}>{el.count}</span>
          </div>
          <span className="listSideBarTagsLinkName" style={{color: Luma(HEXtoRGB(el.color)) > 50 ? "#333" : "#fff" }}>{el.tag}</span>
        </a>
      </Tooltip>
    )
  })
}

export default ListSideBarTags