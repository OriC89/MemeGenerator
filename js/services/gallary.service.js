'use strict'

var gImgNextId = 0
var gImgs = []


function getImgs() {
    return gImgs
}

function createImgs() {
    gImgs = [
        createImg('1', 'political', 'trump'),
        createImg('2', 'political', 'trump'),
        createImg('3', 'political', 'trump'),
        createImg('4', 'political', 'trump'),
        createImg('5', 'political', 'trump'),
        // createImg('6', 'political', 'trump'),
        // createImg('7', 'political', 'trump'),
        // createImg('8', 'political', 'trump'),
        // createImg('9', 'political', 'trump'),
        // createImg('10', 'political', 'trump'),
        // createImg('11', 'political', 'trump'),
        // createImg('12', 'political', 'trump'),
        // createImg('13', 'political', 'trump'),
        // createImg('14', 'political', 'trump'),
        // createImg('15', 'political', 'trump'),
        // createImg('16', 'political', 'trump'),
        // createImg('17', 'political', 'trump'),
        // createImg('18', 'political', 'trump')
    ]
}

function createImg(imgName, ...keys) {
    return {
        id: gImgNextId++,
        url: `img/imgs/${imgName}.jpg`,
        keywords: keys
    }
}

function imgSelect(imgId) {
    const meme = getMeme()
    meme.selectedImgId = imgId
}
