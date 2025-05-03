let currentActive = false;

function toggleCurrent() {
    currentActive = !currentActive;
    const wires = Array.from(document.querySelectorAll('.wire'));
    const bulbs = document.querySelectorAll('.bulb');
    const switches = document.querySelectorAll('.switch');
  
    const allSwitchesOn = Array.from(switches).every(sw => !sw.classList.contains('off'));
  
    if (currentActive && allSwitchesOn) {
      bulbs.forEach(bulb => bulb.classList.remove('off'));
  
      const sortedWires = wires.sort((a, b) => {
        const aId = parseInt(a.id.replace('wire-', ''));
        const bId = parseInt(b.id.replace('wire-', ''));
        return aId - bId;
      });
  
      // 순차적으로 깜빡이게
      sortedWires.forEach((wire, index) => {
        setTimeout(() => {
          wire.classList.add('active');
          setTimeout(() => {
            wire.classList.remove('active');
          }, 500); // 애니메이션 길이와 일치해야 함
        }, index * 200); // 흐름 속도 조절
      });
  
    } else {
      wires.forEach(wire => wire.classList.remove('active'));
      bulbs.forEach(bulb => bulb.classList.add('off'));
    }
  }
  

function toggleSwitch(element) {
    element.classList.toggle('off');
    
    // 스위치 상태 변경 후 전류 상태 업데이트
    if (currentActive) {
    toggleCurrent();
    toggleCurrent();
    }
}

function resetCircuit() {
    const wires = document.querySelectorAll('.wire');
    const bulbs = document.querySelectorAll('.bulb');
    const switches = document.querySelectorAll('.switch');
    
    wires.forEach(wire => wire.classList.remove('active'));
    bulbs.forEach(bulb => bulb.classList.add('off'));
    switches.forEach(sw => sw.classList.remove('off'));
    
    currentActive = false;
}

let isDragging = false;
let lastX = 0;
let rotateZ = -30; // 기본 기울임 각도 유지
let rotateX = 30;
let scale = 1;
const layout = document.querySelector('.container');

layout.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - lastX;
  lastX = e.clientX;
  rotateZ += deltaX * 0.5; // 드래그에 따른 회전 정도
  updateTransform();
});

layout.addEventListener('wheel', (e) => {
  e.preventDefault(); // 스크롤 방지
  scale += e.deltaY * -0.003;
  scale = Math.min(Math.max(0.5, scale), 2); // 최소 0.5배 ~ 최대 2배
  updateTransform();
}, { passive: false });

function updateTransform() {
  layout.style.transform = `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
}