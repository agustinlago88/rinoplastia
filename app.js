const menuToggle = document.querySelector("[data-menu-toggle]");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Abrir menú");
    }
  });
});

// Close mobile menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
    document.body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Abrir menú");
    }
  }
});

// Scrollspy for active navigation links
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollPosition = window.pageYOffset + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    if (current && link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    } else if (current) {
      link.classList.remove("active");
    }
  });
}, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// FAQ Accordion Toggle
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");
    const isActive = item.classList.contains("active");

    // Close other FAQ items (accordion behavior)
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      }
    });

    item.classList.toggle("active");
    const answer = item.querySelector(".faq-answer");
    if (answer) {
      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    }
  });
});
