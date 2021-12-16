'use strict'

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    createImgs()
    renderGallery()
    renderMeme()
}

// RENDER THE MEME TO DOM
function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgId)
    getImg(meme)
}

// SET IMG TO CANVAS
function getImg(meme) {
    // const txt = meme.lines[meme.selectedLineIdx].txt
    const currImg = getImgById(meme.selectedImgId)
    var img = new Image()
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.map((line, lineIdx) => {
            return writeText(line.txt, line.x, line.y, lineIdx)
        })
    }
}

// DRAW THE TXT TO CANVAS
function writeText(txt, x, y, index) {
    const meme = getMeme()
    gCtx.lineWidth = 3
    gCtx.fillStyle = `${meme.lines[index].color}`
    gCtx.strokeStyle = `${meme.lines[index].stroke}`
    gCtx.font = `${meme.lines[index].size}px ${meme.lines[index].font}`
    gCtx.strokeText(txt, x, y, gCanvas.width)
    gCtx.fillText(txt, x, y, gCanvas.width)
    gCtx.textAlign = `${gMeme.lines[index].align}`
    gCtx.stroke()
}

// CHANGES THE TEXT FROM INPUT
function onSetLineTxt(elTxt) {
    setLineTxt(elTxt)
    renderMeme()
}

// DECREASE TXT SIZE
function onDecreaseTextSize() {
    setDecreasedTextSize()
    renderMeme()
}

// INCREASE TXT SIZE
function onIncreaseTextSize() {
    setIncreasedTextSize()
    renderMeme()
}

// CHANGE TEXT COLOR
function onGetColor(color) {
    setColor(color)
    renderMeme()
}

// CHANGE STROKE COLOR
function onStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

// // ALIGN TXT LEFT
function onAlignLeft() {
    setAlignLeft()
    renderMeme()
}

// ALIGN TXT CENTER
function onAlignCenter() {
    setAlignCenter()
    renderMeme()
}

// ALIGN TXT RIGHT
function onAlignRight() {
    setAlignRight()
    renderMeme()
}

// MOVE TXT UP
function onMoveUp() {
    setTxtUp()
    renderMeme()
}

// MOVE TXT DOWN
function onMoveDown() {
    setTxtDown()
    renderMeme()
}

// ADDS A LINE OF TXT
function onAddLine() {
    addLine()
    renderMeme()
}

// DELETE LINE
function onDeleteLine() {
    DeleteLine()
    renderMeme()
}

// CHANGE FONT
function onSetFont(font) {
    setFont(font)
    renderMeme()
}

// TOGGLE LINES 
function onToggleLine() {
    setLineIndex()
    renderMeme()
}

// UPLOAD IMAGES FROM LOCAL USER
function onImgInput(ev) {
    loadImgFromLocal(ev, renderUploadedImgToCanvas)
}

function loadImgFromLocal(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = (event) => {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderUploadedImgToCanvas(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

