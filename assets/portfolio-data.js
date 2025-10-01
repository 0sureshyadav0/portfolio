// Centralized Portfolio Data
const PortfolioData = {
  // Personal Information
  personal: {
    name: "Suresh Yadav",
    title: "Full Stack Developer & UI/UX Designer",
    subtitle: "Computer Science Student",
    description: "5+ years of experience in Web Development, Flutter & Dart, Mobile App Development",
    email: "sureshyadav2004@gmail.com",
    phone: "+977 9812345678",
    location: "Kathmandu, Nepal",
    bio: "Passionate developer with expertise in creating innovative mobile and web applications. Currently pursuing Computer Science with a focus on modern technologies and user experience design."
  },

  // Skills
  skills: {
    programming: ["Flutter", "Dart", "JavaScript", "Python", "Java", "C++"],
    web: ["HTML5", "CSS3", "React", "Node.js", "Express", "MongoDB"],
    mobile: ["Flutter", "Android", "iOS", "Cross-platform Development"],
    tools: ["Git", "VS Code", "Android Studio", "Figma", "Adobe XD"],
    databases: ["Firebase", "MongoDB", "MySQL", "SQLite"]
  },

  // Projects
  projects: [
    {
      id: "flybird",
      name: "Fly Bird",
      description: "A Flutter-based mobile game inspired by the classic Flappy Bird, featuring smooth animations and engaging gameplay mechanics.",
      image: "https://github.com/0sureshyadav0/asstets/blob/main/icon_2.png?raw=true",
      technologies: ["Flutter", "Dart", "Game Development"],
      features: ["Smooth Animations", "Score System", "Sound Effects", "High Score Tracking"],
      readme: "https://github.com/0sureshyadav0/flybird/blob/master/README.md",
      demo: "./assets/apps/Fly Bird.apk",
      category: "mobile"
    },
    {
      id: "mausam",
      name: "Mausam",
      description: "Weather application providing real-time weather updates with beautiful UI and location-based forecasts.",
      image: "https://github.com/0sureshyadav0/mausam/blob/master/android/app/src/main/res/drawable/icon.png?raw=true",
      technologies: ["Flutter", "Dart", "API Integration", "Location Services"],
      features: ["Real-time Weather", "Location-based Forecasts", "Beautiful UI", "Offline Support"],
      readme: "https://github.com/0sureshyadav0/mausam/blob/master/README.md",
      demo: "./assets/apps/Mausam.apk",
      category: "mobile"
    },
    {
      id: "nxgen",
      name: "NxGen",
      description: "Next generation mobile application with modern UI/UX design and advanced functionality.",
      image: "https://github.com/0sureshyadav0/asstets/blob/main/nxgen.jpeg?raw=true",
      technologies: ["Flutter", "Dart", "Firebase", "Modern UI"],
      features: ["Modern UI/UX", "Firebase Integration", "Real-time Updates", "User Authentication"],
      readme: "https://github.com/0sureshyadav0/nxgen/blob/master/README.md",
      demo: "./assets/apps/NxGen.apk",
      category: "mobile"
    },
    {
      id: "paalox",
      name: "PaaloX",
      description: "Social networking application with real-time messaging and community features.",
      image: "https://github.com/0sureshyadav0/asstets/blob/main/icon_.png?raw=true",
      technologies: ["Flutter", "Dart", "Firebase", "Real-time Database"],
      features: ["Real-time Messaging", "Community Features", "User Profiles", "Media Sharing"],
      readme: "https://github.com/0sureshyadav0/assets/blob/main/QueueStatusREADME.md",
      demo: "./assets/apps/PaaloX.apk",
      category: "mobile"
    },
    {
      id: "sangeet",
      name: "Sangeet",
      description: "Music streaming application with offline playback and playlist management.",
      image: "https://github.com/0sureshyadav0/sangeet_0.0.1/blob/master/assets/images/icon.png?raw=true",
      technologies: ["Flutter", "Dart", "Audio Processing", "Local Storage"],
      features: ["Music Streaming", "Offline Playback", "Playlist Management", "Audio Controls"],
      readme: "https://github.com/0sureshyadav0/sangeet/blob/master/README.md",
      demo: "./assets/apps/Sangeet.apk",
      category: "mobile"
    },
    {
      id: "techveda",
      name: "TechVeda",
      description: "Educational platform for learning programming and technology concepts.",
      image: "https://github.com/0sureshyadav0/techVeda/blob/master/assets/images/techicon.png?raw=true",
      technologies: ["Flutter", "Dart", "Educational Content", "Progress Tracking"],
      features: ["Educational Content", "Progress Tracking", "Interactive Learning", "Certificates"],
      readme: "https://github.com/0sureshyadav0/techVeda/blob/master/README.md",
      demo: "./assets/apps/TechVeda.apk",
      category: "mobile"
    },
    {
      id: "todo",
      name: "Todo App",
      description: "Simple yet powerful task management application with cloud sync capabilities.",
      image: "https://github.com/0sureshyadav0/todo/blob/master/android/app/src/main/res/drawable/todoicon.jpeg?raw=true",
      technologies: ["Flutter", "Dart", "Cloud Sync", "Task Management"],
      features: ["Task Management", "Cloud Sync", "Categories", "Reminders"],
      readme: "https://github.com/0sureshyadav0/todo/blob/master/README.md",
      demo: "./assets/apps/Todo.apk",
      category: "mobile"
    },
    {
      id: "merocinema",
      name: "मेरो सिनेमा",
      description: "Nepali movie information and booking application with local cinema integration.",
      image: "https://github.com/0sureshyadav0/asstets/blob/main/icon.png?raw=true",
      technologies: ["Flutter", "Dart", "Localization", "Cinema Integration"],
      features: ["Movie Information", "Booking System", "Nepali Language", "Local Cinemas"],
      readme: "https://github.com/0sureshyadav0/assets/blob/main/MEROCINEMA.md",
      demo: "./assets/apps/मेरो सिनेमा.apk",
      category: "mobile"
    }
  ],

  // Packages/Services
  packages: [
    {
      id: "basic",
      name: "Basic Package",
      price: "NPR 15,000",
      duration: "2-3 weeks",
      description: "Perfect for simple mobile applications with basic functionality.",
      features: [
        "Basic UI/UX Design",
        "Core Functionality",
        "Basic Database Integration",
        "App Store Deployment",
        "1 Month Support"
      ],
      technologies: ["Flutter", "Firebase", "Basic UI"],
      suitable_for: "Small businesses, personal projects, MVP development"
    },
    {
      id: "standard",
      name: "Standard Package",
      price: "NPR 35,000",
      duration: "4-6 weeks",
      description: "Comprehensive mobile application with advanced features and integrations.",
      features: [
        "Custom UI/UX Design",
        "Advanced Functionality",
        "Database Integration",
        "API Integration",
        "Push Notifications",
        "App Store Deployment",
        "3 Months Support"
      ],
      technologies: ["Flutter", "Firebase", "APIs", "Custom UI"],
      suitable_for: "Medium businesses, startups, feature-rich applications"
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "NPR 75,000",
      duration: "8-12 weeks",
      description: "Enterprise-level mobile application with full-stack development and advanced features.",
      features: [
        "Premium UI/UX Design",
        "Full-stack Development",
        "Advanced Database Design",
        "Multiple API Integrations",
        "Real-time Features",
        "Admin Panel",
        "Analytics Integration",
        "App Store Deployment",
        "6 Months Support"
      ],
      technologies: ["Flutter", "Node.js", "MongoDB", "Advanced UI", "Real-time"],
      suitable_for: "Large businesses, enterprises, complex applications"
    }
  ],

  // Upcoming Projects
  upcoming: [
    {
      id: "aiassistant",
      name: "AI Assistant App",
      description: "Intelligent personal assistant with natural language processing and machine learning capabilities.",
      technologies: ["Flutter", "AI/ML", "NLP", "Voice Recognition"],
      expected_release: "Q2 2024"
    },
    {
      id: "blockchain",
      name: "Blockchain Wallet",
      description: "Secure cryptocurrency wallet with multi-chain support and DeFi integration.",
      technologies: ["Flutter", "Blockchain", "Web3", "Security"],
      expected_release: "Q3 2024"
    },
    {
      id: "iot",
      name: "IoT Control Hub",
      description: "Mobile application for controlling and monitoring IoT devices with real-time data visualization.",
      technologies: ["Flutter", "IoT", "Real-time", "Data Visualization"],
      expected_release: "Q4 2024"
    }
  ],

  // Experience
  experience: [
    {
      title: "Freelance Mobile Developer",
      company: "Self Employed",
      duration: "2021 - Present",
      description: "Developing mobile applications for various clients using Flutter and modern development practices.",
      achievements: [
        "Completed 20+ mobile applications",
        "Maintained 95% client satisfaction rate",
        "Specialized in cross-platform development"
      ]
    },
    {
      title: "Computer Science Student",
      company: "University",
      duration: "2022 - Present",
      description: "Pursuing Bachelor's degree in Computer Science with focus on software development and system design.",
      achievements: [
        "Maintaining excellent academic performance",
        "Active in programming competitions",
        "Contributing to open source projects"
      ]
    }
  ],

  // Education
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "University",
      duration: "2022 - Present",
      description: "Comprehensive study of computer science fundamentals, software engineering, and modern technologies."
    },
    {
      degree: "Higher Secondary Education",
      institution: "School",
      duration: "2020 - 2022",
      description: "Completed higher secondary education with focus on science and mathematics."
    }
  ],

  // Certifications
  certifications: [
    {
      name: "Flutter Development Certification",
      issuer: "Google",
      date: "2023",
      description: "Certified in Flutter mobile application development"
    },
    {
      name: "Web Development Certification",
      issuer: "Online Platform",
      date: "2022",
      description: "Full-stack web development with modern technologies"
    }
  ],

  // Social Links
  social: {
    github: "https://github.com/sureshyadav2004",
    linkedin: "https://linkedin.com/in/sureshyadav2004",
    twitter: "https://twitter.com/sureshyadav2004",
    instagram: "https://instagram.com/sureshyadav2004"
  },

  // Contact Information
  contact: {
    email: "sureshyadav2004@gmail.com",
    phone: "+977 9812345678",
    address: "Kathmandu, Nepal",
    availability: "Available for freelance projects",
    response_time: "Usually responds within 24 hours"
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioData;
}
