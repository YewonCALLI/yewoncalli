// Dash Line 관련 코드 유지
const dashElements = document.querySelectorAll(".dash");
const dashLineElementWidth = 20;
const dashLineElementStroke = 2;
const dashLineGap = 5;

function createDashLineDiv() {
  const dashLineDiv = document.createElement("div");
  dashLineDiv.style.width = "100%";
  dashLineDiv.style.height = "1px";
  dashLineDiv.style.display = "flex";
  dashLineDiv.style.justifyContent = "center";
  dashLineDiv.style.flexDirection = "row";
  dashLineDiv.style.gap = `${dashLineGap}px`;
  dashLineDiv.style.alignItems = "center";
  return dashLineDiv;
}

function createDashLineElement() {
  const dashLineElement = document.createElement("div");
  dashLineElement.style.minWidth = `${dashLineElementWidth}px`;
  dashLineElement.style.height = `${dashLineElementStroke}px`;
  dashLineElement.style.textAlign = "center";
  dashLineElement.style.backgroundColor = "black";
  return dashLineElement;
}

const dashLineDiv = createDashLineDiv();
const dashLineElement = createDashLineElement();
let dashLineWidth = dashElements[0].offsetWidth;
let dashLineElementCount = Math.floor(dashLineWidth / dashLineElementWidth);

function drawDashLine() {
  dashElements.forEach((element) => {
    if (element.querySelector(".dash-line")) {
      element.querySelector(".dash-line").remove();
    }
    const newDashLineDiv = createDashLineDiv();
    newDashLineDiv.classList.add("dash-line");
    newDashLineDiv.append(
      ...Array.from({ length: dashLineElementCount }, () =>
        dashLineElement.cloneNode(true)
      )
    );
    element.appendChild(newDashLineDiv);
  });
}

window.addEventListener("resize", () => {
  dashLineWidth = dashElements[0].offsetWidth;
  dashLineElementCount = Math.floor(dashLineWidth / dashLineElementWidth);
  drawDashLine();
});

drawDashLine();

// 현재 선택된 필터 상태
let selectedYear = "All Years";
let selectedTag = "All Media";

// 필터링된 프로젝트 표시 함수
function displayFilteredContents(sectionName, filteredContents) {
  const container = document.getElementById(sectionName + "Container");
  if (!container) return;
  
  container.innerHTML = "";
  
  const fragment = document.createDocumentFragment();
  
  filteredContents.forEach((content) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-content" style="display:flex; padding-bottom:10px; gap:3px;">
        <div class="card-date">${content.date}</div>
        ${content.tags.map(tag => `
          <span class="card-tag">${tag}</span>
        `).join('')}
      </div>
        <h3 class="project-title">${content.title}</h3>
          <div class="project-image-container">
            <img 
              src="${imagePath(content.image)}" 
              alt="${content.title}"
              onclick="window.location.href='${content.link}'"
            />
        </div>
      <div class="project-content">
        <p class="project-description">${content.description}</p>
        <p class="card-event">${content.event}</p>
      </div>
    `;

    fragment.append(card);
  });

  container.append(fragment);
}

function imagePath(image) {
  return `./assets/image/thumbnails/${image}`;
}

// Year 드롭다운 필터 로직
function filterYearLogic() {
  if (!projects || !projects.length) return;
  
  const years = [...new Set(projects.map((project) => project.date))];
  const dropdownYear = document.getElementById("yearDropdown");
  const selectedYearSpan = document.querySelector("#selectedYear");
  const dropdownYearIcon = document.getElementById("filterYearIcon");

  if (!dropdownYear || !selectedYearSpan || !dropdownYearIcon) return;

  years.forEach((year) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = year;
    item.onclick = () => {
      selectedYear = year;
      selectedYearSpan.textContent = year;
      applyFilters();
    };
    dropdownYear.appendChild(item);
  });

  const allItem = document.createElement("div");
  allItem.classList.add("dropdown-item");
  allItem.textContent = "All Years";
  allItem.onclick = () => {
    selectedYear = "All Years";
    selectedYearSpan.textContent = "All Years";
    applyFilters();
  };
  dropdownYear.prepend(allItem);

  document.getElementById("filterYear").onclick = () => {
    dropdownYear.classList.toggle("show");
    dropdownYearIcon.style.transform = dropdownYear.classList.contains("show")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  };

  window.addEventListener("click", (event) => {
    const filterYearButton = document.getElementById("filterYear");
    if (!filterYearButton.contains(event.target)) {
      dropdownYear.classList.remove("show");
      dropdownYearIcon.style.transform = "rotate(0deg)";
    }
  });
}
// 필터 적용 함수 수정
function applyFilters() {
  if (!projects) return;
  
  const filteredProjects = projects.filter((project) => {
    const matchesYear = selectedYear === "All Years" || project.date.toString() === selectedYear.toString();
    
    // data-tag="all"인 경우의 처리를 수정
    const matchesTag = 
      selectedTag === "all" || // HTML의 data-tag 값과 일치하도록 수정
      selectedTag === "All Media" || // 이전 코드와의 호환성을 위해 유지
      project.tags.includes(selectedTag);
    
    return matchesYear && matchesTag;
  });

  console.log('Selected Tag:', selectedTag); // 디버깅용
  console.log('Filtered Projects:', filteredProjects); // 디버깅용
  
  displayFilteredContents("projects", filteredProjects);
}

// 태그 버튼 초기화 함수 수정
function initializeTagButtons() {
  const tagButtons = document.querySelectorAll('.tagBtn');
  
  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      tagButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // data-tag 속성값을 그대로 사용
      selectedTag = this.dataset.tag;
      
      console.log('Tag clicked:', selectedTag); // 디버깅용
      applyFilters();
    });
  });
}

// 초기화 시 모든 프로젝트 표시 보장
document.addEventListener("DOMContentLoaded", () => {
  filterYearLogic();
  initializeTagButtons();
  
  // 초기 상태에서 모든 프로젝트 표시
  selectedTag = "all";
  selectedYear = "All Years";
  displayFilteredContents("projects", projects);
});