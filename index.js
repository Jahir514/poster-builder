//fetch elements by ID
const headingBtn = document.getElementById('heading');
const removeHeading = document.getElementById('removeHeading');
const headingItem = document.getElementById('headingItem');

const imageBtn = document.getElementById('image');
const removeImage = document.getElementById('removeImage');
const imageItem = document.getElementById('imageItem');

const descriptionBtn = document.getElementById('description');
const removeDescription = document.getElementById('removeDescription');
const descriptionItem = document.getElementById('descriptionItem');

const headingInput = document.getElementById('headingInput');
const handleDescription = document.getElementById('handleDescription');

const previewHeading = document.getElementById('previewHeading');
const previewDescription = document.getElementById('previewDescription');

//input related data
let textInfo = {
  color: 'black',
  align: 'left',
};

//make visible Heading Item
headingBtn.addEventListener('click', () => {
  headingItem.classList.remove('hidden');
  headingInput.value = '';
});
//make invisible Heading Item
removeHeading.addEventListener('click', () => {
  headingItem.classList.add('hidden');
});

//make visible Image Item
imageBtn.addEventListener('click', () => {
  imageItem.classList.remove('hidden');
});
//make invisible Image Item
removeImage.addEventListener('click', () => {
  imageItem.classList.add('hidden');
});

//make visible Discription Item
descriptionBtn.addEventListener('click', () => {
  descriptionItem.classList.remove('hidden');
});
//make invisible Description Item
removeDescription.addEventListener('click', () => {
  descriptionItem.classList.add('hidden');
});

//handle heading input preview
headingInput.addEventListener('keyup', () => {
  previewHeading.innerHTML = headingInput.value;
});

//handle Alignment of heading
const leftAlign = () => {
  previewHeading.classList.remove('text-center');
  previewHeading.classList.remove('text-right');
  previewHeading.classList.add('text-left');
  textInfo.align = 'left';
};
const middleAlign = () => {
  previewHeading.classList.remove('text-left');
  previewHeading.classList.remove('text-right');
  previewHeading.classList.add('text-center');
  textInfo.align = 'center';
};
const rightAlign = () => {
  previewHeading.classList.remove('text-center');
  previewHeading.classList.remove('text-left');
  previewHeading.classList.add('text-right');
  textInfo.align = 'right';
};

//handle color of heading
const addBlueColor = () => {
  previewHeading.classList.remove('text-green-500');
  previewHeading.classList.remove('text-black-500');
  previewHeading.classList.add('text-blue-500');
  textInfo.color = 'blue';
};
const addBlackColor = () => {
  previewHeading.classList.remove('text-blue-500');
  previewHeading.classList.remove('text-green-500');
  previewHeading.classList.add('text-black-500');
  textInfo.color = 'black';
};
const addGreenColor = () => {
  previewHeading.classList.remove('text-blue-500');
  previewHeading.classList.remove('text-black-500');
  previewHeading.classList.add('text-green-500');
  textInfo.color = 'green';
};

//handle image
const chooseFile = document.getElementById('image-file');
const imgPreview = document.getElementById('imageContent');

function getImgData() {
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener('load', function () {
      imgPreview.style.display = 'block';
      imgPreview.innerHTML =
        '<img src="' + this.result + '" id="previewImageItem" />';
    });
  }
}
chooseFile.addEventListener('change', function () {
  getImgData();
});

//handle heading input preview
handleDescription.addEventListener('keyup', () => {
  previewDescription.innerHTML = handleDescription.value;
});

//handle download poster

const downloadPoster = () => {
  //get height and width of preview div
  const previewDivHeight =
    document.getElementById('convertToImage').offsetHeight;
  const previewDivWidth = document.getElementById('convertToImage').offsetWidth;

  const image = document.getElementById('previewImageItem');
  //create canvas
  let canvas = document.getElementById('canvas');
  canvas.width = previewDivWidth;
  canvas.height = document.documentElement.scrollHeight;

  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(20, 20, previewDivWidth, previewDivHeight - 20);

  //handle text
  if (headingInput.value) {
    ctx.font = '48px arial';
    ctx.fillStyle = textInfo.color;
    ctx.textAlign = textInfo.align;
    if (textInfo.align == 'right') {
      ctx.fillText(headingInput.value, previewDivWidth - 50, 100);
    }
    if (textInfo.align == 'center') {
      ctx.fillText(headingInput.value, previewDivWidth / 2, 100);
    }
    if (textInfo.align == 'left') {
      ctx.fillText(headingInput.value, 40, 100);
    }
  }
  //handle image
  if (image) {
    let imageHeightPosition = 40;
    if (headingInput.value) {
      imageHeightPosition = 130;
    }
    const imageHeight = image.clientHeight;
    const imageWidth = image.clientWidth;
    ctx.drawImage(image, 40, imageHeightPosition, imageWidth - 60, imageHeight);
  }

  //handle description
  if (handleDescription.value) {
    let descriptionHeightPosition = 40;
    if (headingInput.value) {
      descriptionHeightPosition = 120 + descriptionHeightPosition;
    }
    if (image) {
      descriptionHeightPosition =
        20 + image.clientHeight + descriptionHeightPosition;
    }

    printDescription(
      ctx,
      handleDescription.value,
      40,
      descriptionHeightPosition,
      22,
      previewDivWidth - 85
    );
    // handle multiline description
    function printDescription(context, text, x, y, lineHeight, fitWidth) {
      fitWidth = fitWidth || 0;
      ctx.font = '18px arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'left';
      if (fitWidth <= 0) {
        context.fillText(text, x, y);
        return;
      }

      for (let idx = 1; idx <= text.length; idx++) {
        let str = text.substr(0, idx);
        if (context.measureText(str).width > fitWidth) {
          context.fillText(text.substr(0, idx - 1), x, y);
          printDescription(
            context,
            text.substr(idx - 1),
            x,
            y + lineHeight,
            lineHeight,
            fitWidth
          );
          return;
        }
      }
      context.fillText(text, x, y);
    }
  }

  //download link
  var link = document.createElement('a');
  document.body.appendChild(link);
  link.download = 'poster.png';
  link.href = canvas.toDataURL();
  link.target = '_blank';
  link.click();
};
