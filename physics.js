document.addEventListener("DOMContentLoaded", () => {
  const contents = [
    {
      date: "Sep 30, 2021",
      tag:"Wave & Oscillation",
      description: "Wave interference2",
      image: "wave2.gif", 
      path: "waveinterference2.html",
    },
    {
      date: "Sep 23, 2021",
      tag:"Wave & Oscillation",
      description: "Wave interference",
      image: "image3.png",
      path: "waveinterference.html",
    },
    {
      date: "Sep 16, 2021",
      tag:"Wave & Oscillation",
      description: "Wave Diffraction",
      image: "texture2.png", 
      path: "wavediffraction.html",
    }, 
    {
      date: "Oct 10, 2021",
      tag:"Fluid",
      description: "Fireworks",
      image: "drop.gif",
      path: "firework.html",
    },
    {
      date: "Dec 12, 2021",
      tag:"Gravity",
      description: "Animated Typography",
      image: "typoanimate.gif",
      path: "animated_typography.html",
    },
    {
      date: "Sep 19, 2023",
      tag:"Gravity",
      description: "Gravity",
      image: "gravity.png",
    },
    
  ];


  function displayGallery() {
    const container = document.getElementById("customContentTable");
    container.innerHTML = '';

    contents.forEach(content => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      
      const moreLink = content.path ? `<a class="view-more2" href="./codeart/${content.path}">More</a>` : '';

      galleryItem.innerHTML = `
        <div class="gallery-tag">${content.tag}</div>
        <img class="gallery-image" src="assets/image/codeart/${content.image}" alt="${content.description}">
        <div class="gallery-info">
          <div class="gallery-date">${content.date}</div>
          <div class="gallery-description">${content.description}</div>
          ${moreLink}
        </div>
      `;

      container.appendChild(galleryItem);
    });
  }

  // 초기화
  displayGallery();
});
