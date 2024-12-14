let points;
let textfont;
let font1;
let font2;
let font3;
let img;
let input;
let slider;
let button;

let leap = 2;
let animationFrames = 0;
let maxFrames = 20; // 각 애니메이션 세트의 프레임 수
let isAnimating = true;

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
  
  textfont = font1;
  setupUI();
  
  clearCanvas();
  
  // 슬라이더 변경 이벤트 리스너
  slider.addEventListener("input", () => {
    leap = parseFloat(slider.value);
    startNewAnimation();
  });
  
  // 텍스트 입력 이벤트 리스너
  input.addEventListener("input", () => {
    resetAnimation();
  });

  slider.value=leap;
}

function startNewAnimation() {
  animationFrames = 0;
  isAnimating = true;
}

function resetAnimation() {
  animationFrames = 0;
  isAnimating = true;
  clearCanvas();
}

function setupUI() {
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("p5-input-container");

  const sliderContainer = document.createElement("div");
  sliderContainer.classList.add("p5-slider-container");

  input = document.createElement("input");
  input.type = "text";
  input.value = "Stay truthful";
  input.placeholder = "Type here : Max 15 letters";
  input.classList.add("p5-input");

  button = document.createElement("button");
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.854 4.146a.5.5 0 0 1 0 .708L8.707 8l-3.853 3.854a.5.5 0 0 1-.708-.708L7.293 8 4.146 4.854a.5.5 0 0 1 .708-.708L8 7.293l3.146-3.147a.5.5 0 0 1 .708.708L8.707 8l3.147 3.146a.5.5 0 0 1-.708.708L8 8.707 4.854 11.854a.5.5 0 0 1-.708-.708L7.293 8 4.146 4.854a.5.5 0 0 1 .708-.708z"/>
  </svg>`;
  button.classList.add("p5-button");
  button.addEventListener("click", () => {
    input.value = "";
    resetAnimation();
  });

  const sliderName = document.createElement("span");
  sliderName.innerHTML = "water";
  sliderName.classList.add("p5-sliderName");

  slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 4;
  slider.value = leap;
  slider.step = 0.1;
  slider.classList.add("p5-slider");

  const sliderValue = document.createElement("span");
  sliderValue.classList.add("p5-sliderValue");
  
  slider.addEventListener("input", () => {
    sliderValue.innerHTML = slider.value;
  });

  inputContainer.append(input, button);
  sliderContainer.append(sliderName, slider, sliderValue);
  p5Element.append(inputContainer, sliderContainer);
}

function clearCanvas() {
  background(0);
  image(img, 0, 0, width, height);
}

function draw() {
  if (!isAnimating) return;
  
  const txt = input.value.substring(0, 19);
  
  if (txt.length > 0) {
    button.style.opacity = "1";
    const sampleFactor = map(txt.length, 1, 20, 0.4, 0.01);
    
    points = textfont.textToPoints(txt, width / 10, height / 2+30, 200, {
      sampleFactor: sampleFactor
    });
    
    const maxPoints = 1000;
    const pointsLength = Math.min(points.length, maxPoints);

    for (let i = 0; i < pointsLength; i++) {
    fill(0);
    ellipse(points[i].x, points[i].y, 0.1, 0.1);

    const randX = random(-leap, leap);
    const randY = random(-leap, leap);
    
    const x = points[i].x + 1.5 * randX;
    const y = points[i].y + 1.5 * randY;

    stroke(0.1*i, 0.2 * i, 255 - 0.2 * i, leap * 5);
    fill(0.1*i, 0.2 * i, 255 - 0.2 * i, leap * 5);
    strokeWeight(leap);
    point(x, y);
  }
  
    

    
  } else {
    button.style.opacity = "0";
  }
  
  animationFrames++;
  if (animationFrames >= maxFrames) {
    isAnimating = false;
  }
}

function windowResized() {
  resizeCanvas(sectionCanvas.offsetWidth, sectionCanvas.offsetHeight);
  resetAnimation();
}