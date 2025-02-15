// Dash Line 관련 코드
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
let dashLineWidth = dashElements[0]?.offsetWidth || 0;
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

// Projects 관련 코드
let selectedYear = "All Years";
let selectedTag = "All Media";

function imagePath(image) {
  return `./assets/image/thumbnails/${image}`;
}

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
        ${content.event ? `<p class="card-event">${content.event}</p>` : ''}
      </div>
    `;

    fragment.append(card);
  });

  container.append(fragment);
}

function applyFilters() {
  if (!projects) return;
  
  const filteredProjects = projects.filter((project) => {
    const matchesYear = selectedYear === "All Years" || project.date.toString() === selectedYear.toString();
    const matchesTag = selectedTag === "all" || selectedTag === "All Media" || project.tags.includes(selectedTag);
    
    return matchesYear && matchesTag;
  });
  
  displayFilteredContents("projects", filteredProjects);
}

function initializeProjectFilters() {
  const tagButtons = document.querySelectorAll('.tagBtn:not(.activity-tagBtn)');
  
  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      tagButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      selectedTag = this.dataset.tag;
      applyFilters();
    });
  });
}

// Activities 관련 코드
let selectedActivityTag = 'all';

function renderActivities(items = activitiesData) {
  const container = document.querySelector('.activities-grid');
  if (!container) return;
  
  container.innerHTML = items.map(item => `
    <div class="activity-card" onclick="window.location.href='${item.links[0].url}'">
      <div class="activity-category">${item.category}</div>
      ${item.image ? `
        <div class="activity-image">
          <img src="${imagePath(item.image)}" alt="${item.title}">
        </div>
      ` : ''}
      <h3 class="activity-title">${item.title}</h3>
      <div class="activity-description">${item.description}</div>
      <div class="activity-date">${item.date}</div>
    </div>
  `).join('');
}

function initializeActivityFilters() {
  const activityTagButtons = document.querySelectorAll('.activity-tagBtn');
  
  activityTagButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      activityTagButtons.forEach(button => button.classList.remove('active'));
      this.classList.add('active');
      
      const tag = this.dataset.activityTag;
      selectedActivityTag = tag;
      
      const filtered = tag === 'all' 
        ? activitiesData 
        : activitiesData.filter(item => 
            item.category.toUpperCase() === tag.toUpperCase()
          );
          
      renderActivities(filtered);
    });
  });
}

// 초기화 및 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
  // Dash line 초기화
  drawDashLine();
  window.addEventListener("resize", () => {
    dashLineWidth = dashElements[0]?.offsetWidth || 0;
    dashLineElementCount = Math.floor(dashLineWidth / dashLineElementWidth);
    drawDashLine();
  });

  // Projects 초기화
  if (typeof projects !== 'undefined') {
    initializeProjectFilters();
    applyFilters();
  }

  // Activities 초기화
  if (typeof activitiesData !== 'undefined') {
    renderActivities();
    initializeActivityFilters();
  }
});

document.querySelector('.banner-close').addEventListener('click', function() {
  const banner = document.querySelector('.update-banner');
  banner.style.height = banner.offsetHeight + 'px';
  
  // Force a reflow
  banner.offsetHeight;
  
  banner.style.height = '0';
  banner.style.opacity = '0';
  
  setTimeout(() => {
    banner.style.display = 'none';
  }, 300);
});