const userDetails = {
  name: "Suresh Yadav",
  designation: "Full Stack Developer",
  description:
    "Computer Science undergraduate with 2+ years of experience in Web Development, Flutter, Dart & C  as well as in Android and iOS development. I can provide you with application & web development using Flutter framework. As I am mostly a self-learner, I can easily adapt to new things and always ready to take on a challenge. <br> Click <a href='https://sureshyadav.info.np/' >here</a> for more info",
  picture: {
    src: "suresh.jpg",
    link: "https://github.com/0sureshyadav0",
  },
  links: [
    {
      icon: "fa fa-envelope-open",
      tooltip: "Send mail",
      label: "sureshyadav_np@outlook.com",
      link: "mailto:sureshyadav_np@outlook.com?subject=Job%20offer",
    },
    {
      icon: "fa fa-map-marker-alt",
      tooltip: "View in maps",
      label: "Dang, Nepal",
      link: "https://goo.gl/maps/srwPcAxy5S32",
    },
    {
      icon: "fa fa-mobile-alt",
      tooltip: "Call",
      label: "+977-9829552758",
      link: "tel:+922-9829552758",
    },
    {
      icon: "fa fa-globe",
      tooltip: "Visit",
      label: "www.sureshyadav.info.np",
      link: "https://www.sureshyadav.info.np",
    },
  ],
  sns: [
    {
      icon: "fab fa-github",
      tooltip: "Github",
      link: "https://github.com/0sureshyadav0",
    },
    {
      icon: "fab fa-stack-overflow",
      tooltip: "Stack Overflow",
      link: "https://stackoverflow.com/users/20845494/suresh-yadav",
    },
    {
      icon: "fab fa-linkedin",
      tooltip: "LinkedIn",
      link: "https://www.linkedin.com/in/0sureshyadav0/",
    },
    {
      icon: "fab fa-quora",
      tooltip: "Quora",
      link: "https://www.quora.com/profile/Suresh-Yadav-2725",
    },
  ],
  qrCode: "qr-code.png",
};

const skills = [
  {
    icon: "<div class='flutter-icon'></div>",
    title: "Flutter",
    scale: 5,
    tech: ["Dart", "pub", "Firebase", "Provider", "GetX"],
    lib: ["BLoC", "Scoped Model"],
  },
  {
    icon: "fab fa-android",
    title: "Android",
    scale: 3,
    tech: ["JAVA"],
    lib: [
      "Kotlin",
      "XML",
      "Gradle",
      "RxJava",
      "Room",
      "Dagger",
      "LiveData",
      "Retrofit",
      "Firebase",
    ],
  },
  {
    icon: "fab fa-apple",
    title: "iOS",
    scale: 3,
    tech: ["Firebase"],
    lib: ["Swift", "Cocoapod", "Alamofire", "SQLite.swift"],
  },

  {
    icon: "fa fa-globe",
    title: "Web",
    scale: 5,
    tech: ["HTML", "CSS", "JavaScript"],
    lib: ["jQuery", "Bootstrap", "UIKit"],
  },
  // {
  //   icon: "fab fa-js",
  //   title: "JavaScript Frameworks",
  //   scale: 5,
  //   tech: [],
  //   lib: [
  //     "Vue.js",
  //     "Angular",
  //     "AngularJS",
  //     "Meteor",
  //     "Svelte",
  //     "jQuery",
  //     "Express.js",
  //     "Next.js",
  //     "Gatsby",
  //   ],
  // },
  {
    icon: "fab fa-react",
    title: "ReactJS",
    scale: 5,
    tech: ["JavaScript"],
    lib: ["TypeScript", "npm", "Redux", "FCM", "AntD"],
  },
  {
    icon: "fa fa-database",
    title: "Databases",
    scale: 4,
    tech: ["MySql"],
    lib: ["MongoDB", "PostGIS", "PostgreSQL", "SQLite", "Redis"],
  },
  {
    icon: "fab fa-git-alt",
    title: "Version Control",
    scale: 5,
    tech: ["Git"],
    lib: ["Mercurial"],
  },

  {
    icon: "fa fa-code",
    title: "Other Languages & Frameworks",
    scale: 3,
    tech: ["C", "JAVA"],
    lib: ["C++", "ASP.NET", "Lucene Elastic Search", "Rust", "C#.NET"],
  },
  {
    icon: "fa fa-code",
    title: "IDE",
    scale: 5,
    tech: ["VsCode", "DevC++", "Sublime Text"],
    lib: ["NetBeans", "Eclipse", "IntelliJ IDEA", "PyCharm", "Xcode"],
  },
];

const languages = [
  {
    icon: "A",
    name: "English",
    scale: 5,
    proficiency: "Full Professional Proficiency",
  },
  {
    icon: "&#x0905;",
    name: "Hindi",
    scale: 5,
    proficiency: "Full Professional Proficiency",
  },
  {
    icon: "&#x0905;",
    name: "Nepali",
    scale: 5,
    proficiency: "Native or Bilingual Proficiency",
  },
];

const interests = [
  {
    icon: "fa fa-football",
    title: "Basketball",
  },
  {
    icon: "fa fa-running",
    title: "Jogging",
  },
  {
    icon: "fas fa-plane-departure",
    title: "Travelling",
  },
];

const personal = [
  {
    icon: "fa fa-birthday-cake",
    label: "Born",
    value: "Oct 17, 2002",
  },
  {
    icon: "fa fa-user",
    label: "Father's Name",
    value: "Surendra Yadav",
  },
  {
    icon: "fa fa-language",
    label: "Nationality",
    value: "Nepali",
  },
  {
    icon: "fa fa-heart",
    label: "Marital Status",
    value: "Single",
  },
];

const experiences = [
  {
    position: "",
    company: "",
    duration: "",
    tech: [],
    achievements: [],
  },
];

const education = [
  {
    board: "National Education Board (NEB)",
    school: "Gorkha Model Sec. School, Lamahi-Nepal",
    concentration: "School Leaving Certificate (SLC) 10+2 (Science - PCM)",
    percentage: "GPA: 3.31/4",
    duration: "Apr 2020  - Mar 2022",
    achievements: [],
  },
  {
    board: "Private And Boarding School Organization of Nepal (PABSON)",
    school: "Buddha Jyoti HSS/Gadhawa, Nepal",
    concentration: "Secondary Education Examination (SEE)",
    percentage: "GPA: 3.95/4",
    duration: "Apr 2018 - Mar 2020",
    achievements: [],
    printBreak: true,
  },
  {
    board: "Basic Level Education (BLE)",
    school: "Buddha Jyoti Sec. School, Gadhawa-Nepal",
    concentration: "Grade - 8",
    percentage: "Grade: A+",
    duration: "Apr 2008 - Mar 2018",
    achievements: [],
  },
];

// const personalProjects = [
//   {
//     // (कृषि संस्था)
//     name: "Agricultural Organization ",
//     description:
//       "This product belongs to private agriculture organization which manages records of its members including their income.",
//     duration: "2022",
//     tech: ["Flutter", "Dart"],
//     refs: [
//       {
//         icon: "fa fa-link",
//         tooltip: "Check it out",
//         url: "#",
//       },
//     ],
//   },
//   {
//     name: "Bazaar",
//     description: "Upcoming project",
//     duration: "2023",
//     tech: ["Flutter", "Dart"],
//     refs: [
//       {
//         icon: "fa fa-link",
//         tooltip: "Check it out",
//         url: "#",
//       },
//     ],
//   },
// ];

const companyProjects = [
  {
    name: "Appazon",
    description:
      "A privately held startup software company headquarted in Nepal that develops and markets website building toos, mobile applications and web applications.",
    duration: "2022",
    tech: ["Flutter", "Dart"],
    refs: [
      {
        icon: "fa fa-link",
        tooltip: "Check it out",
        url: "https://www.mediafire.com/file/6hkn0jwzslxir1b/Appazon.apk/file",
      },
    ],
  },
];
const personalProjects = [
  {
    name: "Sangeet",
    description: "A music app",
    duration: "2024",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/todo/blob/master/android/app/src/main/res/drawable/todoicon.jpeg?raw=true",
    refs: [
      {
        // icon: "fa fa-link",
        link: "fa fa-link",
        // icon: "https://github.com/0sureshyadav0/sangeet_0.0.1/blob/master/assets/images/icon.png?raw=true",
        tooltip: "Check it out",
        url: "https://www.mediafire.com/file/dobsb1afa1dm0ui/Sangeet.apk/file",
      },
    ],
  },
  {
    name: "Todo",
    description: "A task tracker app",
    duration: "2024",
    icon: "https://github.com/0sureshyadav0/todo/blob/master/android/app/src/main/res/drawable/todoicon.jpeg?raw=true",
    tech: ["Flutter", "Dart"],
    refs: [
      {
        link: "fa fa-link",
        tooltip: "Check it out",
        url: "https://www.mediafire.com/file/h6yxm234dgdu8ev/Todo.apk/file",
      },
    ],
  },
  {
    name: "Mausam",
    duration: "2024",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/mausam/blob/master/android/app/src/main/res/drawable/icon.png?raw=true",
    description: "A weather app",
    refs: [
      {
        link: "fa fa-link",
        icon: "https://github.com/0sureshyadav0/mausam/blob/master/android/app/src/main/res/drawable/icon.png?raw=true",
        tooltip: "Check it out",
        url: "https://www.mediafire.com/file/baikeqv9988nw30/Mausam.apk/file",
      },
    ],
  },
  {
    name: "Fly Bird",
    duration: "2025",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/asstets/blob/main/icon.png?raw=true",
    ion: "An AI email generator\napp based on subject",
    // 'url': 'https://github.com/0sureshyadav0/mausam/tree/master',
    description: "A email generator app",
    refs: [
      {
        link: "fa fa-link",
        tooltip: "Check it out",
        url: "https://www.mediafire.com/file/jsdyuwvl08rppbb/Fly_Bird.apk/file",
      },
    ],
  },
];
