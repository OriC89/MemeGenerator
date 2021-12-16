'use strict'

var gImgNextId = 0
var gImgs = []

// RETURNS gImgs
function getImgs() {
    return gImgs
}

// CREATES IMGS
function createImgs() {
    gImgs = [
        createImg('1', 'political', 'Trump', 'celebrity'),
        createImg('2', 'dogs', 'animal'),
        createImg('3', 'baby', 'dog', 'animals'),
        createImg('4', 'cat', 'animals'),
        createImg('5', 'baby', 'victory', 'happy'),
        createImg('6', 'celebrity', 'history'),
        createImg('7', 'baby', 'happy'),
        createImg('8', 'happy'),
        createImg('9', 'baby', 'happy'),
        createImg('10', 'political', 'Obama', 'happy'),
        createImg('11', 'sports', 'angry', 'celebrity'),
        createImg('12', 'celebrity', 'Israel'),
        createImg('13', 'celebrity', 'happy', 'movie'),
        createImg('14', 'movies', 'celebrity'),
        createImg('15', 'movie', 'celebrity'),
        createImg('16', 'movie', 'celebrity'),
        createImg('17', 'political', 'celebrity', 'Putin'),
        createImg('18', 'movie', 'toys')
    ]
}

// CREATE IMG
function createImg(imgName, ...keys) {
    return {
        id: gImgNextId++,
        url: `img/imgs/${imgName}.jpg`,
        keywords: keys
    }
}

// SELECTING IMG TO EDITOR
function imgSelect(imgId) {
    const meme = getMeme()
    meme.selectedImgId = imgId
}

// RETURN IMG BY ID
function getImgById(imgId) {
    const imgs = getImgs()
    const img = imgs.find(img => {
        return imgId === img.id
    })
    return img
}