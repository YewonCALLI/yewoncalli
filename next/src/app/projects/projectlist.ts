export type ProjectSkill =
  | 'Creative Tools'
  | 'AI & Fairness'
  | 'Computer Graphics'
  | 'Community-Centered Design'
  | 'Media Art'
  | 'Interaction Design'
  | 'Computational Craft'

export const ALL_SKILLS: ProjectSkill[] = [
  'Creative Tools',
  'AI & Fairness',
  'Computer Graphics',
  'Computational Craft',
  'Community-Centered Design',
  'Interaction Design',
  'Media Art',
]

export const projects = [
  {
    slug: 'typofold',
    name: 'Typofold',
    cover: '/images/projects/typofold/cover.jpg',
    part: 'Tool development, Digital Fabrication',
    description: 'A design tool that converts 3D models into paper crafts',
    award: 'HCI Korea Creative Awards (Excellence Awards) - 2025',
    created_date: '2025',
    skills: ['Creative Tools', 'Computer Graphics', 'Computational Craft'] as ProjectSkill[],
  },
  {
    slug: 'xr-science-museum',
    name: 'XR Science Museum',
    cover: '/images/projects/xr-science-museum/cover.jpg',
    part: 'UX/UI Designer, Frontend Developer',
    description: 'An immersive XR learning platform designed to support conceptual understanding in science education.',
    client: 'MiraeN',
    created_date: '2025',
    skills: ['Creative Tools', 'Computer Graphics'] as ProjectSkill[],
  },
  {
    slug: 'new-formative',
    name: 'Samsung Design Membership 2025 Online Exhibition',
    cover: '/images/projects/new-formative/cover.png',
    part: 'Frontend Developer',
    client: 'Samsung Design Membership',
    created_date: '2025',
    skills: ['Interaction Design'] as ProjectSkill[],
  },
  {
    slug: 'silver-bell',
    name: 'Silver Bell',
    cover: '/images/projects/silver-bell/cover.jpg',
    part: 'Design Researcher, Application Developer',
    description: 'An exercise app designed for older adults in Hongyeon-gil, Seoul',
    residency: 'Total Museum of Contemporary Art',
    created_date: '2024',
    skills: ['Community-Centered Design'] as ProjectSkill[],
  },
  {
    slug: 'word-wide-web',
    name: 'Word Wide Web',
    cover: '/images/projects/word-wide-web/cover.jpg',
    part: 'Graphic Designer, AI Engineer, Frontend Developer',
    description: 'A word-weaving platform that creates poems through connected synonyms.',
    created_in: 'SFPC (School for Poetic Computation)',
    created_date: '2024',
    skills: ['Creative Tools', 'Media Art'] as ProjectSkill[],
  },
  {
    slug: 'ganpan',
    name: 'Ganpan',
    cover: '/images/projects/ganpan/cover.jpg',
    part: 'Graphic Designer, Frontend Developer',
    description: 'A Korean typography generation model based on signboard images in South Korea.',
    exhibition: '2024 ATC (Art&Technology Conference)',
    created_date: '2024',
    skills: ['Creative Tools'] as ProjectSkill[],
  },
  {
    slug: 'memeproject',
    name: 'Memeproject',
    cover: '/images/projects/memeproject/cover.jpg',
    part: 'Graphic Designer, Frontend Developer',
    description:
      'An interactive website that explores meme origins, impact, and replication, and helps users create their own memes.',
    exhibition: 'PlanT House, Hongcheon Art Museum',
    created_date: '2023',
    skills: ['Creative Tools', 'Media Art'] as ProjectSkill[],
  },
  {
    slug: 'hongyeon-1.0',
    name: 'Hongyeon 1.0',
    cover: '/images/projects/hongyeon-1.0/cover.jpg',
    part: 'AI Engineer, Frontend Developer',
    description:
      'A chatbot blending multigenerational voices from Hongyeon-gil, sharing local stories and culture through AI-driven narrative.',
    residency: 'Total Museum of Contemporary Art',
    created_date: '2023',
    skills: ['AI & Fairness', 'Community-Centered Design', 'Media Art'] as ProjectSkill[],
  },
  {
    slug: 'simulating-1-2-3',
    name: 'Simulating #1,2,3',
    cover: '/images/projects/simulating-1-2-3/cover.jpg',
    part: '3D Artist, Media Facade Developer',
    description: 'Simulating gravity through Unreal Engine.',
    exhibition: 'ACC Media Cube, Gwangju',
    created_date: '2023',
    skills: ['Computer Graphics','Media Art'] as ProjectSkill[],
  },
  {
    slug: 'franklin',
    name: 'Franklin',
    cover: '/images/projects/franklin/cover.jpg',
    part: 'AI Engineer, Backend Developer',
    description:
      "A gender-neutral Korean fairy tale generator using AI, addressing social biases in children's literature.",
    award: 'HCI Korea 2022',
    created_date: '2022',
    skills: ['AI & Fairness'] as ProjectSkill[],
  },
  {
    slug: 'singlet-multiplet',
    name: 'Singlet & Multiplet',
    cover: '/images/projects/singlet-multiplet/cover.jpg',
    part: 'Creative Technologist',
    description: 'A media art performance exploring identity and quantum mechanics.',
    award:
      '8th International New Media Art Exhibition, CICA Museum Beyond the Lens : Nano Bio Nature, Seoul Institute of the Arts, IBS(Institute for Basic Science)',
    created_date: '2021',
    skills: ['Media Art'] as ProjectSkill[],
  },
  {
    slug: 'draw-the-beat',
    name: 'Draw the Beat!',
    cover: '/images/projects/draw-the-beat/cover.jpg',
    part: 'Creative Technologist',
    description: 'A program that creates music by drawing.',
    created_in: 'School Project (Creative Algorithms)',
    created_date: '2021',
    skills: ['Creative Tools', 'Computational Craft'] as ProjectSkill[],
  },
]
