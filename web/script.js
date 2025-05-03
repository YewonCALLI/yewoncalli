let currentActive = false;

function toggleCurrent() {
    currentActive = !currentActive;
    const wires = document.querySelectorAll('.wire');
    const bulbs = document.querySelectorAll('.bulb');
    const switches = document.querySelectorAll('.switch');
    
    // 모든 스위치가 ON 상태인지 확인
    const allSwitchesOn = Array.from(switches).every(sw => !sw.classList.contains('off'));
    
    if (currentActive && allSwitchesOn) {
    wires.forEach(wire => wire.classList.add('active'));
    bulbs.forEach(bulb => bulb.classList.remove('off'));
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

