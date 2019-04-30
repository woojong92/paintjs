const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c"

//캔버스의 픽섹사이즈 pixel modifier
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); // path
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    //console.log(x, y);
}

function onMouseDown(event){
    painting = true;

    console.log(event);
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log(color);
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, 700, 700);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

function handleRangeChange(event){
    console.log(event);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeclick() {
    if(filling === true ) {
        filling = false;
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText = "Paint"
        
        
    }
}

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeclick);
}