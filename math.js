document.addEventListener("DOMContentLoaded", () => {
    const contents = [
      {
        date: "Sep 16, 2021",
        tag:'Curve',
        description: "Hypocycloid Curve",
        image: "image2.png",
        path: "hypocycloid.html",
      },
      {
        date: "	May 24, 2021",
        tag:'Randomness',
        description: "Watery Typography",
        image: "image1.gif",
        path: "waterytypo.html",
      },
      {
        date: "2021",
        tag:'Geometric',
        description: "Twinkling Brush1",
        image: "image4.png",
        path: "twinklingbrush1.html",
      }
    ];
  
  
    function displayGallery() {
      const container = document.getElementById("customContentTable2");
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
  
  