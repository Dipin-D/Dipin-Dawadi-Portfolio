export const siteData = {
  site: {
    name: "Dipin Dawadi",
    title: "Dipin Dawadi | Portfolio",
    description:
      "Portfolio of Dipin Dawadi, a computer science graduate focused on software engineering, data, ERP consulting, and product-minded technical work.",
    emailFormAction: "https://formspree.io/f/mqaqzayy",
    email: "dipindawadi@gmail.com",
    availability: "Open to software engineering, data, ERP, and consulting roles",
    location: "Huntsville, Alabama",
    heroImage: "assets/hero-portrait-v2.png",
    socialLinks: [
      { label: "GitHub", href: "https://github.com/Dipin-D" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/dipin-dawadi/" },
    ],
  },
  profile: {
    headline: "I build software and data solutions.",
    summary:
      "Computer Science graduate building reliable products, with hands-on experience improving ERP workflows.",
    focusAreas: [
      "Python, Django, JavaScript, SQL, and C++",
      "SAP S/4HANA, SAP GRC, and process improvement",
      "Dashboards, analytics, and automation",
    ],
  },
  highlights: {
    honors: ["Salutatorian", "Presidential Scholarship Recipient", "Gold Presidential Medallion", "Honor Roll"],
    languages: ["Nepali — Native or bilingual", "Hindi — Professional working", "English — Full professional"],
  },
  education: {
    school: "Alabama A&M University",
    degree: "Bachelor of Science in Computer Science",
    period: "2022 - 2026",
    location: "Huntsville, Alabama",
    distinction: "Graduated with a 4.0/4.0 GPA",
  },
  stats: [
    { value: "1,500+", label: "wireless certification tests run" },
    { value: "500+", label: "students supported by CMS rollout scope" },
    { value: "Top 10", label: "finish in HBCU app pitch competition" },
    { value: "4.0", label: "graduating GPA at Alabama A&M" },
  ],
  skillGroups: [
    {
      title: "Engineering",
      items: ["Python", "Django", "Java", "C++", "JavaScript", "Flask", "AWS"],
    },
    {
      title: "Data",
      items: ["SQL", "Pandas", "Power BI", "Tableau", "Crystal Reports", "Machine Learning", "Analytics"],
    },
    {
      title: "Enterprise",
      items: ["SAP S/4HANA", "SAP BusinessObjects", "SAP GRC", "BAAN", "Process Automation"],
    },
    {
      title: "Delivery",
      items: ["Technical Consulting", "Presentation Design", "Testing", "Cross-functional Collaboration"],
    },
  ],
  projects: [
    {
      title: "Minority Business Discovery App",
      tag: "Product + Pitch",
      image: "assets/images/app_pitch_competition.gif",
      period: "Apr 2025",
      location: "Montgomery, Alabama",
      summary:
        "Co-developed and pitched a mobile app concept focused on improving visibility for Black and minority-owned businesses through discovery, registration, and AI-guided support.",
      highlights: [
        "Selected as a Top 10 team in The Alabama Collective's HBCU App Build Pitch Competition",
        "Designed features for business discovery, onboarding, and owner support",
        "Strengthened UI/UX, product thinking, and presentation skills in a live competition setting",
      ],
      links: [],
      featured: true,
    },
    {
      title: "Customer Churn Insights & Prediction",
      tag: "Data Science",
      image: "assets/images/customer.PNG",
      period: "2024",
      location: "Python + Tableau",
      summary:
        "Analyzed customer behavior data with Python, SQL, and Tableau to surface churn trends and shape a prediction workflow.",
      highlights: [
        "Preprocessed customer data for exploratory analysis and modeling",
        "Built an interactive dashboard to reveal churn by demographics and subscription type",
        "Combined Python notebooks with business-facing visual storytelling",
      ],
      links: [
        {
          label: "Google Colab",
          href: "https://colab.research.google.com/drive/1uWmTdQJ_yqp1psutvNQEsxEvJgUFbS8E?usp=sharing",
        },
      ],
      featured: true,
    },
    {
      title: "Stock Portfolio Tracker",
      tag: "Software + Analytics",
      image: "assets/images/portfolio.PNG",
      period: "Ongoing",
      location: "Python project",
      summary:
        "Built a portfolio tracker that combines Python data tooling and visualization to help users monitor positions and evaluate investment performance.",
      highlights: [
        "Integrated market data into a personal finance workflow",
        "Used Pandas, NumPy, and Matplotlib for analysis and reporting",
        "Extended the project with dashboard-based portfolio visualization",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Dipin-D/Stock-Portfolio-Tracker",
        },
      ],
      featured: true,
    },
    {
      title: "Snake Game by Dipin",
      tag: "Game Development",
      image: "",
      period: "2024",
      location: "Pygame",
      summary: "Created a desktop snake game in Python and Pygame as a hands-on OOP project.",
      highlights: [
        "Applied OOP concepts in a fun interactive project",
        "Implemented game loops, collision handling, and player feedback",
        "Used game development to sharpen Python fundamentals",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/Dipin-D/Snake-Game-by-Dipin",
        },
      ],
      featured: false,
    },
  ],
  experiences: [
    {
      title: "SAP IT Intern",
      organization: "EnerSys",
      period: "Aug 2025 - May 2026",
      location: "Remote",
      image: "assets/images/enersys1.jpg",
      summary:
        "Advanced enterprise reporting and SAP modernization work using Crystal Reports, SQL, SAP BusinessObjects, and SAP GRC.",
      highlights: [
        "Reverse-engineered Crystal Reports dependencies and used SQL to extract non-exposed report metadata",
        "Developed business-aligned reports and supported migration from Crystal Reports to SAP BusinessObjects",
        "Supported ME ticket-routing automation and SAP GRC audit and compliance efforts",
      ],
      featured: true,
      links: [],
    },
    {
      title: "SAP IT Intern",
      organization: "EnerSys",
      period: "Jun 2025 - Aug 2025",
      location: "Remote",
      image: "assets/images/enersys2.jpg",
      summary:
        "Supported BAAN auditing and collaborated on an internal cross-functional innovation challenge.",
      highlights: [
        "Partnered with developers to design an automated BAAN auditing process",
        "Helped streamline compliance and oversight activities",
        "Generated and pitched a product concept in a Shark Tank-style challenge",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Event Technology & Engagement Programs Lead",
      organization: "Google Developers Group",
      period: "Aug 2025 - Apr 2026",
      location: "Alabama A&M University",
      image: "assets/images/google.jfif",
      summary:
        "Led event technology and engagement programming for the Google Developers Group chapter at Alabama A&M University.",
      highlights: [
        "Coordinated technology-focused events and student engagement",
        "Supported developer community programming on campus",
        "Connected students with collaborative technical learning opportunities",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Undergraduate Software Researcher - CMS & AWS Integration",
      organization: "Alabama A&M University",
      period: "Sep 2024 - May 2025",
      location: "Hybrid",
      image: "assets/images/cms_login.png",
      summary:
        "Helped build and launch a CMS platform using Python, JavaScript, AWS EC2, PostgreSQL RDS, and S3 for a student-facing university workflow.",
      highlights: [
        "Shipped a platform expected to support more than 500 students per semester",
        "Worked across application logic, cloud hosting, database setup, and file storage",
        "Contributed to a system intended to generate data for future machine learning work",
      ],
      featured: true,
      links: [
        { label: "GitHub", href: "https://github.com/Dipin-D/SMRT-CMS" },
        { label: "Live site", href: "https://www.aamusmartcms.com" },
      ],
    },
    {
      title: "Wireless Engineering Intern",
      organization: "UL Solutions",
      period: "May 2024 - Jul 2024",
      location: "On-site",
      image: "assets/images/UL.jpg",
      summary:
        "Executed automated SAR testing workflows and Python-based antenna configuration support for wireless devices pursuing certification.",
      highlights: [
        "Ran more than 1,500 automated tests using DASY6 robots",
        "Captured and analyzed safety data for FCC and ICC certification workflows",
        "Configured antennas across multiple devices with Python scripts and command-line tooling",
      ],
      featured: true,
      links: [],
    },
    {
      title: "Deloitte Technology Consulting Course",
      organization: "Deloitte",
      period: "Jan 2025 - Apr 2025",
      location: "Semester program",
      image: "assets/images/deloitte_course.PNG",
      summary:
        "Worked through ERP consulting case studies centered on SAP S/4HANA implementation strategy, cost-benefit analysis, and executive presentations.",
      highlights: [
        "Practiced consulting-style problem framing and recommendations",
        "Learned ERP implementation tradeoffs from Deloitte professionals",
        "Presented findings to senior leaders and managing directors",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Data Science Competition Scholar",
      organization: "FICO",
      period: "Jan 2025 - Apr 2025",
      location: "Huntsville, Alabama",
      image: "assets/images/FICO.jfif",
      summary:
        "Built predictive thinking around fraud detection through data cleaning, modeling, and mentor-guided competition work.",
      highlights: [
        "Applied machine learning techniques in a semester-long challenge",
        "Collaborated with mentors to refine predictive models",
        "Improved confidence in experimentation and model evaluation",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Student Fellow",
      organization: "Propel2Excel",
      period: "Nov 2024 - Present",
      location: "Career development program",
      image: "assets/images/student_fellow.jfif",
      summary:
        "Participated in a program focused on improving access for students from non-target schools to top-tier career opportunities.",
      highlights: [
        "Strengthened professional development and interview readiness",
        "Engaged with mentorship and peer networking opportunities",
        "Built stronger positioning for consulting and technology roles",
      ],
      featured: false,
      links: [],
    },
    {
      title: "National Retail Federation 2025 Conference",
      organization: "NRF",
      period: "2025",
      location: "Conference experience",
      image: "assets/images/NRF.jfif",
      summary:
        "Explored retail technology, supply chain innovation, and AI through conference sessions, networking, and a career fair.",
      highlights: [
        "Learned from industry speakers about technology in retail",
        "Connected with mentors across consulting, banking, and retail brands",
        "Expanded perspective on how AI is reshaping operational strategy",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Computer Science Teaching Assistant",
      organization: "Alabama A&M University",
      period: "Feb 2023 - Apr 2024",
      location: "Campus",
      image: "assets/images/tan.png",
      summary:
        "Mentored students in programming and quantitative coursework, building individualized lesson plans that improved performance and confidence.",
      highlights: [
        "Helped students improve by roughly a full letter grade on average",
        "Taught Python programming and structured problem solving",
        "Created targeted lesson plans based on student gaps",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Student Research Assistant",
      organization: "Alabama A&M University",
      period: "Oct 2022 - May 2023",
      location: "Research lab",
      image: "assets/images/lab.jfif",
      summary:
        "Supported research related to nuclear security and nonproliferation through controlled crystal preservation and growth experiments.",
      highlights: [
        "Worked with glove box environmental chamber processes",
        "Helped produce Cesium Hafnium Chloride crystals using the Bridgman technique",
        "Contributed to materials research with safety and security implications",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Google Tech Immersion Scholar",
      organization: "Google",
      period: "Aug 2023",
      location: "Remote",
      image: "assets/images/google.jfif",
      summary:
        "Completed a software-engineering-focused immersion program that included technical workshops, mock interviews, and product exposure.",
      highlights: [
        "Practiced modern software engineering concepts",
        "Explored Google's product ecosystem and role pathways",
        "Grew technical communication and interviewing skills",
      ],
      featured: false,
      links: [],
    },
    {
      title: "IAM Intern",
      organization: "Research Data and Communication Technologies Corp.",
      period: "Sep 2023 - Dec 2023",
      location: "Remote",
      image: "assets/images/RDCT.PNG",
      summary:
        "Built a Flask application backed by MySQL and Docker, gaining hands-on experience with containerized deployment workflows.",
      highlights: [
        "Developed a web application with Flask and MySQL",
        "Used Docker Compose and deployment-oriented tooling",
        "Deepened full-stack and DevOps fundamentals",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Alcon R&D Extern",
      organization: "Alcon",
      period: "Aug 2023",
      location: "Fort Worth, Texas",
      image: "assets/images/alcon.jfif",
      summary:
        "Worked with teams during a Whale Tank-style innovation experience and learned more about research, product development, and healthcare R&D culture.",
      highlights: [
        "Participated in collaborative innovation exercises",
        "Learned how research and product teams evaluate ideas",
        "Expanded understanding of healthcare product development",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Activision x HBCU In LA",
      organization: "Activision",
      period: "Jul 2023 - Aug 2023",
      location: "Remote",
      image: "",
      summary:
        "Completed a skills-based prep program for gaming industry opportunities with emphasis on assessments, coding practice, and C++ readiness.",
      highlights: [
        "Prepared for technical assessments such as HackerRank",
        "Focused on C++ and gaming-adjacent problem solving",
        "Learned more about roles and pathways in the gaming industry",
      ],
      featured: false,
      links: [],
    },
    {
      title: "Student Mentor",
      organization: "Himalayan High Flyers",
      period: "Nov 2021 - Mar 2022",
      location: "Narayani, Nepal",
      image: "",
      summary:
        "Guided high school students through STEM activities, taught foundational flight concepts, and supported a hands-on RC plane learning program.",
      highlights: [
        "Mentored students across a seven-week STEM program",
        "Taught basic physics concepts through practical activities",
        "Built leadership and education experience early in my journey",
      ],
      featured: false,
      links: [],
    },
  ],
  certifications: [
    {
      title: "Socially Just Coding: Develop in Swift Explorations Pt. 1",
      issuer: "Propel Center",
      href: "https://www.linkedin.com/in/dipin-dawadi/",
    },
    {
      title: "Enterprise Design Thinking Practitioner",
      issuer: "IBM",
      href: "https://www.linkedin.com/in/dipin-dawadi/",
    },
    {
      title: "Getting Started with Artificial Intelligence",
      issuer: "IBM",
      href: "https://www.linkedin.com/in/dipin-dawadi/",
    },
    {
      title: "FICO Data Analytics Challenge Certificate",
      issuer: "FICO",
      href: "https://www.linkedin.com/in/dipin-dawadi/",
    },
    {
      title: "Accelerating SAP Project Delivery Using SAP Joule for Consultants",
      issuer: "SAP",
      href: "https://badger.learning.sap.com/verify/xubev-gyced-kagag-nasin-befyd",
    },
    {
      title: "How Does AI/ML Impact Culture?",
      issuer: "Propel Center",
      href: "https://certificate.propelcenter.org/bb1543e2-6b61-49fe-a8c1-e402ce4130c7#acc.MN50j6JU",
    },
    {
      title: "Python",
      issuer: "HackerRank",
      href: "https://www.hackerrank.com/certificates/iframe/3ff3457195a4",
    },
    {
      title: "Cybersecurity 101",
      issuer: "CodePath",
      href: "https://www.linkedin.com/posts/dipin-dawadi_certificate-of-completion-activity-7062963649803423744-30ah",
    },
    {
      title: "SQL (Intermediate)",
      issuer: "HackerRank",
      href: "https://www.hackerrank.com/certificates/2a9105be80c1",
    },
    {
      title: "Mind Over Money Skills Financial Literacy",
      issuer: "Credly",
      href: "https://www.credly.com/badges/4102e608-8a36-4e91-9776-768b3ccf490d/linked_in_profile",
    },
  ],
};
