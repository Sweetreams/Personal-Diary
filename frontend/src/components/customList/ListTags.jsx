const ListTags = ({props}) => {
    return props.map((el => {
        return (
            <div key={el.tags.id + 100000} style={{background: el.tags.color}} className="listItemNoteDateTag">
              <span>{el.tags.tag}</span>
            </div>
          )
    }))

}

export default ListTags