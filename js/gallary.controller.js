'use strict'


// RENDERS THE GALLARY
function renderGallery() {
    var elImgs = document.querySelector('.imges-gallary')//getting the right div
    const imgs = getImgs()
    imgs.map(img => {
        elImgs.innerHTML += `<img href="#my-canvas" class="img" onclick="onImgSelect(${img.id})" src="${img.url}">`
    })
}

// SELECTING IMG TO EDITOR
function onImgSelect(imdId) {
    imgSelect(imdId)
    document.querySelector('.gallary').classList.toggle('active')
    document.querySelector('.meme-generator').classList.toggle('active')
    document.querySelector('.about').classList.toggle('active')
    renderMeme()
}

function onToggleGallary() {
    clearText()
    document.querySelector('.gallary').classList.toggle('active')
    document.querySelector('.meme-generator').classList.toggle('active')
    document.querySelector('.about').classList.toggle('active')
}