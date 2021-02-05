{
  const select = document.getElementsByTagName("select")[0];
  const current = select.children[1];
  const next = select.children[0];

  const first = document.createElement("option");
  first.style.backgroundColor = "white"
  first.setAttribute("selected", "true")
  select.prepend(first)

  let url = current.getAttribute("value");

  const nums = [];
  const regex = /\d/g;
  let res = regex.exec(url);
  while (res !== null) {
    nums.push(+res[0])
    res = regex.exec(url)
  }

  console.log("nums", nums)

  let i = 0;
  url = url.replace(/\d/g, "placeholder")
  while (url.includes("placeholder")) {
    if (nums.length - 1 === i) {
      url = url.replace("placeholder", nums[i] + 1)
    } else {
      url = url.replace("placeholder", nums[i])
    }
    i++
  }

  next.setAttribute("value", url)
  next.style.backgroundColor = "white"
  next.innerHTML = "Prochain épisode."

  console.log("✔ Nouvel épisode ajouté !")
}