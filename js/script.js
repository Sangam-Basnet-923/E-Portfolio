/* ============================================
   CET138 Full Stack Development ePortfolio
   Sangam Basnet - Computer System Engineering
   JavaScript Functions and Interactivity
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functions
  initNavbar();
  initScrollAnimations();
  initHTMLPreview();
  initEventListeners();
  updateHtmlPreview();
});

// ============================================
// Navbar Functions
// ============================================

function initNavbar() {
  // Change navbar background on scroll
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.getElementById("navbarNav");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 992) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

// ============================================
// Scroll Animations
// ============================================

function initScrollAnimations() {
  const sections = document.querySelectorAll("section");

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((section) => {
    section.classList.add("fade-in-section");
    observer.observe(section);
  });
}

// ============================================
// HTML Preview Function
// ============================================

function initHTMLPreview() {
  const updateBtn = document.getElementById("updateHtml");
  if (updateBtn) {
    updateBtn.addEventListener("click", updateHtmlPreview);
  }

  // Auto-update on input
  const htmlEditor = document.getElementById("htmlEditor");
  if (htmlEditor) {
    htmlEditor.addEventListener("input", updateHtmlPreview);
  }
}

function updateHtmlPreview() {
  const htmlEditor = document.getElementById("htmlEditor");
  const htmlPreview = document.getElementById("htmlPreview");

  if (htmlEditor && htmlPreview) {
    htmlPreview.innerHTML = htmlEditor.value;
  }
}

// ============================================
// Event Listeners
// ============================================

function initEventListeners() {
  // Event demo button
  const eventDemoBtn = document.getElementById("eventDemoBtn");
  if (eventDemoBtn) {
    eventDemoBtn.addEventListener("click", function () {
      alert("Button clicked! This is a JavaScript event.");
    });
  }

  // Hover demo button
  const hoverDemoBtn = document.getElementById("hoverDemoBtn");
  if (hoverDemoBtn) {
    hoverDemoBtn.addEventListener("mouseover", function () {
      this.style.backgroundColor = "#ff6b35";
      this.style.color = "white";
    });

    hoverDemoBtn.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
      this.style.color = "";
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }
}

// ============================================
// JavaScript Demo Functions
// ============================================

// Variables Demo
function demoVariables() {
  const output = document.getElementById("variableOutput");
  let name = "Sangam";
  let age = 20;
  const PI = 3.14159;
  var isActive = true;

  output.innerHTML = `
        <div class="alert alert-info">
            <strong>Variables Demo:</strong><br>
            let name = "${name}"<br>
            let age = ${age}<br>
            const PI = ${PI}<br>
            var isActive = ${isActive}
        </div>
    `;
}

// Functions Demo
function demoFunctions() {
  const output = document.getElementById("functionOutput");

  function greet(name) {
    return "Hello, " + name + "!";
  }

  const add = (a, b) => {
    return a + b;
  };

  output.innerHTML = `
        <div class="alert alert-info">
            <strong>Functions Demo:</strong><br>
            greet("Sangam") = "${greet("Sangam")}"<br>
            add(5, 3) = ${add(5, 3)}
        </div>
    `;
}

// DOM Manipulation Demo
function demoDOM() {
  const text = document.getElementById("domDemoText");
  text.textContent = "Text changed by JavaScript!";
  text.style.color = "#ff6b35";
  text.style.fontWeight = "bold";
}

// Conditionals Demo
function demoConditionals() {
  const ageInput = document.getElementById("ageInput");
  const output = document.getElementById("conditionalOutput");
  const age = parseInt(ageInput.value);

  if (isNaN(age)) {
    output.innerHTML =
      '<div class="alert alert-warning">Please enter a valid age.</div>';
    return;
  }

  let message;
  if (age >= 18) {
    message = "You are an adult.";
  } else {
    message = "You are a minor.";
  }

  output.innerHTML = `
        <div class="alert alert-info">
            <strong>Conditionals Demo:</strong><br>
            Age: ${age}<br>
            Result: ${message}
        </div>
    `;
}

// Loops Demo
function demoLoops() {
  const output = document.getElementById("loopOutput");
  let result = "<strong>For Loop (0-4):</strong><br>";

  for (let i = 0; i < 5; i++) {
    result += i + " ";
  }

  result += "<br><br><strong>While Loop (0-2):</strong><br>";
  let count = 0;
  while (count < 3) {
    result += count + " ";
    count++;
  }

  result += "<br><br><strong>For...of Loop:</strong><br>";
  const colors = ["red", "green", "blue"];
  for (let color of colors) {
    result += color + " ";
  }

  output.innerHTML = `<div class="alert alert-info">${result}</div>`;
}

// ============================================
// Counter App
// ============================================

let counter = 0;

function incrementCounter() {
  counter++;
  updateCounterDisplay();
}

function decrementCounter() {
  counter--;
  updateCounterDisplay();
}

function resetCounter() {
  counter = 0;
  updateCounterDisplay();
}

function updateCounterDisplay() {
  const display = document.getElementById("counterDisplay");
  if (display) {
    display.textContent = counter;

    // Add animation
    display.style.transform = "scale(1.2)";
    setTimeout(() => {
      display.style.transform = "scale(1)";
    }, 200);
  }
}

// ============================================
// Dark Mode Toggle
// ============================================

let darkModeEnabled = false;

function toggleDarkMode() {
  darkModeEnabled = !darkModeEnabled;
  const section = document.getElementById("darkModeSection");
  const btn = document.getElementById("darkModeBtn");
  const text = document.getElementById("darkModeText");

  if (darkModeEnabled) {
    section.classList.add("dark-mode");
    btn.innerHTML = '<i class="fas fa-sun me-2"></i>Disable Dark Mode';
    text.textContent = "Current mode: Dark";
  } else {
    section.classList.remove("dark-mode");
    btn.innerHTML = '<i class="fas fa-moon me-2"></i>Enable Dark Mode';
    text.textContent = "Current mode: Light";
  }
}

// ============================================
// Greeting Generator
// ============================================

function generateGreeting() {
  const nameInput = document.getElementById("nameInput");
  const output = document.getElementById("greetingOutput");
  const name = nameInput.value.trim() || "Guest";

  const hour = new Date().getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  output.textContent = `${greeting}, ${name}! Welcome to my portfolio.`;
}

// ============================================
// Random Quote Generator
// ============================================

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
];

function generateQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quoteAuthor = document.getElementById("quoteAuthor");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `- ${quote.author}`;

  // Add fade animation
  quoteDisplay.style.opacity = "0";
  quoteAuthor.style.opacity = "0";

  setTimeout(() => {
    quoteDisplay.style.opacity = "1";
    quoteAuthor.style.opacity = "1";
  }, 200);
}

// ============================================
// Form Validation
// ============================================

function validateName() {
  const name = document.getElementById("formName").value;
  const error = document.getElementById("nameError");

  if (name.length < 2) {
    error.textContent = "Name must be at least 2 characters.";
    return false;
  } else {
    error.textContent = "";
    return true;
  }
}

function validateEmail() {
  const email = document.getElementById("formEmail").value;
  const error = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    error.textContent = "Please enter a valid email address.";
    return false;
  } else {
    error.textContent = "";
    return true;
  }
}

function validateMessage() {
  const message = document.getElementById("formMessage").value;
  const error = document.getElementById("messageError");

  if (message.length < 10) {
    error.textContent = "Message must be at least 10 characters.";
    return false;
  } else {
    error.textContent = "";
    return true;
  }
}

function validateForm(event) {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    const success = document.getElementById("formSuccess");
    success.textContent = "Form submitted successfully!";
    success.classList.remove("d-none");

    // Reset form after 3 seconds
    setTimeout(() => {
      document.getElementById("validationForm").reset();
      success.classList.add("d-none");
    }, 3000);
  }

  return false;
}

// ============================================
// Contact Form Handler
// ============================================

function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  // Simple validation
  if (name && email && message) {
    const success = document.getElementById("contactSuccess");
    success.classList.remove("d-none");

    // Reset form
    document.getElementById("contactForm").reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      success.classList.add("d-none");
    }, 5000);
  }
}

// ============================================
// Additional Utility Functions
// ============================================

// Typing effect for hero section (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Smooth reveal animation for cards
function revealCards() {
  const cards = document.querySelectorAll(
    ".component-card, .element-card, .css-topic-card, .bootstrap-topic-card, .js-topic-card",
  );

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Initialize card reveal when section is visible
const cardObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealCards();
              cardObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      )
    : null;

// Observe sections with cards
if (cardObserver) {
  document
    .querySelectorAll("#fullstack, #html, #css, #bootstrap, #javascript")
    .forEach((section) => {
      cardObserver.observe(section);
    });
} else {
  revealCards();
}

// ============================================
// Console Welcome Message
// ============================================

console.log(
  "%c Welcome to Sangam Basnet's Portfolio! ",
  "background: #ff6b35; color: white; font-size: 20px; padding: 10px;",
);
console.log(
  "%c CET138 Full Stack Development ePortfolio ",
  "background: #ff8c42; color: white; font-size: 14px; padding: 5px;",
);
console.log("Feel free to explore the code and learn about web development!");
