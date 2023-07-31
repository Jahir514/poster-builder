//fetch elements by ID
const headingBtn = document.getElementById('heading')
const removeHeading = document.getElementById('removeHeading')
const headingItem = document.getElementById('headingItem')

const imageBtn = document.getElementById('image')
const removeImage = document.getElementById('removeImage')
const imageItem = document.getElementById('imageItem')

const descriptionBtn = document.getElementById('description')
const removeDescription = document.getElementById('removeDescription')
const descriptionItem = document.getElementById('descriptionItem')

const headingInput = document.getElementById('headingInput')
const handleDescription = document.getElementById('handleDescription')

const previewHeading = document.getElementById('previewHeading')
const previewDescription = document.getElementById('previewDescription')

//make visible Heading Item
headingBtn.addEventListener('click', () => {
  headingItem.classList.remove('hidden')
  headingInput.value = ''
})
//make invisible Heading Item
removeHeading.addEventListener('click', () => {
  headingItem.classList.add('hidden')
})

//make visible Image Item
imageBtn.addEventListener('click', () => {
  imageItem.classList.remove('hidden')
})
//make invisible Image Item
removeImage.addEventListener('click', () => {
  imageItem.classList.add('hidden')
})

//make visible Discription Item
descriptionBtn.addEventListener('click', () => {
  descriptionItem.classList.remove('hidden')
})
//make invisible Description Item
removeDescription.addEventListener('click', () => {
  descriptionItem.classList.add('hidden')
})

//handle heading input preview
headingInput.addEventListener('keyup', () => {
  previewHeading.innerHTML = headingInput.value
})

//handle Alignment of heading
const leftAlign = () => {
  previewHeading.classList.remove('text-center')
  previewHeading.classList.remove('text-right')
  previewHeading.classList.add('text-left')
}
const middleAlign = () => {
  previewHeading.classList.remove('text-left')
  previewHeading.classList.remove('text-right')
  previewHeading.classList.add('text-center')
}
const rightAlign = () => {
  previewHeading.classList.remove('text-center')
  previewHeading.classList.remove('text-left')
  previewHeading.classList.add('text-right')
}

//handle color of heading
const addBlueColor = () => {
  previewHeading.classList.remove('text-green-500')
  previewHeading.classList.remove('text-black-500')
  previewHeading.classList.add('text-blue-500')
}
const addBlackColor = () => {
  previewHeading.classList.remove('text-blue-500')
  previewHeading.classList.remove('text-green-500')
  previewHeading.classList.add('text-black-500')
}
const addGreenColor = () => {
  previewHeading.classList.remove('text-blue-500')
  previewHeading.classList.remove('text-black-500')
  previewHeading.classList.add('text-green-500')
}

//handle image
const chooseFile = document.getElementById('image-file')
const imgPreview = document.getElementById('imageContent')

function getImgData() {
  const files = chooseFile.files[0]
  if (files) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(files)
    fileReader.addEventListener('load', function () {
      imgPreview.style.display = 'block'
      imgPreview.innerHTML = '<img src="' + this.result + '" />'
    })
  }
}
chooseFile.addEventListener('change', function () {
  getImgData()
})

//handle heading input preview
handleDescription.addEventListener('keyup', () => {
  previewDescription.innerHTML = handleDescription.value
})

//handle download poster

const downloadPoster = () => {
  var container = document.getElementById('convertToImage')
  html2canvas(container, { allowTaint: true }).then(function (canvas) {
    console.log(canvas)
    var link = document.createElement('a')
    document.body.appendChild(link)
    link.download = 'poster.png'
    link.href = canvas.toDataURL()
    link.target = '_blank'
    link.click()
  })
}
