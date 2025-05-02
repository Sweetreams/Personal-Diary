import { RMark } from "./render"
const MarkdownField = () => {
  return (
    <>
      <div id="textt"></div>
      <textarea onChange={(e) => {
        const page = document.getElementById("textt")
        if (page) {
          page.innerHTML = new RMark().render(e.target.value)
        }
      }}></textarea>
    </>
  )
}

export default MarkdownField