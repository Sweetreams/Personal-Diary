import { Tooltip } from "antd"
import { HEXtoRGB, Luma } from "../../utils/LumaColor"

const ListSideBarTags = ({ props }) => {
  return props
  .map((el) => {
    const color = el.color
    return (
      <Tooltip title={el.tag}>
        <a style={{ display: "flex", flexDirection: "row", alignItems: "center", background: color, padding: "2px 5px", borderRadius: 8, minWidth: "60px", maxWidth: "50%", fontSize: 14, color: "#333333" }}>
          <div style={{ background: "#fff", position: "relative", borderRadius: 20, width: "17px", height: "17px", marginRight: 7 }}>
            <span style={{ position: "absolute", left: 6, top: 1.5 }}>{el.count}</span>
          </div>
          <span style={{width: "50%", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", position: "relative", top: 1, color: Luma(HEXtoRGB(el.color)) > 50 ? "#333" : "#fff" }}>{el.tag}</span>
        </a>
      </Tooltip>
    )
  })
}

export default ListSideBarTags