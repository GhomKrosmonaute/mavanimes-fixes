;(() => {
  const $select = document.getElementsByTagName("select")[0]
  const $voidOption = $select.children[0]

  function inc(url) {
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
      url = url.replace(
        "placeholder",
        nums[i] + (nums.length - 1 === i ? 1 : 0)
      )
      i++
    }

    return url
  }

  function addOption(url, label) {
    const $option = document.createElement("option")
    $option.setAttribute("value", url)
    $option.style.backgroundColor = "white"
    $option.innerHTML = label
    $select.prepend($option)
  }

  const currentUrlObject = new URL(window.location.href)
  const currentUrl = currentUrlObject.origin + currentUrlObject.pathname
  const $lastOption = $select.children[1]
  const lastUrl = $lastOption.getAttribute("value")

  addOption(inc(currentUrl), "Episode suivant")
  addOption(inc(lastUrl), "Dernier épisode +1")

  $select.prepend($voidOption)

  console.log("✔ successfully applied mavanimes.co fixes")
})()
