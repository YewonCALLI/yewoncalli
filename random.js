document.addEventListener("DOMContentLoaded", () => {
  // 예시 콘텐츠 데이터
  const contents = [
    {
      date: "2021",
      tags: ["typography", "physics"],
      description: "A kinetic typography capturing irreversible ink spread",
      image: "image1.gif",
    },
    {
        date: "2021",
        tags: ["L-system", "Art"],
        description: "Pattern created using the envelope formula.",
        image: "image3.gif",
      },
    {
      date: "2021",
      tags: ["typography"],
      description: "Transformed images into rounded forms, creating a stamp-like effect.",
      image: "image2.gif",
    },
    {
      date: "2021",
      tags: ["Generative"],
      description: "Twinkling Brush1",
      image: "image4.png",
    },
    {
      date: "2021",
      tags: ["Generative"],
      description: "Twinkling Brush2",
      image: "image5.png",
    },
    {
      date: "2021",
      tags: ["Sound"],
      description: "Ambient sound varies based on the x, y coordinates and number of points.",
      image: "image6.png",
    },
    {
      date: "2021",
      tags: ["Generative"],
      description: "An interactive gradient pattern",
      image: "image7.gif",
    },
  ];

  // 랜덤 문장 생성 함수
  function generateRandomSentence() {
    const words = ["Generative", "typography", "shader"];
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
    const imagePath = `assets/image/codeart/${content.image}`;
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
    table.innerHTML = `
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
      `;
    const tbody = document.createElement("tbody");

    filteredContents.forEach((content) => {
      const row = document.createElement("tr");

      // 타이틀에 클릭 이벤트 추가하여 이미지 표시
      const titleCell = document.createElement("td");
      titleCell.textContent = content.description;
      titleCell.style.cursor = "pointer";
      titleCell.classList.add("title-cell"); // 클래스 추가로 구분

      row.appendChild(titleCell);

      row.innerHTML += `
        <td>${content.date}</td>
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
        const content = contents.find((c) => c.description === clickedContentTitle);
        if (content) showImage(content);
      }
    });
  }

  // 페이지 로드 시 초기화
  generateRandomSentence(); // 랜덤 문장 생성
  displayFilteredContents("customContentTable", contents); // 전체 콘텐츠 표시

  showImage(contents[0]);
});
