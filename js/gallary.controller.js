'use strict'


// RENDERS THE GALLARY
function renderGallery() {
    var elImgs = document.querySelector('.imges-gallary')//getting the right div
    const imgs = getImgs()
    imgs.map(img => {
        elImgs.innerHTML += `<img href="#my-canvas" class="img" onclick="onImgSelect(${img.id})" src="${img.url}">`
    })
}

// RESET LINE TXT
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
    toggleSearchDisplay()
    renderMeme()
}

// TOGGLE EDITOR GALLARY BTN
function onToggleGallary() {
    document.querySelector('.gallary').classList.toggle('active')
    document.querySelector('.meme-generator').classList.toggle('active')
    document.querySelector('.about').classList.toggle('active')
    toggleSearchDisplay()
    clearText()
}

// TOGGLE SEARCH BAR
function toggleSearchDisplay() {
    const eLink = document.querySelector('.gallary-link')
    eLink.innerText = (eLink.innerText === "Gallary") ? 'Editor' : 'Gallary'
    const elSearch = document.querySelector('.search')
    elSearch.style.display = (eLink.innerText === 'Gallary') ? 'flex' : 'none'
}

