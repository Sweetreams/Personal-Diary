import { RMark } from "./render"

const sampleText = `
# Заголовок 1-го уровня

## Заголовок 2-го уровня

### Заголовок 3-го уровня

Это *курсивный* текст, а это **жирный**. Можно даже ~~зачеркнуть~~ текст.

Перенос\\строки
Перенос<br/>строки

Первый параграф

Второй параграф
Продолжение второго параграфа

- Это ненумерованный список
- Второй пункт
  - Вложенный пункт

1. Нумерованный список
2. Второй пункт
   1. Вложенный

[Ссылка на Google](https://www.google.com)

![Альтернативный текст](https://example.com/image.jpg "Подсказка")

> Цитата может выглядеть так

| Таблица | Пример |
|---------|--------|
| Строка 1 | Данные |
| Строка 2 | Данные |

**Горизонтальная линия ниже:**
`

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