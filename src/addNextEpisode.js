{
  const select = document.getElementsByTagName("select")[0]
  const first = document.createElement("option")
  const current = select.children[1]
  const next = select.children[0]

  let url = current.getAttribute("value")

  const nums = []
  const regex = /\d/g
  let res = regex.exec(url)
  while (res !== null) {
    nums.push(+res[0])
    res = regex.exec(url)
  }

  let i = 0
  url = url.replace(/\d/g, "placeholder")
  while (url.includes("placeholder")) {
    url = url.replace("placeholder", nums[i] + (nums.length - 1 === i ? 1 : 0))
    i++
  }

  next.style.backgroundColor = "white"
  first.style.backgroundColor = "white"
  next.innerHTML = "Prochain épisode."
  first.setAttribute("selected", "true")
  next.setAttribute("value", url)
  select.prepend(first)

  console.log("✔ Nouvel épisode ajouté !")
}
