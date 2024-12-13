// 작업 데이터를 JSON 형식으로 정의

document.addEventListener("DOMContentLoaded", () => {
  // 예시 콘텐츠 데이터
  const contents = [
    {
      date: "	May 24, 2021",
      description: "Watery Typography",
      image: "image1.gif",
      path: "waterytypo.html",
    },
    {
      date: "2021",
      description: "Hypocycloid Curve",
      image: "image2.png",
      path: "envelopeformula.html",
    },
    {
      date: "2021",
      description: "Twinkling Brush1",
      image: "image4.png",
      path: "twinklingbrush1.html",
    },
    {
      date: "2021",
      description: "Twinkling Brush2",
      image: "image5.png",
      path: "twinklingbrush2.html",
    },
    {
      date: "2021",
      description:
        "Ambient sound varies based on the x, y coordinates and number of points.",
      image: "image6.png",
      path: "numberofpoints.html",
    },
    {
      date: "2021",
      description: "An interactive gradient pattern",
      image: "image7.gif",
      path: "interactivegradient.html",
    },
  ];


  function displayGallery() {
    const container = document.getElementById("customContentTable");
    container.innerHTML = '';

    contents.forEach(content => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      
      galleryItem.innerHTML = `
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

