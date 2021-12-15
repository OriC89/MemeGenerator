'use strict'


// RENDERS THE GALLARY
function renderGallery() {
    var elImgs = document.querySelector('.imges-gallary')//getting the right div
    const imgs = getImgs()
    imgs.map(img => {
        elImgs.innerHTML += `<img href="#my-canvas" class="img" onclick="onImgSelect(${img.id})" src="${img.url}">`
    })
}

function onImgSelect(imdId) {
    imgSelect(imdId)
    renderMeme()
}