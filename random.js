// 작업 데이터를 JSON 형식으로 정의

document.addEventListener("DOMContentLoaded", () => {
  // 예시 콘텐츠 데이터
  const contents = [
    {
      date: "2021",
      tags: ["typography", "physics"],
      description: "A kinetic typography capturing irreversible ink spread",
      image: "image1.gif",
      path: "kinetictypography.html",
    },
    {
      date: "2021",
      tags: ["L-system", "Art"],
      description: "Pattern created using the envelope formula.",
      image: "image3.gif",
      path: "envelopeformula.html",
    },
    {
      date: "2021",
      tags: ["typography"],
      description:
        "Transformed images into rounded forms, creating a stamp-like effect.",
      image: "image2.gif",
      path: "stamp.html",
    },
    {
      date: "2021",
      tags: ["Generative"],
      description: "Twinkling Brush1",
      image: "image4.png",
      path: "twinklingbrush1.html",
    },
    {
      date: "2021",
      tags: ["Generative"],
      description: "Twinkling Brush2",
      image: "image5.png",
      path: "twinklingbrush2.html",
    },
    {
      date: "2021",
      tags: ["Sound"],
      description:
        "Ambient sound varies based on the x, y coordinates and number of points.",
      image: "image6.png",
      path: "numberofpoints.html",
    },
    {
      date: "2021",
      tags: ["Generative"],
      description: "An interactive gradient pattern",
      image: "image7.gif",
      path: "interactivegradient.html",
    },
  ];

  // 현재 선택된 콘텐츠를 저장하는 전역 변수
  let selectedContent = null;

  // 랜덤 문장 생성 함수
  function generateRandomSentence() {
    const words = ["physics", "typography", "shader"];
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
    selectedContent = content;

    console.log("Showing image for:", selectedContent);

    const imageContainer = document.getElementById("customContentImage");
    if (!imageContainer) {
      console.error("Element with ID 'customContentImage' not found.");
      return;
    }

    // 이미지 경로 확인을 위해 console.log 추가
    const imagePath = `assets/image/codeart/${content.image}`;
    console.log("Displaying image at path:", imagePath);

    // 이미지 HTML을 추가
    imageContainer.innerHTML = `<img src="${imagePath}" id="codeartImage" alt="${content.title}" style="max-width: 100%;">
    <button id="codeartImagebutton" 
    onclick="window.location.href = './codeart/${content.path}'" 
    >View more...</button>
    `;

    document.getElementById("codeartImage").addEventListener("click", () => {
      console.log("View more clicked for:", content);
      //이미지 클릭시 페이지 이동 ./codeart/000.html
      window.location.href = `./codeart/${content.path}`;
    });
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
          <th>Date</th>
          <th>Description</th>
          <th></th>
          </tr>
        </thead>
      `;
    const tbody = document.createElement("tbody");

    filteredContents.forEach((content) => {
      const row = document.createElement("tr");

      row.innerHTML += `
        <td>${content.date}</td>
        `;
      tbody.appendChild(row);

      // 타이틀에 클릭 이벤트 추가하여 이미지 표시
      const titleCell = document.createElement("td");
      titleCell.textContent = content.description;
      titleCell.style.cursor = "pointer";
      titleCell.classList.add("title-cell"); // 클래스 추가로 구분

      titleCell.style.opacity = "1";

      //타이틀 hover시
      titleCell.addEventListener("mouseover", () => {
        titleCell.style.opacity = "0.5";
      });

      // hover 해제 시 원래 스타일로 복원
      titleCell.addEventListener("mouseout", () => {
        titleCell.style.opacity = "1";
      });

      row.appendChild(titleCell);

      // 상세 페이지 이동 버튼 추가
      const viewMoreCell = document.createElement("td");
      viewMoreCell.textContent = "view more...";
      viewMoreCell.style.cursor = "pointer";
      viewMoreCell.style.fontSize = "14px";
      viewMoreCell.style.color = "#F44000";
      viewMoreCell.style.textDecoration = "underline";

      //hover시 underline 추가
      viewMoreCell.addEventListener("mouseover", () => {
        viewMoreCell.style.color = "#000000";
        viewMoreCell.style.textDecoration = "none";
      });

      // hover 해제 시 원래 스타일로 복원
      viewMoreCell.addEventListener("mouseout", () => {
        viewMoreCell.style.color = "#F44000";
        viewMoreCell.style.textDecoration = "underline";
      });

      viewMoreCell.addEventListener("click", () => {
        console.log("View more clicked for:", content);
        // 페이지 이동
        window.location.href = `./codeart/${content.path}`;
      });
      row.appendChild(viewMoreCell);
    });

    table.appendChild(tbody);
    container.appendChild(table);

    function initializeFirstSelection() {
      const firstTitleCell = document.querySelector(".title-cell"); // 첫 번째 title-cell 찾기
      if (firstTitleCell) {
        firstTitleCell.classList.add("selected"); // selected 클래스 추가
        firstTitleCell.style.textDecoration = "underline"; // 스타일 적용
      }
    }

    initializeFirstSelection();

    // 이벤트 위임 방식으로 클릭 이벤트 등록
    table.addEventListener("click", (event) => {
      const clickedElement = event.target;
      if (clickedElement.classList.contains("title-cell")) {
        const clickedContentTitle = clickedElement.textContent;
        const content = contents.find(
          (c) => c.description === clickedContentTitle
        );
        if (content) {
          showImage(content);

          const previouslySelected = document.querySelector(
            ".title-cell.selected"
          );
          if (previouslySelected && previouslySelected !== clickedElement) {
            console.log("previouslySelected:", previouslySelected);
            previouslySelected.classList.remove("selected");
            previouslySelected.style.textDecoration = "none"; // 스타일 초기화
          }

          // 현재 클릭된 셀에 스타일 적용
          clickedElement.classList.add("selected");
          clickedElement.style.textDecoration = "underline";
        }
      }
    });
  }

  // 페이지 로드 시 초기화
  generateRandomSentence(); // 랜덤 문장 생성
  displayFilteredContents("customContentTable", contents); // 전체 콘텐츠 표시

  showImage(contents[0]);
});
