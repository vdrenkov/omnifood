const header = document.querySelector<HTMLElement>(".header")!;
const button = header.querySelector<HTMLButtonElement>(".btn-mobile-nav")!;

function setNavigationOpen(open: boolean) {
  header.classList.toggle("nav-open", open);
  button.setAttribute("aria-expanded", String(open));
  button.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
}

header.dataset.enhanced = "true";
button.hidden = false;

button.addEventListener("click", () => {
  setNavigationOpen(button.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (
    target instanceof Element &&
    (target.closest("a") || !header.contains(target))
  ) {
    setNavigationOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    button.getAttribute("aria-expanded") === "true"
  ) {
    setNavigationOpen(false);
    button.focus();
  }
});

header.addEventListener("focusout", (event) => {
  if (
    event.relatedTarget instanceof Node &&
    !header.contains(event.relatedTarget)
  ) {
    setNavigationOpen(false);
  }
});

window.matchMedia("(max-width: 59em)").addEventListener("change", () => {
  setNavigationOpen(false);
});

document.querySelector<HTMLElement>(".year")!.textContent = String(
  new Date().getFullYear(),
);
