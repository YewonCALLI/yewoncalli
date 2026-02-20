export type ProjectSkill =
  | 'Tool Development'
  | 'AI & Society'
  | 'Computer Graphics'
  | 'Media Art'
  | 'Interaction Design'
  | 'Digital Fabrication'

export const ALL_SKILLS: ProjectSkill[] = [
  'Tool Development',
  'AI & Society',
  'Computer Graphics',
  'Digital Fabrication',
  'Interaction Design',
  'Media Art',
]

export const projects = [
  {
    slug: 'typofold',
    name: 'Typofold',
    cover: '/images/projects/typofold/Untitled-112.jpeg',
    part: 'Tool development, Digital Fabrication',
    description: 'A design tool that converts 3D models into paper crafts',
    researchQuestion:
      'How can we provide the convenience of automation while not losing the sense of having made it yourself?',
    keyFindings:
      '2/3 of workshop participants (N=18) reported feeling genuine ownership over their physical output. Physical assembly through cutting and folding significantly strengthened attachment compared to digital-only creation.',
    award: 'HCI Korea Creative Awards 2025',
    exhibition: 'Slanted Magazine #47—Digital Tools (04/2026 Release)',
    funded: ['National Research Foundation (NRF)'],
    created_date: '2025',
    featured: true,
    skills: ['Tool Development', 'Computer Graphics', 'Digital Fabrication'] as ProjectSkill[],
  },
  {
    slug: 'franklin',
    name: 'Franklin',
    cover: '/images/projects/franklin/01.jpg',
    part: 'AI Engineer, Backend Developer',
    description: 'Gender Debiased Korean Fairytale Generator',
    researchQuestion: 'Why all fairytale girls want party, while all fairytale boys fight with dragons?',
    keyFindings:
      'Applied hard debiasing to Korean word embeddings, neutralizing indirect gender associations. Showcased at OnDream Society and 2023 HCI Korea Conference.',
    award: 'HCI Korea Creative Awards 2023',
    publication: 'Journal of Digital Contents Society',
    funded: ['Smilegate AI Membership', 'National Research Foundation (NRF)'],
    created_date: '2022',
    featured: true,
    skills: ['AI & Society', 'Tool Development'] as ProjectSkill[],
  },
  {
    slug: 'xr-science-museum',
    name: 'XR Science Museum',
    cover: '/images/projects/xr-science-museum/cover.jpeg',
    part: 'UX/UI Designer, Frontend Developer',
    description:
      '14 WebXR contents (websites) included in the MiraeN Science Digital Textbook for Elementary School 5th-6th Grade under the 2022 Revised Curriculum.',
    researchQuestion: 'How can interactive 3D simulations reduce instructional friction in digital science textbooks?',
    keyFindings:
      'Identified 3 key barriers in existing digital textbooks through teacher and student journey research. Designed 4 reusable XR experiment templates; platform launches March 2026 across multiple classrooms.',
    client: 'MiraeN',
    created_date: '2025',
    featured: true,
    skills: ['Tool Development', 'Computer Graphics'] as ProjectSkill[],
    vimeoId: '1151529949',
  },
  {
    slug: 'new-formative',
    name: 'Samsung Design Membership 2025 Online Exhibition',
    cover: '/images/projects/new-formative/cover.png',
    part: 'Frontend Developer',
    client: 'Samsung Design Membership',
    created_date: '2025',
    skills: ['Interaction Design','Tool Development'] as ProjectSkill[],
    vimeoId: '1151368571',
  },
  {
    slug: 'silver-bell',
    name: 'Silver Bell',
    cover: '/images/projects/silver-bell/cover.jpg',
    part: 'Design Researcher, Application Developer',
    description: 'An exercise app designed for older adults in Hongyeon-gil, Seoul',
    researchQuestion:
      'How can we reduce the burden that elderly people with limited mobility feel when starting exercise through a mobile interface?',
    keyFindings:
      'Field research with 76 participants (34 survey + 42 interviews) identified steep terrain and device unfamiliarity as primary barriers. Notification-first design reduced setup friction; color accessibility tested via color-blindness simulation.',
    residency: 'Total Museum of Contemporary Art',
    created_date: '2024',
    skills: ['AI & Society'] as ProjectSkill[],
    vimeoId: '1165424772',
  },
  {
    slug: 'word-wide-web',
    name: 'Word Wide Web',
    cover: '/images/projects/word-wide-web/cover.gif',
    part: 'Graphic Designer, AI Engineer, Frontend Developer',
    description: 'A word-weaving platform that creates poems through connected synonyms.',
    researchQuestion:
      `Can a community's shared vocabulary become the foundation for a tool that supports poetic expression?`,
    residency: 'SFPC Summer 2024',
    created_date: '2024',
    skills: ['Tool Development', 'Media Art'] as ProjectSkill[],
  },
  {
    slug: 'ganpan',
    name: 'Ganpan',
    cover: '/images/projects/ganpan/cover.jpg',
    part: 'Graphic Designer, Frontend Developer',
    description: 'A Korean typography generation model based on signboard images in South Korea.',
    researchQuestion:
      'How can signage become a playful medium for people to engage with and archive the visual landscape of cities?',
    exhibition: '2024 ATC (Art&Technology Conference)',
    created_date: '2024',
    skills: ['Tool Development', 'AI & Society'] as ProjectSkill[],
    vimeoId: '1165433285',
  },
  {
    slug: 'memeproject',
    name: 'Memeproject',
    cover: '/images/projects/memeproject/cover.jpg',
    part: 'Graphic Designer, Frontend Developer',
    description:
      'An interactive website that explores meme origins, impact, and replication, and helps users create their own memes.',
    researchQuestion:
      'Can the logic of meme replication and evolution be experienced firsthand through interactive participation?',
    exhibition: 'PlanT House, Hongcheon Art Museum',
    created_date: '2023',
    skills: ['Tool Development', 'Media Art'] as ProjectSkill[],
  },
  {
    slug: 'hongyeon-1.0',
    name: 'Hongyeon 1.0',
    cover: '/images/projects/hongyeon-1.0/cover.jpg',
    part: 'AI Engineer, Frontend Developer',
    description:
      'A chatbot blending multigenerational voices from Hongyeon-gil, sharing local stories and culture through AI-driven narrative.',
    researchQuestion:
      'Can AI bridge the generational and cultural divide between long-time residents and newcomers in a rapidly gentrifying neighborhood?',
    residency: 'The Silver Bell Challenge, ten to n gallery',
    created_date: '2023',
    skills: ['AI & Society', 'Media Art'] as ProjectSkill[],
    vimeoId: '911056877',
  },
  {
    slug: 'simulating-1-2-3',
    name: 'Simulating #1,2,3',
    cover: '/images/projects/simulating-1-2-3/cover.jpg',
    part: '3D Artist, Media Facade Developer',
    description: 'Simulating gravity through Unreal Engine.',
    exhibition: 'ACC Media Cube, Gwangju',
    created_date: '2023',
    skills: ['Computer Graphics', 'Media Art'] as ProjectSkill[],
    vimeoId: '833905494',
  },
  {
    slug: 'delta-individualism',
    name: 'delta-individualism',
    cover: '/images/projects/delta-individualism/cover.jpg',
    part: 'AI Engineer, Backend Developer',
    description:
      `Rube Goldberg machine that frames modern society as 'high-entropy,' linking distorted individualism to hatred, discrimination, and isolation, and proposing Tandava as a collective ritual of renewal toward the common good.`,
    researchQuestion: 'How can the concept of entropy explain the social consequences of hyper-individualism?',
    exhibition: '2022 ATC (Art&Technology Conference)',
    funded: ['National Research Foundation (NRF)'],
    created_date: '2022',
    skills: ['Digital Fabrication', 'Media Art'] as ProjectSkill[],
    vimeoId: '1151380515',
  },
  {
    slug: 'singlet-multiplet',
    name: 'Singlet & Multiplet',
    cover: '/images/projects/singlet-multiplet/cover.jpg',
    part: 'Creative Technologist',
    description: 'A media art performance exploring identity and quantum mechanics.',
    researchQuestion: 'Can science offer answers to the confusion the ego feels when existing in multiple states simultaneously?',
    exhibition:
      '8th International New Media Art Exhibition, CICA Museum & Beyond the Lens : Nano Bio Nature, Seoul Institute of the Arts, IBS(Institute for Basic Science)',
    award:
      'First Award, Spin Art Contest 2021, Institute for Basic Science (IBS) & Center for Quantum Nanoscience (QNS)',
    created_date: '2021',
    skills: ['Media Art'] as ProjectSkill[],
  },
  {
    slug: 'draw-the-beat',
    name: 'Draw the Beat!',
    cover: '/images/projects/draw-the-beat/cover.jpg',
    part: 'Creative Technologist',
    description: 'A program that creates music by drawing.',
    researchQuestion: 'Is there a way to make music composition more intuitive and visual?',
    created_in: 'School Project (Creative Algorithms)',
    created_date: '2021',
    skills: ['Tool Development'] as ProjectSkill[],
    vimeoId: '1028274888',
  },
]
