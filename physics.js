document.addEventListener("DOMContentLoaded", () => {
  const contents = [
    {
      date: "Sep 23, 2021",
      tag:"Wave & Oscillation",
      description: "Wave interference",
      image: "image3.png",
      path: "waveinterference.html",
    },
    {
      date: "Oct 10, 2021",
      tag:"Fluid",
      description: "Fireworks",
      image: "drop.gif",
      path: "waveinterference.html",
    },
    {
      date: "Sep 23, 2021",
      tag:"Particle",
      description: "Wave interference",
      image: "image3.png",
      path: "waveinterference.html",
    }
  ];


  function displayGallery() {
    const container = document.getElementById("customContentTable");
    container.innerHTML = '';

    contents.forEach(content => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      
      galleryItem.innerHTML = `
        <div class="gallery-tag">${content.tag}</div>
        <img class="gallery-image" src="assets/image/codeart/${content.image}" alt="${content.description}">
        <div class="gallery-info">
          <div class="gallery-date">${content.date}</div>
          <div class="gallery-description">${content.description}</div>
          <a class="view-more2" href="./codeart/${content.path}">More</a>
        </div>
      `;

      container.appendChild(galleryItem);
    });
  }

  // 초기화
  displayGallery();
});

