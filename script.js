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

//floating banner
const floatingWindow = document.getElementById('floating-update');
const windowHeader = floatingWindow.querySelector('.window-header');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

windowHeader.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === windowHeader || e.target.parentNode === windowHeader) {
    isDragging = true;
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, floatingWindow);
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  isDragging = false;
}

function setTranslate(xPos, yPos, el) {
  // Using requestAnimationFrame for smoother animation
  requestAnimationFrame(() => {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  });
}

// Add visual feedback when dragging
function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === windowHeader || e.target.parentNode === windowHeader) {
    isDragging = true;
    floatingWindow.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.4)';
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  isDragging = false;
  floatingWindow.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
}

// Close button functionality
// Gallery functionality
const track = document.querySelector('.gallery-track');
const slides = document.querySelectorAll('.gallery-slide');
const prevButton = document.querySelector('.gallery-arrow.prev');
const nextButton = document.querySelector('.gallery-arrow.next');
const dotsContainer = document.querySelector('.gallery-dots');

let currentIndex = 0;

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('gallery-dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

// Update dots
function updateDots() {
  document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Go to specific slide
function goToSlide(index) {
  currentIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

// Next slide
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  goToSlide(currentIndex);
});

// Previous slide
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(currentIndex);
});

// Close button functionality
document.querySelector('.window-close').addEventListener('click', function() {
  floatingWindow.style.opacity = '0';
  floatingWindow.style.transform = 'scale(0.9)';
});