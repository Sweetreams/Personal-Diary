import { HEXtoRGB, Luma } from "../../utils/LumaColor"

const ListTags = ({props}) => {
    return props.map((el => {
        return (
            <div key={el.tags.id + 100000} style={{background: el.tags.color, color: Luma(HEXtoRGB(el.tags.color)) > 50 ? "#333" : "#fff"}} className="listItemNoteDateTag">
              <span>{el.tags.tag}</span>
            </div>
          )
    }))

}

export default ListTags