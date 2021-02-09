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
          <span onclick="remove('${anime}')">❌</span>
          <span onclick="add('${anime}')">💾</span>
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
  return browser.storage.local.get()
}

async function set(object) {
  await browser.storage.local.set(object)
  await refresh()
}

async function remove(name) {
  await browser.storage.local.remove(name)
  await refresh()
}

refresh().catch()
