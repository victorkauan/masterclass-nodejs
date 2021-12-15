const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')

function addElement({ name, url }) {
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

  addElement({ name, url })

  input.value = ''
})
