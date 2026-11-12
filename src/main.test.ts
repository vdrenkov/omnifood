import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import markup from "../index.html?raw";

let header: HTMLElement;
let button: HTMLButtonElement;
let navigation: HTMLElement;
let form: HTMLFormElement;
let media: EventTarget;

beforeEach(async () => {
  vi.resetModules();
  document.open();
  document.write(markup);
  document.close();
  header = document.querySelector<HTMLElement>(".header")!;
  button = header.querySelector<HTMLButtonElement>("button")!;
  navigation = header.querySelector<HTMLElement>("nav")!;
  form = document.querySelector<HTMLFormElement>("form")!;
  media = new window.EventTarget();
  vi.stubGlobal("matchMedia", () => media);
  await import("./main");
});

afterEach(() => vi.unstubAllGlobals());

describe("navigation", () => {
  it("navigation_toggle_updatesVisibilityAndAccessibleName", () => {
    expect(header.dataset.enhanced).toBe("true");
    expect(button.hidden).toBe(false);
    button.click();
    expect(header.classList.contains("nav-open")).toBe(true);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(button.getAttribute("aria-label")).toBe("Close navigation");
    button.click();
    expect(header.classList.contains("nav-open")).toBe(false);
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.getAttribute("aria-label")).toBe("Open navigation");
  });

  it("navigation_linkChosen_closesMenu", () => {
    button.click();
    const link = navigation.querySelector("a")!;
    link.innerHTML = "<span>How it works</span>";
    link.querySelector("span")!.click();
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("navigation_outsideClick_closesMenu", () => {
    button.click();
    document.querySelector("main")!.click();
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("navigation_insideClick_keepsMenuOpen", () => {
    button.click();
    navigation.click();
    expect(button.getAttribute("aria-expanded")).toBe("true");
  });

  it("navigation_escapeWhileOpen_restoresButtonFocus", () => {
    button.click();
    navigation.querySelector("a")!.focus();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));
    expect(button.getAttribute("aria-expanded")).toBe("true");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button);
  });

  it("navigation_escapeWhileClosed_keepsContentFocus", () => {
    const link = document.querySelector<HTMLAnchorElement>(".hero a")!;
    link.focus();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(document.activeElement).toBe(link);
  });

  it("navigation_focusLeavesHeader_closesMenu", () => {
    button.click();
    navigation.querySelector("a")!.focus();
    document.querySelector<HTMLAnchorElement>(".hero a")!.focus();
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("navigation_breakpointChanges_closesMenu", () => {
    button.click();
    media.dispatchEvent(new Event("change"));
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("navigation_mobileBreakpointWithLinkFocused_movesFocusToButton", () => {
    navigation.querySelector("a")!.focus();

    media.dispatchEvent(Object.assign(new Event("change"), { matches: true }));

    expect(document.activeElement).toBe(button);
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("navigation_desktopBreakpointWithButtonFocused_movesFocusToFirstLink", () => {
    button.focus();

    media.dispatchEvent(Object.assign(new Event("change"), { matches: false }));

    expect(document.activeElement).toBe(navigation.querySelector("a"));
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it.each([true, false])(
    "navigation_breakpointWithContentFocused%s_keepsContentFocus",
    (matches) => {
      const link = document.querySelector<HTMLAnchorElement>(".hero a")!;
      link.focus();

      media.dispatchEvent(Object.assign(new Event("change"), { matches }));

      expect(document.activeElement).toBe(link);
    },
  );
});

it("page_loaded_displaysCurrentYear", () => {
  expect(document.querySelector(".year")!.textContent).toBe(
    String(new Date().getFullYear()),
  );
});

describe("signup", () => {
  it("signup_validDetails_postsNamedFieldsToNetlify", () => {
    fillForm();
    expect(form.method).toBe("post");
    expect(form.getAttribute("action")).toBe("/");
    expect(form.checkValidity()).toBe(true);
    expect(Object.fromEntries(new FormData(form))).toEqual({
      "form-name": "sign-up",
      "full-name": "Test Reviewer",
      email: "reviewer@example.com",
      "select-where": "friends",
    });
  });

  it.each([
    { state: "emptyName", field: "#full-name", value: "" },
    { state: "whitespaceName", field: "#full-name", value: "   " },
    { state: "invalidEmail", field: "#email", value: "invalid-email" },
    { state: "missingSource", field: "#select-where", value: "" },
  ])("signup_$state_rejectsSubmission", ({ field, value }) => {
    fillForm();
    form.querySelector<HTMLInputElement | HTMLSelectElement>(field)!.value =
      value;
    expect(form.checkValidity()).toBe(false);
  });
});

function fillForm() {
  form.querySelector<HTMLInputElement>("#full-name")!.value = "Test Reviewer";
  form.querySelector<HTMLInputElement>("#email")!.value =
    "reviewer@example.com";
  form.querySelector<HTMLSelectElement>("select")!.value = "friends";
}
