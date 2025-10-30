// Projects Data
const projectsData = [
  {
    id: 1,
    title: "TravelEase Mobile App Redesign",
    category: "mobile",
    description: "Complete UX overhaul for travel booking app",
    challenge: "Redesign a travel booking app to improve user engagement and booking conversion rates",
    solution: "Streamlined booking flow, improved visual hierarchy, and enhanced user onboarding experience",
    outcome: "40% increase in booking completion rate and 25% improvement in user satisfaction",
    tools: ["Figma", "Adobe XD", "Principle"],
    duration: "3 months",
    role: "Lead UI/UX Designer",
    color: "#1FB8CD"
  },
  {
    id: 2,
    title: "FinanceHub Dashboard",
    category: "web",
    description: "Intuitive financial data visualization dashboard",
    challenge: "Create an intuitive dashboard for financial data visualization and management",
    solution: "Clean data visualization, customizable widgets, and responsive design",
    outcome: "Reduced user training time by 60% and increased daily active users by 35%",
    tools: ["Sketch", "InVision", "Principle"],
    duration: "2 months",
    role: "UX/UI Designer",
    color: "#FFC185"
  },
  {
    id: 3,
    title: "EcoShop E-commerce Platform",
    category: "ecommerce",
    description: "Sustainable shopping experience design",
    challenge: "Design sustainable shopping experience with complex product categorization",
    solution: "Intuitive product discovery, sustainability scoring system, and seamless checkout",
    outcome: "20% increase in conversion rate and 45% improvement in user retention",
    tools: ["Figma", "Maze", "Hotjar"],
    duration: "4 months",
    role: "Senior UX Designer",
    color: "#B4413C"
  },
  {
    id: 4,
    title: "MedConnect Telemedicine App",
    category: "mobile",
    description: "Accessible telemedicine for elderly users",
    challenge: "Create accessible telemedicine platform for elderly users",
    solution: "Large typography, simplified navigation, voice assistance integration",
    outcome: "95% user satisfaction score and successful HIPAA compliance",
    tools: ["Adobe XD", "UserTesting", "Miro"],
    duration: "5 months",
    role: "UX Research & Design Lead",
    color: "#5D878F"
  },
  {
    id: 5,
    title: "EduLearn Learning Management System",
    category: "web",
    description: "Engaging learning management system",
    challenge: "Design engaging LMS for K-12 students and teachers",
    solution: "Gamified learning paths, intuitive course creation tools, progress tracking",
    outcome: "30% increase in course completion rates and 50% improvement in teacher adoption",
    tools: ["Figma", "ProtoPie", "Optimal Workshop"],
    duration: "3 months",
    role: "Product Designer",
    color: "#DB4545"
  },
  {
    id: 6,
    title: "SmartHome IoT Control App",
    category: "mobile",
    description: "Unified smart home device control",
    challenge: "Create unified control interface for diverse smart home devices",
    solution: "Centralized dashboard, custom device widgets, automation workflows",
    outcome: "85% user satisfaction and 40% reduction in setup complexity",
    tools: ["Sketch", "Framer", "Zeplin"],
    duration: "2 months",
    role: "UI Designer",
    color: "#D2BA4C"
  }
];

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('hamburger').classList.remove('active');
      }
    });
  });
  
  // Also handle hero buttons
  document.querySelectorAll('.hero-buttons a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Active Navigation Link on Scroll
function initActiveNavigation() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - navbarHeight - 100) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

function initStatCounters() {
  const statValues = document.querySelectorAll('.stat-value');
  let animated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statValues.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          animateCounter(stat, target);
        });
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Render Projects
function renderProjects(filter = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = '';
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  filteredProjects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
      <div class="project-thumbnail" style="background: ${project.color};">
        ${getProjectInitials(project.title)}
        <div class="project-overlay">
          <button class="view-details-btn">View Details</button>
        </div>
      </div>
      <div class="project-content">
        <span class="project-category">${getCategoryLabel(project.category)}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
      </div>
    `;
    
    projectCard.addEventListener('click', () => openProjectModal(project));
    projectsGrid.appendChild(projectCard);
  });
}

function getProjectInitials(title) {
  return title.split(' ').slice(0, 2).map(word => word[0]).join('');
}

function getCategoryLabel(category) {
  const labels = {
    'mobile': 'Mobile App',
    'web': 'Web Application',
    'ecommerce': 'E-commerce'
  };
  return labels[category] || category;
}

// Project Filtering
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter projects
      const filter = button.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

// Project Modal
function openProjectModal(project) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  
  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-thumbnail" style="background: ${project.color};">
        ${getProjectInitials(project.title)}
      </div>
      <h2 class="modal-title">${project.title}</h2>
      <div class="modal-meta">
        <span><strong>Role:</strong> ${project.role}</span>
        <span><strong>Duration:</strong> ${project.duration}</span>
        <span><strong>Category:</strong> ${getCategoryLabel(project.category)}</span>
      </div>
    </div>
    
    <div class="modal-section">
      <h3>Challenge</h3>
      <p>${project.challenge}</p>
    </div>
    
    <div class="modal-section">
      <h3>Solution</h3>
      <p>${project.solution}</p>
    </div>
    
    <div class="modal-section">
      <h3>Outcome</h3>
      <p>${project.outcome}</p>
    </div>
    
    <div class="modal-section">
      <h3>Tools Used</h3>
      <div class="modal-tools">
        ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
      </div>
    </div>
  `;
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

function initProjectModal() {
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  
  modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', closeProjectModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

// Skill Progress Animation
function initSkillsAnimation() {
  const skillItems = document.querySelectorAll('.skill-progress');
  let animated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        skillItems.forEach(skill => {
          const progress = skill.getAttribute('data-progress');
          setTimeout(() => {
            skill.style.width = progress + '%';
          }, 100);
        });
      }
    });
  }, { threshold: 0.3 });
  
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// Contact Form Validation
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
      error.classList.remove('show');
    });
    document.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('error');
    });
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
      showError('nameError', 'Please enter your name');
      name.classList.add('error');
      isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
      showError('emailError', 'Please enter your email');
      email.classList.add('error');
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      showError('emailError', 'Please enter a valid email');
      email.classList.add('error');
      isValid = false;
    }
    
    // Validate subject
    const subject = document.getElementById('subject');
    if (subject.value.trim() === '') {
      showError('subjectError', 'Please enter a subject');
      subject.classList.add('error');
      isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
      showError('messageError', 'Please enter a message');
      message.classList.add('error');
      isValid = false;
    }
    
    if (isValid) {
      // Show success message
      const successMessage = document.getElementById('successMessage');
      successMessage.classList.add('show');
      
      // Reset form
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 5000);
    }
  });
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

// Download Resume Button
function initDownloadResume() {
  const downloadBtn = document.querySelector('.download-btn');
  
  downloadBtn.addEventListener('click', () => {
    alert('Resume download would start here. In production, this would download a PDF file.');
  });
}

// Fade-in Animation on Scroll
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize all functionality
function init() {
  initSmoothScroll();
  initMobileMenu();
  initScrollProgress();
  initActiveNavigation();
  initStatCounters();
  renderProjects();
  initProjectFilters();
  initProjectModal();
  initSkillsAnimation();
  initContactForm();
  initDownloadResume();
  initScrollAnimations();
}

// Run on DOM Content Loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}