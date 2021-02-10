async function refresh() {
  const $list = document.getElementById("anime-list")
  const list = await get()
  $list.innerHTML = ""
  for (const anime of Object.keys(list)) {
    const url = list[anime]
    const $anime = document.createElement("li")
    $anime.innerHTML = `
        <a href="${url}">${anime}</a>
        <span>
          <span onclick="remove('${anime}').then()">❌</span>
          <span onclick="add('${anime}').then()">💾</span>
        </span>`
    $list.appendChild($anime)
  }
}

async function add(name) {
  return set({ [name]: await getURL() })
}

async function getURL() {
  return (await browser.tabs.getCurrent()).url
}

function get() {
  return browser.storage.sync.get()
}

async function set(object) {
  await browser.storage.sync.set(object)
  await refresh()
}

async function remove(name) {
  await browser.storage.sync.remove(name)
  await refresh()
}

refresh().catch()
