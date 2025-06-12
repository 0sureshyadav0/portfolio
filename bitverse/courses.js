const courses = [
  {
    title: "C Language",
    description:
      "Clear understanding of C programming fundamentals which includes variables, data types, control structures, functions, and arrays.",
    duration: "1 month (3-4 hr/week)",
    originalPrice: "4,000",
    discountedPrice: "1,499",
    batchNote: "For 1<sup>st</sup> batch",
    image: "./assets/images/c.png",

    allpackages: [
      {
        packageName: "Basics of C Programming",
        content: "Basics of C, syntax, data types, loops, functions and arrays",
        mode: "Recorded or Live",
        duration: "1 month (3-4 hr/week)",
        price: "Rs. 1,000 - Rs, 2,500",
      },
      {
        packageName: "Standard Package (Intermediate)",
        content:
          "All basics, arrays, pointers, file handling and mini projects",
        mode: "Recorded or Live",
        duration: "1.5-2 month ",
        bonus: "PDF notes",
        price: "Rs. 3,000 - Rs, 5,000",
      },
      {
        packageName: "Premium Package (Advanced)",
        content:
          "Full C masters, advanced topics, projects (quiz app, file encryptor)",
        mode: "Recorded or Live",
        duration: "1.5-2 month ",
        bonus: "PDF notes",
        price: "Rs. 3,000 - Rs, 5,000",
      },
    ],
  },
  {
    title: "Python for Beginners",
    description:
      "Learn Python from scratch with real-world examples and live coding sessions. It includes variables, data types, operators, conditions, loops, functions, Basic list/dictionary use.",
    duration: "1 month (12-16 hours total)",
    originalPrice: "5,000",
    discountedPrice: "4,499",
    batchNote: "For 1<sup>st</sup> batch",
    image: "./assets/images/python.jpg",
    allpackages: [
      {
        packageName: "Basics",
        content:
          "Variables, Data Types,Comments, Operators, Control flow, Functions, Data Structures, String Manipulation",
        mode: "Recorded or Live",
        duration: "1 month (3-4 hr/week)",
        price: "Rs. 6,000 - Rs, 12,000",
      },
      {
        packageName: "Standard Package (Intermediate)",
        content:
          "OOP, File Handling, List, Dict, Set, Lambda Functions, Map, Filter, Reduce, Decorators, Generators, Iterators, Exception Handling, DateTime, Regular Expressions",
        mode: "Recorded or Live",
        duration: "1.5-2 month ",
        bonus: "PDF notes",
        price: "Rs. 13,000 - Rs, 20,000",
      },
      // {
      //   packageName: "Premium Package (Advanced)",
      //   content:
      //     "Full C masters, advanced topics, projects (quiz app, file encryptor)",
      //   mode: "Recorded or Live",
      //   duration: "1.5-2 month ",
      //   bonus: "PDF notes",
      //   price: "Rs. 4,500 - Rs, 5,000",
      // },
    ],
  },
  {
    title: "Web Development Bootcamp",
    description:
      "Learn to develop websites. It includes HTML, CSS, Basic JavaScript,(DOM, events, forms)",
    duration: "1-1.5 months (15-20 hours total)",
    originalPrice: "7,000",
    discountedPrice: "4,499",
    batchNote: "For 1<sup>st</sup> batch",
    image: "./assets/images/web_development.jpeg",
    allpackages: [
      {
        packageName: "Basics only HTML",
        content: "HTML tags, elements, attributes and values",
        mode: "Recorded or Live",
        duration: "1 month (3-4 hr/week)",
        price: "Rs. 1,000 - Rs, 3,000",
      },
      {
        packageName: "Standard Package (Intermediate) (HTML & CSS)",
        content:
          "Basics of HTML, CSS, CSS selectors, CSS layout, CSS Flexbox, CSS Grid",
        mode: "Recorded or Live",
        duration: "1-1.5 months ",
        bonus: "PDF notes",
        price: "Rs. 3,000 - Rs, 5,000",
      },
      {
        packageName: "Premium Package (Advanced) (HTML, CSS & JS)",
        content: "HTML & CSS, Basic JavaScript, DOM, events, forms, Projects",
        mode: "Recorded or Live",
        duration: "1.5-2 months ",
        bonus: "PDF notes",
        price: "Rs. 5,000 - Rs, 7,000",
      },
    ],
  },
  {
    title: "App Development - Flutter",
    description:
      "Build beautiful cross-platform mobile apps using Flutter and Dart. Learn widgets, state management, and Firebase integration to create powerful Android and iOS apps.",
    duration: "2-3 months (30-40 hours total)",
    originalPrice: "18,000",
    discountedPrice: "14,999",
    batchNote: "For 1<sup>st</sup> batch",
    image: "./assets/images/app_development.jpg",
    allpackages: [
      {
        packageName: "Basics only programming",
        content: "Basics of dart, OOPs concept",
        mode: "Recorded or Live",
        duration: "1 month (3-4 hr/week)",
        price: "Rs. 8,000 - Rs. 12,000",
      },
      {
        packageName: "Standard Package (Intermediate) (Only UI)",
        content:
          "Dart Basics, Flutter UI components like Scaffold, Row, Column, Center, Container etc",
        mode: "Recorded or Live",
        duration: "1.5-2 month ",
        bonus: "PDF notes",
        price: "Rs. 12,000 - Rs. 16,000",
      },
      {
        packageName:
          "Premium Package (Advanced) (Fully fuctional app with Firebase as backend)",
        content: "Dart, Flutter UI, Firebase as backend, Real life projects",
        mode: "Recorded or Live",
        duration: "2-3 months ",
        bonus: "PDF notes",
        price: "Rs. 16,000 - Rs. 18,000",
      },
    ],
  },
];
