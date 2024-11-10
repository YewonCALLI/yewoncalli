document.addEventListener("DOMContentLoaded", () => {
  // 예시 콘텐츠 데이터
  const contents = [
    {
      title: "Draw the Beat!",
      date: "2021",
      tags: ["Code", "Game"],
      description: "A program that creates music by drawing",
      projectLink: "daduck.vercel.app",
      image: "drawthebeat.png",
      link: "works/daduck.html",
    },
    {
      title: "Physics Simulation",
      date: "2022",
      tags: ["physics"],
      description: "Physics-based project.",
      projectLink: "physicssim.vercel.app",
      image: "physicssim.png",
      link: "works/physicssim.html",
    },
    {
      title: "L-system Art",
      date: "2023",
      tags: ["L-system", "Art"],
      description: "Fractal art using L-system.",
      projectLink: "lsystem.vercel.app",
      image: "lsystem.png",
      link: "works/lsystem.html",
    },
    {
      title: "Shader Animation",
      date: "2023",
      tags: ["shader"],
      description: "Real-time shader effects.",
      projectLink: "shaderanim.vercel.app",
      image: "shaderanim.png",
      link: "works/shaderanim.html",
    },
  ];

  // 랜덤 문장 생성 함수
  function generateRandomSentence() {
    const words = ["physics", "L-system", "shader"];
    const sentenceContainer = document.getElementById("customRandomSentence");
    if (!sentenceContainer) {
      console.error("Element with ID 'customRandomSentence' not found.");
      return;
    }
    sentenceContainer.innerHTML = ""; // 기존 문장 초기화

    words.forEach((word) => {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word;
      wordSpan.style.cursor = "pointer";
      wordSpan.style.margin = "0 5px";
      wordSpan.classList.add("filter-word");

      // 단어 클릭 이벤트 추가
      wordSpan.addEventListener("click", () => {
        console.log(`Clicked on word: ${word}`);
        applyCategoryFilter(word);
      });
      sentenceContainer.appendChild(wordSpan);
    });
  }

  // 선택한 단어를 기반으로 콘텐츠를 필터링하는 함수
  function applyCategoryFilter(tag) {
    console.log(`Applying filter for tag: ${tag}`);
    const filteredContents = contents.filter((content) =>
      content.tags.includes(tag)
    );
    console.log("Filtered contents:", filteredContents);
    displayFilteredContents("customContentTable", filteredContents);
  }

  function showImage(content) {
    const imageContainer = document.getElementById("customContentImage");
    if (!imageContainer) {
      console.error("Element with ID 'customContentImage' not found.");
      return;
    }

    // 이미지 경로 확인을 위해 console.log 추가
    const imagePath = `assets/image/thumbnails/${content.image}`;
    console.log("Displaying image at path:", imagePath);

    // 이미지 HTML을 추가
    imageContainer.innerHTML = `<img src="${imagePath}" alt="${content.title}" style="max-width: 100%;">`;
  }

  // 필터링된 콘텐츠 표시 함수
  function displayFilteredContents(sectionId, filteredContents) {
    const container = document.getElementById(sectionId);
    if (!container) {
      console.error(`Element with ID '${sectionId}' not found.`);
      return;
    }
    container.innerHTML = ""; // 기존 콘텐츠 초기화

    const table = document.createElement("table");
    table.style.width = "100%"; // 테이블 너비를 100%로 설정
    table.style.borderCollapse = "collapse";
    table.innerHTML = `
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
      `;
    const tbody = document.createElement("tbody");

    filteredContents.forEach((content) => {
      const row = document.createElement("tr");

      // 타이틀에 클릭 이벤트 추가하여 이미지 표시
      const titleCell = document.createElement("td");
      titleCell.textContent = content.title;
      titleCell.style.cursor = "pointer";
      titleCell.classList.add("title-cell"); // 클래스 추가로 구분

      row.appendChild(titleCell);

      row.innerHTML += `
          <td>${content.date}</td>
          <td>${content.description}</td>
          <td><a href="${content.link}" target="_blank">View more</a></td>
        `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);

    // 이벤트 위임 방식으로 클릭 이벤트 등록
    table.addEventListener("click", (event) => {
      const clickedElement = event.target;
      if (clickedElement.classList.contains("title-cell")) {
        const clickedContentTitle = clickedElement.textContent;
        const content = contents.find((c) => c.title === clickedContentTitle);
        if (content) showImage(content);
      }
    });
  }

  // 페이지 로드 시 초기화
  generateRandomSentence(); // 랜덤 문장 생성
  displayFilteredContents("customContentTable", contents); // 전체 콘텐츠 표시
});
