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
            color: 'black',
            stroke: 'black'
        }
    ]
}

// RETURN IMG BY ID
function getImgById(imgId) {
    const imgs = getImgs()
    const img = imgs.find(img => {
        return imgId === img.id
    })
    return img
}

// REUTRN MEME
function getMeme() {
    return gMeme
}

// RETURN CANVAS 
function getCanvas() {
    return gCanvas
}

// CHANGES THE TXT 
const setLineTxt = (elTxt) => gMeme.lines[gMeme.selectedLineIdx].txt = elTxt
const setDecreasedTextSize = () => gMeme.lines[gMeme.selectedLineIdx].size -= 5
const setIncreasedTextSize = () => gMeme.lines[gMeme.selectedLineIdx].size += 5
const setColor = (color) => gMeme.lines[gMeme.selectedLineIdx].color = color


function setAlignLeft() {
}

function setAlignCenter() {
}

function setAlignRight() {
}


function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}
