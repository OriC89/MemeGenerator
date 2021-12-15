'use strict'

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    createImgs()
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    getImg(meme)
}

function getImg(meme) {
    const txt = meme.lines[meme.selectedLineIdx].txt
    const currImg = getImgById(meme.selectedImgId)
    var img = new Image()
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        writeText(txt, 50, 50)
    }
}

function writeText(memeTxt, x, y) {
    const meme = getMeme()
    gCtx.fillStyle = `${meme.lines[meme.selectedLineIdx].color}`
    gCtx.strokeStyle = `${meme.lines[meme.selectedLineIdx].stroke}`
    gCtx.stroke()
    gCtx.font = `${meme.lines[meme.selectedLineIdx].size}px Impact`
    // gCtx.font = meme.lines[]
    gCtx.fillText(memeTxt, x, y)
}

function onSetLineTxt(elTxt) {
    setLineTxt(elTxt)
    renderMeme()
}

function onDecreaseTextSize() {
    setDecreasedTextSize()
    renderMeme()
}

function onIncreaseTextSize() {
    setIncreasedTextSize()
    renderMeme()
}

function onAlignLeft() {
    setAlignLeft()
    renderMeme()
}

function onAlignCenter() {
    setAlignCenter()
    renderMeme()
}

function onAlignRight() {
    setAlignRight()
    renderMeme()
}

function onGetColor(color) {
    setColor(color)
    renderMeme()
}