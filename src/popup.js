async function getList() {
  return (await browser.storage.local.get("anime-list"))["anime-list"] ?? []
}

async function setList(list) {
  await browser.storage.local.set({ "anime-list": list })
  await refresh()
}

async function refresh() {
  const $list = document.getElementById("anime-list")
  const list = await getList()
  $list.innerHTML = ""
  for (const anime of list) {
    const $anime = document.createElement("li")
    $anime.innerHTML = `
        <a href="${anime.url}">${anime.name}</a>
        <span>
          <span onclick="remove('${anime.name}')">❌</span>
          <span onclick="save('${anime.name}')">💾</span>
        </span>`
    $list.appendChild($anime)
  }
}

async function save(name) {
  const list = await getList()
  const anime = list.find((anime) => anime.name === name)
  anime.url = await getURL()
  await setList(list)
}

async function remove(name) {
  const list = await getList()
  const index = list.findIndex((anime) => anime.name === name)
  list.splice(index, 1)
  await setList(list)
}

async function add(name) {
  const list = await getList()
  list.push({
    name,
    url: await getURL(),
  })
  await setList(list)
}

async function getURL() {
  return (await browser.tabs.getCurrent()).url
}

refresh().catch()
