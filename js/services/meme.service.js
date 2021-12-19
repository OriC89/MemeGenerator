'use strict'

const MEME_KEY = 'MyMemesDB'

// CANVAS VARIABLES 
var gSort = []
var gFillterImg = []
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
            y: 60,
            isDraggable: false,
            isEditable: false
        }
    ]
}

// REUTRN MEME
function getMeme() {
    return gMeme
}

// ADDS NEW LINE OF TXT
function addLine() {
    // if (gMeme.lines[gMeme.selectedLineIdx].txt === '') return
    if (gMeme.lines.length > 2) return
    gMeme.lines.push({
        txt: '',
        size: 50,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        x: gCanvas.width / 2,
        y: calcY(),
        isDraggable: false,
        isEditable: false
    })
    clearText()
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

// CALCULATE Y POS
function calcY() {
    var y = 0
    if (gMeme.lines.length === 1) y = 70
    if (gMeme.lines.length - 1) y = 230
    if (gMeme.lines.length - 2) y = 430
    return y
}

// DELETE LINE
function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx > gMeme.lines.length) gMeme.selectedLineIdx--
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

// TOGGLE BETWEEN LINES
function setLineIndex() {
    var lineIndex = gMeme.selectedLineIdx
    if (lineIndex === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

// SAVE TO STORAGE
function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}

// SHARE MEME
function shareMeme() {
    const imgDataUrl = gCanvas.toDataURL();
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
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

// GET LINE MEASURES BY ID
function getLineSizeById(line) {
    let metrics = gCtx.measureText(line.txt)
    let width = metrics.width
    let height = line.size
    return { width, height }
}

//GET LINE BY ID
function getLineById(idx) {
    return gMeme.lines[idx]
}

// MOVE LINE EV
function moveLine(dx, dy) {
    let line = gMeme.lines[gMeme.selectedLineIdx]
    line.x += dx
    line.y += dy
}

// SEARCH BY KEYWORDS
function searchByKeyWords(elKey) {
    var regex = RegExp(elKey)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    gFillterImg = gImgs.filter(img => {
        for (let i = 0; i < img.keywords.length; i++) {
            var word = img.keywords[i]
            if (regex.test(word)) return true
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        }
    })
}

// SORT KEYWORDS
function sortKeyWords() {
    var mapObjectKeys = {}
    gImgs.map(img => {
        for (let i = 0; i < img.keywords.length; i++) {
            var word = img.keywords[i]
            if (mapObjectKeys[word]) mapObjectKeys[word]++
            else mapObjectKeys[word] = 1
        }
    })
    gSort = []
    for (let key in mapObjectKeys) {
        if (mapObjectKeys[key] > 1) gSort.push([key, mapObjectKeys[key]])
    }
    gSort.sort((a, b) => b[1] - a[1])
}

// CHANGES THE TXT 
const clearText = () => document.querySelector('.txt-line').value = 'Text Here'
const setLineTxt = (elTxt) => gMeme.lines[gMeme.selectedLineIdx].txt = elTxt

// CHANGE TXT SIZE
const setDecreasedTextSize = () => gMeme.lines[gMeme.selectedLineIdx].size -= 5
const setIncreasedTextSize = () => gMeme.lines[gMeme.selectedLineIdx].size += 5

// CHANGE TXT COLOR 
const setColor = (color) => gMeme.lines[gMeme.selectedLineIdx].color = color
const setStrokeColor = (color) => gMeme.lines[gMeme.selectedLineIdx].stroke = color

// MOVE TXT LINE
const setTxtUp = () => gMeme.lines[gMeme.selectedLineIdx].y -= 5
const setTxtDown = () => gMeme.lines[gMeme.selectedLineIdx].y += 5

// TXT ALIGNMENT 
const setAlignLeft = () => gMeme.lines[gMeme.selectedLineIdx].align = 'right'
const setAlignRight = () => gMeme.lines[gMeme.selectedLineIdx].align = 'left'
const setAlignCenter = () => gMeme.lines[gMeme.selectedLineIdx].align = 'center'

// CHANGE TXT FONT
const setFont = (font) => gMeme.lines[gMeme.selectedLineIdx].font = font

// SORTERS & FILTERS
const getSortedImg = () => gFillterImg;
const getCurrImg = () => gCurrImg

