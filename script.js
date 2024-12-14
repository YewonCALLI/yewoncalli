const dashElements = document.querySelectorAll(".dash");
//데시라인 너비
const dashLineElementWidth = 20;
//데시라인 스트로크 두께 조절
const dashLineElementStroke = 2;
//데시라인 간격 조절
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
    // 기존 dashLineDiv가 있으면 제거
    if (element.querySelector(".dash-line")) {
      element.querySelector(".dash-line").remove();
    }

    // 새로운 dashLineDiv 생성
    const newDashLineDiv = createDashLineDiv();
    newDashLineDiv.classList.add("dash-line");

    // dashLineElementCount에 맞춰 dashLineElement 추가
    newDashLineDiv.append(
      ...Array.from({ length: dashLineElementCount }, () =>
        dashLineElement.cloneNode(true)
      )
    );

    // 각 dashElement에 추가
    element.appendChild(newDashLineDiv);
  });
}

window.addEventListener("resize", () => {
  dashLineWidth = dashElements[0].offsetWidth;
  dashLineElementCount = Math.floor(dashLineWidth / dashLineElementWidth);
  drawDashLine();
});

drawDashLine();


function toggleMenu() {
  const projects = document.getElementById("goProjects");
  const info = document.getElementById("goInfo");
  // 메뉴 버튼을 클릭하면 scrollIntoView 함수를 사용하여 해당 섹션으로 이동
  projects.addEventListener("click", () => {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  });
}

// 현재 선택된 필터 상태 변수
let selectedTag = "All Media";
let selectedYear = "All Years";

function filterTagLogic() {
  const tags = [...new Set(projects.flatMap((project) => project.tags))];
  const dropdownTag = document.getElementById("tagDropdown");
  const selectedTagSpan = document.querySelector("#selectedTag");
  const dropdownTagIcon = document.getElementById("filterTagIcon");

  tags.forEach((tag) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = tag;
    item.onclick = () => {
      selectedTag = tag; // 선택한 태그 업데이트
      selectedTagSpan.textContent = tag;
      applyFilters(); // 모든 필터 조건 적용
    };
    dropdownTag.appendChild(item);
  });

  const allItem = document.createElement("div");
  allItem.classList.add("dropdown-item");
  allItem.textContent = "All Media";
  allItem.onclick = () => {
    selectedTag = "All Media"; // 기본값으로 리셋
    selectedTagSpan.textContent = "All Media";
    applyFilters();
  };
  dropdownTag.prepend(allItem);

  document.getElementById("filterTag").onclick = () => {
    dropdownTag.classList.toggle("show");
    dropdownTagIcon.style.transform = dropdownTag.classList.contains("show")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  };

  window.addEventListener("click", (event) => {
    const filterTagButton = document.getElementById("filterTag");
    if (!filterTagButton.contains(event.target)) {
      dropdownTag.classList.remove("show");
    }
  });
}

function filterYearLogic() {
  const years = [...new Set(projects.map((project) => project.date))];
  const dropdownYear = document.getElementById("yearDropdown");
  const selectedYearSpan = document.querySelector("#selectedYear");
  const dropdownYearIcon = document.getElementById("filterYearIcon");

  years.forEach((year) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = year;
    item.onclick = () => {
      selectedYear = year; // 선택한 년도 업데이트
      selectedYearSpan.textContent = year;
      applyFilters();
    };
    dropdownYear.appendChild(item);
  });

  const allItem = document.createElement("div");
  allItem.classList.add("dropdown-item");
  allItem.textContent = "All Years";
  allItem.onclick = () => {
    selectedYear = "All Years"; // 기본값으로 리셋
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
    }
  });
}

// 선택된 태그와 년도를 적용하여 프로젝트를 필터링하는 함수
function applyFilters() {
  const finalFilteredProjects = projects.filter((project) => {
    const matchesTag =
      selectedTag === "All Media" || project.tags.includes(selectedTag);
    const matchesYear =
      selectedYear === "All Years" || project.date === selectedYear;
    return matchesTag && matchesYear;
  });

  displayFilteredContents("projects", finalFilteredProjects); // 필터링된 프로젝트 표시
}

// 필터링된 프로젝트 목록을 표시하는 함수
function displayFilteredContents(sectionName, filteredContents) {
  const container = document.getElementById(sectionName + "Container");

  // 필터링 시 프로젝트 카드를 추가할 섹션의 내용을 비웁니다.
  if (sectionName === "projects") {
    container.innerHTML = ""; // 기존 프로젝트 리스트 초기화
  }

  const fragment = document.createDocumentFragment();

  filteredContents.forEach((content) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class='card-text'>
        <div class='card-header'>
          <div class='card-title' id='card-${sectionName}'>${
      content.title
    }</div>
          <div class='card-subContainer'>
            <div class='card-date'>${content.date}</div>
            <div class='card-tags'>${formatTags(content.tags)}</div>
          </div>
        </div>
        <div class='card-contents'>
          <div class='card-description'>${content.description}</div>
          <div class='card-event'> ${content.event}</div>
          <div class='card-more'>
          <a href=${content.link}>
            More...
          </a>
          </div>
        </div>
      </div>
      <div class="card-image">
        <img src="${imagePath(content.image)}" alt="${content.title}" />
        <a class="card-link" href='https://${content.projectLink}'>
         ${content.projectLink}
        </a>
      </div>
    `;

    fragment.append(card);
  });

  container.append(fragment); // 필터링된 프로젝트 콘텐츠 추가
}

// 초기 필터 로직 실행
filterTagLogic();
filterYearLogic();

function formatTags(tags) {
  return tags
    .map((tag) => `<button class='card-tag'>${tag}</button>`)
    .join(" ");
}

function imagePath(image) {
  // 이미지 경로를 반환하는 함수
  return `./assets/image/thumbnails/${image}`;
}

function displayCodeArt() {
  const codeArts = document.getElementById("codeArt");
}

// HTML에 프로젝트 카드를 생성하는 함수
function displayResearch() {
  const sectionName = "research";
  const container = document.getElementById("researchContainer");
  const fragment = document.createDocumentFragment();

  research.forEach((content) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class='card-text'>
        <div class='card-header'>
          <div class='card-title' id='card-${sectionName}'>${
      content.title
    }</div>
          <div class='card-subContainer'>
            <div class='card-date'>${content.date}</div>
            <div class='card-tags'>${formatTags(content.tags)}</div>
          </div>
        </div>
        <div class='card-contents'>
          <div class='card-projectType'> ${content.projectType}</div>
          <div class='card-event'> ${content.event}</div>
          <div class='card-description'>${content.description}</div>
          <div class='card-more'>More...</div>
        </div>
      </div>
      <div class="card-image">
        <img src="${imagePath(content.image)}" alt="${content.title}" />
      </div>
    `;

    fragment.append(card);
  });

  container.append(fragment); // 필터링된 프로젝트 콘텐츠 추가
}

function openOverlay() {
  document.getElementById("overlay").style.display = "flex";
}

function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
}

// 페이지 로드 시 프로젝트 표시 함수 실행
document.addEventListener("DOMContentLoaded", () => {
  displayFilteredContents("projects", projects); // 초기에는 모든 프로젝트 표시
  toggleMenu(); // 메뉴 토글 기능 추가
});

// 페이지 로드 시 리서치 표시 함수 실행
document.addEventListener("DOMContentLoaded", displayResearch);

// 페이지 로드 시 메뉴 토글 함수 실행
document.addEventListener("DOMContentLoaded", toggleMenu);

let showAllProjects = false; // 프로젝트를 모두 보여줄지 여부를 나타내는 변수

function displayFilteredContents(sectionName, filteredContents) {
  const container = document.getElementById(sectionName + "Container");
  container.innerHTML = ""; // 기존 프로젝트 리스트 초기화

  // 모든 프로젝트를 보여줄지 여부에 따라 표시할 개수 설정
  const displayCount = showAllProjects ? filteredContents.length : 3;

  const fragment = document.createDocumentFragment();
  filteredContents.forEach((content) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class='card-text'>
        <div class='card-header'>
          <div class='card-title' id='card-${sectionName}'>${
      content.title
    }</div>
          <div class='card-subContainer'>
            <div class='card-date'>${content.date}</div>
            <div class='card-tags'>${formatTags(content.tags)}</div>
          </div>
        </div>
        <div class='card-contents'>
          <div class='card-description'>${content.description}</div>
          <div class='card-event'> ${content.event}</div>
          <div class='card-more'><a href=${content.link}>More...</a></div>
        </div>
      </div>
      <div class="card-image">
      <img src="${imagePath(content.image)}" alt="${content.title}"
     onclick="window.location.href='${content.link}'" />
        <a class="card-link" id='card-${sectionName}' href='https://${
      content.projectLink
    }'>
         ${content.projectLink}
        </a>
      </div>
    `;
    fragment.append(card);
  });

  container.append(fragment);
}


