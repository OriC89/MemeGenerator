'use strict'


// RENDERS THE GALLARY
function renderGallery() {
    var elImgs = document.querySelector('.imges-gallary')//getting the right div
    const imgs = getImgs()
    imgs.map(img => {
        elImgs.innerHTML += `<img href="#my-canvas" class="img" onclick="onImgSelect(${img.id})" src="${img.url}">`
    })
}


function resetLineTxt() {
    const elInput = document.querySelector('.txt-line')
    elInput.value = `Your are in line ${gMeme.selectedLineIdx}`
}

// SELECTING IMG TO EDITOR
function onImgSelect(imdId) {
    imgSelect(imdId)
    resetLineTxt()
    document.querySelector('.gallary').classList.toggle('active')
    document.querySelector('.meme-generator').classList.toggle('active')
    document.querySelector('.about').classList.toggle('active')
    renderMeme()
}

function onToggleGallary() {
    document.querySelector('.gallary').classList.toggle('active')
    document.querySelector('.meme-generator').classList.toggle('active')
    document.querySelector('.about').classList.toggle('active')
    const eLink = document.querySelector('.gallary-link')
    eLink.innerText = (eLink.innerText === "Gallary") ? 'Editor' : 'Gallary'
    clearText()
}   