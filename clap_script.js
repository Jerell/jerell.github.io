const mainTitle = document.querySelector('#mainTitle')
const cheeks = document.querySelector('#cheeks')
const handSelect = document.querySelector('#handSelect')

const hands = ['👏','👏🏻','👏🏼','👏🏽','👏🏾','👏🏿']

const titleText = 'Clappa'

var selectionNum = 0

var selected = hands[selectionNum]

const selectNext = () => {
  selectionNum++
  if(selectionNum >= hands.length){
    selectionNum = 0
  }
  selected = hands[selectionNum]
}



const clap = (string) => {
  return string.split(' ').join(selected)
}

mainTitle.onclick = () => {
  selectNext()
  handSelect.children[0].textContent = selected
  mainTitle.textContent = selected + titleText + selected
}

handSelect.onclick = () => {
  selectNext()
  handSelect.children[0].textContent = selected
  mainTitle.textContent = selected + titleText + selected
}

cheeks.onkeyup = () => {
  let input = cheeks.value

  if(input.length > 0 && input.indexOf(' ') > 0){
    let output = input.indexOf(' ') > 0 ? clap(input) : ''
    cheeks.value = output
  }
}