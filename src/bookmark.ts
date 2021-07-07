export interface Data {
  disabled?: boolean
  url?: string
}

var AnimeBookmarkPopupId = "anime-bookmark-popup"
var AnimeBookmarkDataKey = "anime-bookmark-data"
var AnimeBookmarkData = {
  getData(): Data | null {
    const data = localStorage.getItem(AnimeBookmarkDataKey)
    if (!data) return null
    return JSON.parse(data)
  },

  setData(data: Data) {
    const raw = JSON.stringify(data)
    localStorage.setItem(AnimeBookmarkDataKey, raw)
  },

  set<Key extends keyof Data>(name: Key, value: Data[Key]) {
    const data: Data = this.getData() ?? {}
    data[name] = value
    this.setData(data)
  },

  get<Key extends keyof Data>(name: Key): Data[Key] | null {
    return this.getData()?.[name] ?? null
  },
}
var AnimeBookmarkActions = {
  next() {},

  load() {},

  save() {},

  exit() {
    AnimeBookmarkData.set("disabled", true)
    const popup = document.getElementById(AnimeBookmarkPopupId)
    if (popup) popup.style.display = "none"
  },
}
var AnimeBookmarkDOM = {
  addPopup() {
    const popup = document.createElement("div")

    popup.id = AnimeBookmarkPopupId
    popup.style.position = "fixed"
    popup.style.top = "50vh"
    popup.style.left = "calc(100vw - 25px)"
    popup.style.transform = "translateY(-50%)"
    popup.style.width = "25px"
    popup.style.height = "100px"
    popup.style.borderRadius = "15px 0 0 15px"
    popup.style.backgroundColor = "white"
    popup.style.border = "black 1px solid"
    popup.style.overflow = "hidden"
    popup.style.margin = "0"
    popup.style.padding = "0"

    this.addButton(popup, "exit")
    this.addButton(popup, "save")
    this.addButton(popup, "load")
    this.addButton(popup, "next")

    document.body.appendChild(popup)
  },

  addButton(popup: HTMLDivElement, action: keyof typeof AnimeBookmarkActions) {
    const button = document.createElement("button")

    button.style.height = "25px"
    button.style.width = "25px"
    button.style.margin = "0"
    button.style.padding = "0"

    button.innerHTML = action

    button.onclick = AnimeBookmarkActions[action]

    popup.appendChild(button)
  },

  genNext() {
    const current = new URL(window.location.href)

    const numbers = Array.from(current.pathname.matchAll(/\d+/g))

    const lastNumberMatch = numbers[numbers.length - 1]
    const lastNumber = lastNumberMatch[0]
    const lastNumberIndex = lastNumberMatch.index as number

    const newLastNumber = Number(lastNumber) + 1

    current.pathname =
      current.pathname.slice(0, lastNumberIndex) +
      newLastNumber +
      current.pathname.slice(lastNumberIndex + lastNumber.length)

    return current.href
  },
}

document.addEventListener("DOMContentLoaded", () => {
  const data = AnimeBookmarkData.getData()

  if (data?.disabled) return

  AnimeBookmarkDOM.addPopup()
})
