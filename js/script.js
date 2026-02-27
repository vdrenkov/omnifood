if (globalThis.smoothscroll?.polyfill) {
  globalThis.smoothscroll.polyfill();
}

// Set current year
const yearElement = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

// Make mobile navigation work
const btnNavElement = document.querySelector(".btn-mobile-nav");
const headerElement = document.querySelector(".header");
btnNavElement.addEventListener("click", () => {
  const isOpen = headerElement.classList.toggle("nav-open");
  btnNavElement.setAttribute("aria-expanded", String(isOpen));
});

// Smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (!href.startsWith("#")) return;
    event.preventDefault();

    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionElement = document.querySelector(href);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link")) {
      headerElement.classList.remove("nav-open");
      btnNavElement.setAttribute("aria-expanded", "false");
    }
  });
});

// Sticky navigation
const sectionHeroElement = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroElement);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.remove();

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
