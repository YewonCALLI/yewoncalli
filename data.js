const projects = [
  {
    title: "TypoFold",
    date: "2024",
    tags: ["Papercraft", "Tool"],
    projectType: "Personal Project",
    event: "2024 ATC (Art&Technology Conference)",
    description:
      "A design tool that converts 3D typography into paper craft.",
    projectLink: "typefold.vercel.app",
    image: "../thumbnails/typofold.gif",
    link: "works/typefold.html",
  },
  {
    title: "Word Wide Web",
    date: "2024",
    tags: ["AI-Writing", "Tool"],
    projectType: "Team Project",
    event: "SFPC (School for Poetic Computation)",
    description:
      "A word-weaving platform that creates poems through connected synonyms.",
    projectLink: "solarword.vercel.app",
    image: "wordwideweb_2.png",
    link: "works/wordwideweb.html",
  },
  {
    title: "Ganpan",
    date: "2024",
    tags: ["Typography", "Tool", "Zine"],
    projectType: "Team Project",
    event: "2024 ATC (Art&Technology Conference)",
    description:
      "A digital art project transforming user-inputted text into Korean signboard images.",
    projectLink: "ganpan.vercel.app",
    image: "ganpan.png",
    link: "works/ganpan.html"
 
  },
  {
    title: "DA-DUCK",
    date: "2024",
    tags: ["Commercial", "Branding Design"],
    projectType: "Team Project",
    event: "The Hyundai Seoul, B1 Event Plaza",
    description:
      "p5.js character goods inspired by Yeongdeungpo’s mallard, sold at The Hyundai Department Store.",
    projectLink: "daduck.vercel.app",
    image: "daduck.png",
    link: "works/daduck.html",
  },
  {
    title: "Memeproject",
    date: "2023",
    tags: ["Generative-arts", "Tool"],
    projectType: "Team Project",
    event: "PlanT House, Hongcheon Art Museum",
    description:
      "An interactive website that explores meme origins, impact, and replication, and helps users create their own memes.",
    projectLink: "memeproject.vercel.app",
    image: "memeproject.png",
    link: "works/memeproject.html",
  },
  {
    title: "Hongyeon 1.0",
    date: "2023",
    tags: ["AI-Writing", "Tool"],
    projectType: "Team Project",
    event: "The Silver Bell Challenge: Hong Yeon-gil Project, ten to the n",
    description:
      "A chatbot blending multigenerational voices from Hongyeon-gil, sharing local stories and culture through AI-driven narrative.",
    projectLink: "hongyeon.vercel.app",
    image: "hongyeon.png",
    link: "works/hongyeon.html",
  },
  {
    title: "ABT (Art, Body, Tech)",
    date: "2023",
    tags: ["Commercial", "Branding Design"],
    projectType: "Team Project",
    event: "The Silver Bell Challenge: Hong Yeon-gil Project, ten to the n",
    description:
      "Branding design for Team ABT’s project using p5.js code art to create event typography, posters, and a website.",
    projectLink: "abt-avatar.world",
    image: "abt.png",
    link: "works/abt.html",
  },
  {
    title: "Simulating #1,2,3",
    date: "2023",
    tags: ["Generative-arts", "Physics","Media Facade"],
    projectType: "Team Project",
    event: "ACC Media Cube, Gwangju",
    description: "Simulating gravity through Unreal Engine’s Blueprint.",
    projectLink: "",
    image: "simulating.png",
    link: "works/simulating.html",
  },
  {
    title: "Singlet&Multiplet",
    date: "2021",
    tags: ["Generative-arts", "Physics","Media Facade"],
    projectType: "Team Project",
    event:
      "8th International New Media Art Exhibition, CICA Museum <br>Beyond the Lens : Nano Bio Nature, Seoul Institute of the Arts, IBS(Institute for Basic Science)",
    description:
      "A media art performance exploring identity and quantum mechanics through layered video art and live performance.",
    projectLink: "",
    image: "singlet&multiplet.png",
    link: "works/singlet&multiplet.html",
  },
  {
    title: "Draw the Beat!",
    date: "2021",
    tags: ["Music", "Tool"],
    projectType: "Team Project",
    event:
      "School Project (Creative Algorithms)",
    description: "A program that creates music by drawing.",
    projectLink: "",
    image: "../details/drawthebeat01.png",
    link: "works/drawthebeat.html",
  },
];

// const research = [
//   {
//     title: "Franklin",
//     date: "2024",
//     tags: ["AI Debiasing", "Prompt Engineering"],
//     projectType: "Team Project",
//     event: "Performed : SFPC(School for Poetic Computation)",
//     description: `
//       Word Wide Web is a project I developed while attending the "Human-Scale Natural Language Processing" course at SFPC Summer School. During this course, around a dozen participants, including myself, contributed by curating and submitting our own unique text data. I submitted a poetic essay inspired by the works of Dai Yoko and George Eliot.
//       `,
//     projectLink: "",
//     image: "typefold.png",
//   },
// ];

const activitiesData = [
  {
    category: "OPENSOURCE",
    title: "p5.js 2.0 Renewal Korean Translate Contribution",
    description: "Contributed to Korean translation of technical documentations.",
    date: "03/2024~04/2024",
    image: "activities/p5js.png",
    links: [
      {
        text: "Workshop Materials",
        url: "https://github.com/p5-js-KO-Translation/2024"
      }
    ]
  },
  {
    category: "COMMUNITY",
    title: "Open Source Education Curation - NAVER Connect Foundation",
    description: "Curated educational platforms focused on open-source tools (p5.js, Life Coding, Inflearn) to promote accessible software education.",
    date: "09/2023",
    links: [
      {
        text: "Workshop Materials",
        url: "https://www.instagram.com/p/Cw2w4dMxETC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
      }
    ]
  },
  {
    category: "COMMUNITY",
    title: "Software Education Festival (SEF) 2023 - Full-time Staff",
    description: "Worked as a full-time staff member for SEF2023, a major software education festival. Led speaker coordination and meetup event management, working closely with various software communities and educational institutions.",
    date: "05/2023~09/2023",
    image: "activities/photo9.png",
    links: [
      {
        text: "Workshop Materials",
        url: "https://marvelous-catmint-e23.notion.site/AR-641a2795580b47e0a5fa98cc69964c9e?pvs=73"
      }
    ]
  },
  {
    category: "RESEARCH",
    title: "Construction of Debiased Korean AI Fairytale Generator",
    description: "Journal of Digital Contents Society<br><br>Jiin An*, Saetbyeol Leeyouk*, Yewon Jang*, & Dasaem Jeong.",
    date: "07/2023",
    links: [
      {
        text: "View on GitHub",
        url: "http://journal.dcs.or.kr/xml/37344/37344.pdf"
      }
    ]
  },
  {
    category: "RESEARCH",
    title: "Debiased korean AI fairytale generator &lt;Franklin&gt;",
    description: "PROCEEDINGS OF HCI KOREA <br><br>Jiin An*, Saetbyeol Leeyouk*, Yewon Jang*, & Dasaem Jeong.",
    date: "02/2023",
    links: [
      {
        text: "View on GitHub",
        url: "http://journal.dcs.or.kr/xml/37344/37344.pdf"
      }
    ]
  },
  {
    category: "WORKSHOP",
    title: "Create your own AR snowball using SPARK AR",
    description: "Collaboration with the Hyundai Motor Company Chung Mong-koo Foundation",
    date: "11/19/2022",
    image: "activities/AR_workshop.jpg",
    links: [
      {
        text: "Workshop Materials",
        url: "https://marvelous-catmint-e23.notion.site/AR-641a2795580b47e0a5fa98cc69964c9e?pvs=73"
      }
    ]
  },
];
