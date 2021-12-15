const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')

const API = 'http://localhost:3334'

async function load() {
  const res = await fetch(API).then((data) => data.json())
  res.urls.map(({ name, url }) => {
    addElement(name, url)
  })
}

async function addElementToApi(name, url) {
  const res = await fetch(`${API}?name=${name}&url=${url}`).then((data) =>
    data.json()
  )

  if (res.message === 'OK') addElement(name, url)
}

load()

function addElement(name, url) {
  const li = document.createElement('li')
  const a = document.createElement('a')
  const trash = document.createElement('span')

  a.href = url
  a.innerHTML = name
  a.target = '_blank'

  trash.innerHTML = 'x'
  trash.onclick = () => removeElement(trash)

  li.append(a)
  li.append(trash)
  ul.append(li)
}

function removeElement(el) {
  if (confirm('Are you sure you want to delete this URL?'))
    el.parentNode.remove()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  let { value } = input

  if (!value) return alert('Fill in the field!')

  const [name, url] = value.split(',')

  if (!url) return alert('Format the text correctly!')

  if (!/^http/.test(url)) return alert('Enter the URL correctly!')

  addElementToApi(name, url)

  input.value = ''
})
