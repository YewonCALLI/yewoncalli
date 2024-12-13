let points;
let checkbox;
let pnts;
let textfont;
let font1;
let font2;
let font3;
let letters = "";
let button, txt;
let x;

let leap = 1;

let shouldClearCanvas = false;

const sectionCanvas = document.getElementById("canvas");
const p5Element = document.createElement("div");
p5Element.classList.add("p5Element");

sectionCanvas.appendChild(p5Element);

function preload() {
  font1 = loadFont("./BLKCHCRY.TTF");
  font2 = loadFont("./LucidaBrightDemiItalic.ttf");
  font3 = loadFont("./KoreanFrenchTypewriter.ttf");
  img = loadImage("./paper1.jpg");
}

function setup() {
  const canvas = createCanvas(
    sectionCanvas.offsetWidth,
    sectionCanvas.offsetHeight
  );

  canvas.parent(sectionCanvas);

  background(0);
  image(img, 0, 0, width, height);

  // Create Containers
  inputContainer = document.createElement("div");
  inputContainer.classList.add("p5-input-container");

  sliderContainer = document.createElement("div");
  sliderContainer.classList.add("p5-slider-container");

  // Create a new input
  input = document.createElement("input");
  input.type = "text";
  input.value = "TruthFul";
  input.placeholder = "Type here : Max 10 letters";
  input.classList.add("p5-input");
  textfont = font2;

  // Create a new button
  button = document.createElement("button");
  button.innerHTML =
    //x svg
    `<svg xmlns="http://www.w3.org/2000/svg"
    fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.854 4.146a.5.5 0 0 1 0 .708L8.707 8l-3.853 3.854a.5.5 0 0 1-.708-.708L7.293 8 4.146 4.854a.5.5 0 0 1 .708-.708L8 7.293l3.146-3.147a.5.5 0 0 1 .708.708L8.707 8l3.147 3.146a.5.5 0 0 1-.708.708L8 8.707 4.854 11.854a.5.5 0 0 1-.708-.708L7.293 8 4.146 4.854a.5.5 0 0 1 .708-.708z"/>
</svg>`;
  button.classList.add("p5-button");
  button.addEventListener("click", () => {
    input.value = "";
    shouldClearCanvas = true;
  });

  inputContainer.append(input, button);

  // Create a new checkbox
  // checkbox = document.createElement("input");
  // checkbox.type = "checkbox";
  // checkbox.addEventListener("change", fontchange);
  // checkbox.classList.add("p5-checkbox");

  // Create a new slider
  sliderName = document.createElement("span");
  sliderName.innerHTML = "water";
  sliderName.classList.add("p5-sliderName");

  slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 4;
  slider.value = 2;
  slider.step = 0.1;
  slider.classList.add("p5-slider");

  sliderValue = document.createElement("span");
  sliderValue.classList.add("p5-sliderValue");

  sliderContainer.append(sliderName, slider, sliderValue);

  p5Element.append(inputContainer, sliderContainer);


  // noLoop(); // Stop continuous drawing
}

// 캔버스를 초기화하는 함수
function clearCanvas() {
  background(0);
  image(img, 0, 0, width, height); // 배경 초기화
}

function draw() {
  sliderValue.innerHTML = slider.value;

  //input 포커스되면 캔버스 초기화
  if (input.value === "yewon") {
    input.addEventListener("focus", () => {
      input.value = "";
    });
  }

  if (input.value.length > 0) {
    shouldClearCanvas = false; // 텍스트가 있는 경우 초기화하지 않음
  } else {
    shouldClearCanvas = true; // 텍스트가 비워졌을 때만 초기화 플래그 설정
    clearCanvas(); // 캔버스를 초기화
  }

  if (input.value.length > 0) {
    button.style.opacity = "1";
  } else {
    button.style.opacity = "0";
  }

  leap = slider.value;
  txt = input.value;

  txt = txt.substring(0, 10);

  const sampleFactor = map(txt.length, 1, 10, 0.3, 0.15);  // 텍스트 길이에 따라 샘플링 비율 조정

  for (let ti = 0; ti < txt.length; ti++) {
    points = textfont.textToPoints(txt, width / 10, height / 2, width / 10, {
      sampleFactor: sampleFactor
    });

    // 최대 포인트 수 제한
    const maxPoints = 1000;
    const pointsLength = Math.min(points.length, maxPoints);

    for (var i = 0; i < pointsLength; i++) {
      ellipse(points[i].x, points[i].y, 0.1, 0.1);
      
      // random 함수 호출 최소화
      const randX = random(-leap, leap);
      const randY = random(-leap, leap);
      
      points[i].x = points[i].x + 1.5 * randX;
      points[i].y = points[i].y + 1.5 * randY;
      
      stroke(100, 200 - 0.4 * i, 200 - 0.4 * i, leap * 2.5);
      fill(230 - 0.7 * i, 0, 0.2 * i, leap * 2.5);
      strokeWeight(leap);
      point(points[i].x, points[i].y);
    }
  }
}

function fontchange() {
  textfont = checkbox.checked() ? font2 : font1;
  redraw();
}

function windowResized() {
  resizeCanvas(sectionCanvas.offsetWidth, sectionCanvas.offsetHeight);
  clearCanvas();
}
