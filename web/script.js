let currentActive = false;
let cycleCount = 0;
const battery = document.querySelector('.battery');

function toggleSwitch(element) {
    element.classList.toggle('off');
    
    if (!element.classList.contains('off')) {
        startSimulation();
    } else {
        stopSimulation();
    }

}

function startSimulation() {
    currentActive = true;
    cycleCount = 0;
    battery.style.opacity = '1';

    const bulbs = document.querySelectorAll('.bulb');
    const firstColumnBulb = document.querySelector('.circuit-layout .bulb');

    battery.classList.add('shake');
    setTimeout(() => battery.classList.remove('shake'), 300);

    bulbs.forEach(bulb => bulb.classList.add('off'));

    function animate() {
        if (!currentActive) return;

        // 1. 첫 번째 열 와이어들
        const firstColumn = Array.from(document.querySelector('.circuit-layout').querySelectorAll('.wire'));

        // 2. 90도 회전된 와이어들
        const wires90deg = [];
        document.querySelectorAll('.circuit-layout1').forEach(layout => {
            const wire90 = layout.querySelector('div[style*="rotate: 90DEG;"] .wire');
            if (wire90) wires90deg.push(wire90);
        });

        // 3. 마지막 열 와이어들 (역순)
        const lastLayout = document.querySelectorAll('.circuit-layout1')[3];
        const fifthColumn = Array.from(lastLayout.querySelectorAll('.wire'));

        // 4. 270도 회전된 와이어들 (역순)
        const wires270deg = [];
        document.querySelectorAll('.circuit-layout1').forEach(layout => {
            const wire270 = layout.querySelector('div[style*="rotate: 270DEG;"] .wire');
            if (wire270) wires270deg.push(wire270);
        });

        const wireSequence = [
            ...firstColumn,
            ...wires90deg,
            ...fifthColumn.slice().reverse(),
            ...wires270deg.slice().reverse()
        ];

        wireSequence.forEach((wire, index) => {
            setTimeout(() => {
                if (!currentActive) return;

                wire.classList.add('active');

                // 불 켜짐 처리
                if (wire === firstColumn[firstColumn.length - 1]) {
                    setTimeout(() => {
                        if (currentActive) {
                            firstColumnBulb.classList.remove('off');
                        }
                    }, 50);
                }

                // 불 꺼짐 + 다음 순환 재귀
                setTimeout(() => {
                    wire.classList.remove('active');

                    if (index === wireSequence.length - 1) {
                        setTimeout(() => {
                            if (currentActive) {
                                cycleCount++;

                                // 배터리 흐려지기 (최소 opacity 0.3)
                                const newOpacity = Math.max(1 - cycleCount * 0.15, 0.3);
                                battery.style.opacity = newOpacity.toFixed(2);

                                animate();
                            }
                        }, 100);
                    }
                }, 150);
            }, index * 100);
        });
    }

    animate();
}

function stopSimulation() {
    currentActive = false;
    cycleCount = 0;
    battery.style.opacity = '1';

    const wires = document.querySelectorAll('.wire');
    const bulbs = document.querySelectorAll('.bulb');

    wires.forEach(wire => wire.classList.remove('active'));
    bulbs.forEach(bulb => bulb.classList.add('off'));
}

// 회전 및 확대/축소 조작
let isDragging = false;
let lastX = 0;
let rotateZ = -30;
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
    rotateZ += deltaX * 0.5;
    updateTransform();
});

layout.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.003;
    scale = Math.min(Math.max(0.5, scale), 2);
    updateTransform();
}, { passive: false });

function updateTransform() {
    layout.style.transform = `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
}
