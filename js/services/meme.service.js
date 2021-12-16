'use strict'

const MEME_KEY = 'MyMemesDB'

// CANVAS VARIABLES 
var gCanvas
var gCtx
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 50,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            x: 240,
            y: 70
        }
    ]
}

// REUTRN MEME
function getMeme() {
    return gMeme
}

// RETURN CANVAS 
function getCanvas() {
    return gCanvas
}

// ADDS NEW LINE OF TXT
function addLine() {
    if (gMeme.lines[0].txt === '') return
    if (gMeme.lines.length > 2) return
    gMeme.lines.push({
        txt: '',
        size: 50,
        align: gMeme.lines[gMeme.selectedLineIdx].align,
        color: gMeme.lines[gMeme.selectedLineIdx].color,
        stroke: gMeme.lines[gMeme.selectedLineIdx].stroke,
        font: gMeme.lines[gMeme.selectedLineIdx].font,
        x: gMeme.lines[gMeme.selectedLineIdx].x,
        y: gMeme.lines[gMeme.selectedLineIdx].y + 160
    })
    gMeme.selectedLineIdx++
}

// DELETE LINE
function DeleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

// TOGGLE BETWEEN LINES
function setLineIndex() {
    var lineIndex = gMeme.selectedLineIdx
    if (lineIndex === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

// CHANGES FONT
function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

// SAVE TO STORAGE
function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}

// DOWNLOAD CANVAS IMG
function DownloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.png';
}

// ALIGN TXT LEFT
function setAlignLeft() {
    gCtx.textAlign = 'right'
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

// ALIGN TXT RIGHT
function setAlignRight() {
    gCtx.textAlign = 'left'
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

// ALIGN TXT CENTER
function setAlignCenter() {
    gCtx.textAlign = 'center'
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

// UPLOAD TO CANVAS
function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL();
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.testytest').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;"> 
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

// CHANGES THE TXT 
const setLineTxt = (elTxt) => gMeme.lines[gMeme.selectedLineIdx].txt = elTxt
const setDecreasedTextSize = () => gMeme.lines[gMeme.selectedLineIdx].size -= 5
const setIncreasedTextSize = () => gMeme.lines[gMeme.selectedLineIdx].size += 5
const setColor = (color) => gMeme.lines[gMeme.selectedLineIdx].color = color
const setStrokeColor = (color) => gMeme.lines[gMeme.selectedLineIdx].stroke = color
const setTxtUp = () => gMeme.lines[gMeme.selectedLineIdx].y -= 5
const setTxtDown = () => gMeme.lines[gMeme.selectedLineIdx].y += 5

