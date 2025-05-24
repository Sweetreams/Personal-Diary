const ListTags = ({props}) => {
    return props.map((el => {
        return (
            <div key={el.tags.id + 100000} style={{
              background: el.tags.id === 1
              ? "#FEFFC9"
              : el.tags.id === 2 ? "#FFC9C9"
              : "#333333",

              color: el.tags.id === 1
              ? "#FFDE31"
              : el.tags.id === 2 ? "#FF3131"
              : "#333333"
              }} className="listItemNoteDateTag">
              <p >{el.tags.tag}</p>
            </div>
          )
    }))

}

export default ListTags