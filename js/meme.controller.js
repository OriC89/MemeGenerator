'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCanvas
var gCtx

// INIT 
function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    createImgs()
    renderGallery()
    sortKeyWords()
    addEventListeners()
    renderMeme()
}

// RENDER THE MEME TO DOM
function renderMeme() {
    const meme = getMeme()
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

// CLEAR CANVAS
function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

// DRAW THE TXT TO CANVAS
function writeText(txt, x, y, index) {
    const meme = getMeme()
    gCtx.lineWidth = 5
    gCtx.fillStyle = `${meme.lines[index].color}`
    gCtx.strokeStyle = `${meme.lines[index].stroke}`
    gCtx.font = `${meme.lines[index].size}px ${meme.lines[index].font}`
    gCtx.textAlign = `${meme.lines[index].align}`
    gCtx.strokeText(txt, x, y, gCanvas.width)
    gCtx.fillText(txt, x, y, gCanvas.width)
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
function onMoveTxtUp() {
    setTxtUp()
    renderMeme()
}

// MOVE TXT DOWN
function onMoveTxtDown() {
    setTxtDown()
    renderMeme()
}

// ADDS A LINE OF TXT
function onAddLine() {
    addLine()
    resetLineTxt()
    renderMeme()
}

// DELETE LINE
function onDeleteLine() {
    deleteLine()
    resetLineTxt()
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
    setTimeout(drawRectLine, 50, gMeme.selectedLineIdx)
}

// DOWNLOAD IMG FROM CANVAS
function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-img.png';
}

// GET EVENT POS
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

// ADD LISTERNERS
function addEventListeners() {
    gCanvas.addEventListener('mousedown', onClickDown);
    gCanvas.addEventListener('mousemove', onMoveText);
    gCanvas.addEventListener('mouseup', onMoveUp);
    gCanvas.addEventListener('touchstart', onClickDown);
    gCanvas.addEventListener('touchmove', onMoveText);
    gCanvas.addEventListener('touchend', onMoveUp);
}

// ADD RECTANGLE
function drawRectLine(idx) {
    let line = getLineById(idx)
    let lineMeasure = getLineSizeById(line)
    let lineXStart = line.x - lineMeasure.width / 2 - 10
    let lineYStart = line.y - line.size - 5
    let lineXEnd = lineMeasure.width + 20
    let lineYEnd = line.size + 20
    if (line.align === 'left') {
        lineXStart += lineMeasure.width / 2
        lineXEnd += lineMeasure.width / 2
    }
    if (line.align === 'right') {
        lineXStart -= lineMeasure.width / 2
        lineXEnd -= lineMeasure.width / 2
    }
    gCtx.beginPath()
    gCtx.rect(lineXStart, lineYStart, lineXEnd, lineYEnd)
    gCtx.strokeStyle = '#000000'
    gCtx.stroke()
    gCtx.closePath();
}

// ON MOVE UP EV
function onMoveUp(ev) {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return
    gMeme.lines[gMeme.selectedLineIdx].isDraggable = false
    setTimeout(drawRectLine, 50, gMeme.selectedLineIdx)
}

// ON MOVE EV
function onMoveText(ev) {
    if (gMeme.lines[gMeme.selectedLineIdx] && gMeme.lines[gMeme.selectedLineIdx].isDraggable) {
        let line = gMeme.lines[gMeme.selectedLineIdx]
        let pos = getEvPos(ev)
        let dx = pos.x - line.x
        let dy = pos.y - line.y + gMeme.lines[gMeme.selectedLineIdx].size / 2
        renderMeme()
        moveLine(dx, dy)
    }
}

// ON MOVE DOWN EV
function onClickDown(ev) {
    let pos = getEvPos(ev);
    let lineClickedIdx = getLineIdxByPos(pos);
    if (lineClickedIdx === -1) {
        gMeme.lines.forEach(line => {
            line.isEditable = false
        })
        document.querySelector('.txt-line').value = ''
        gMeme.selectedLineIdx = gMeme.lines.length;
        renderMeme()
        return
    }
    gMeme.selectedLineIdx = lineClickedIdx
    clearCanvas()
    renderMeme()
    setTimeout(drawRectLine, 20, gMeme.selectedLineIdx)
    gMeme.lines[lineClickedIdx].isDraggable = true;
    gMeme.lines[lineClickedIdx].isEditable = true;
}

// GET LINE INDEX WITH POS
function getLineIdxByPos(pos) {
    let x = pos.x;
    let y = pos.y;
    let lineIdx = gMeme.lines.findIndex((line, idx) => {
        let lineSize = getLineSizeById(line)
        let xPosStart = line.x - lineSize.width / 2
        let xPosEnd = line.x + lineSize.width / 2
        let yPosStart = line.y - line.size;
        let yPosEnd = line.y;

        if (line.align === 'left') {
            xPosStart += lineSize.width / 2
            xPosEnd += lineSize.width / 2
        }

        if (line.align === 'right') {
            xPosStart -= lineSize.width / 2
            xPosEnd -= lineSize.width / 2
        }
        return ((x >= xPosStart && x <= xPosEnd) && (y >= yPosStart && y <= yPosEnd))
    })
    return (lineIdx)
}

// CLEAR CANVAS
function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

// SERACH
function onSearch(elKey) {
    searchByKeyWords(elKey + '')
    renderSearch()
}

// RENDER SEARCH
function renderSearch() {
    var filterdImgs = getSortedImg()
    var elImgs = document.querySelector('.imges-gallary')
    elImgs.innerHTML = ''
    filterdImgs.map(img => {
        elImgs.innerHTML += `<img href="#my-canvas" class="img" onclick="onImgSelect(${img.id})" src="${img.url}">`
    })
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