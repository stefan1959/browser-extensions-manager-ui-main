let darkTheme = localStorage.getItem("darkTheme");

const themeToggleButton = document.getElementById("theme-toggle");
const allExtensionsButton = document.getElementById("all-extensions");
const activeExtensionsButton = document.getElementById("active-extensions");
const inactiveExtensionsButton = document.getElementById("inactive-extensions");

const enableDarkTheme = () => {
  document.body.classList.add("dark-theme");
  localStorage.setItem("darkTheme", "enabled");
  themeToggleButton.style.backgroundImage =
    "url('/assets/images/icon-sun.svg')";
};

const disableDarkTheme = () => {
  document.body.classList.remove("dark-theme");
  localStorage.setItem("darkTheme", null);
  themeToggleButton.style.backgroundImage =
    "url('/assets/images/icon-moon.svg')";
};

themeToggleButton.addEventListener("click", () => {
  if (darkTheme === "enabled") {
    disableDarkTheme();
    darkTheme = null;
  } else {
    enableDarkTheme();
    darkTheme = "enabled";
  }
});

function filterExtensions(extension) {
  console.log("Filtering by extension:", extension);
  if (extension === "all") {
    allExtensionsButton.classList.add("active");
    activeExtensionsButton.classList.remove("active");
    inactiveExtensionsButton.classList.remove("active");
  } else if (extension === "active") {
    allExtensionsButton.classList.remove("active");
    activeExtensionsButton.classList.add("active");
    inactiveExtensionsButton.classList.remove("active");
    hideNonCheckedElements();
  } else if (extension === "inactive") {
    allExtensionsButton.classList.remove("active");
    activeExtensionsButton.classList.remove("active");
    inactiveExtensionsButton.classList.add("active");
  }
}
function hideNonCheckedElements() {
  const extensions = document.querySelectorAll(".extension");
  extensions.forEach((ext) => {
    const checkbox = ext.querySelector('input[type="checkbox"]');
    if (checkbox && !checkbox.checked) {
      ext.style.display = "none";
    } else {
      ext.style.display = "";
    }
  });
}
function hideCheckedElements() {
  const extensions = document.querySelectorAll(".extension");
  extensions.forEach((ext) => {
    const checkbox = ext.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      ext.style.display = "none";
    } else {
      ext.style.display = "";
    }
  });
}

function showAllExtensions() {
  const extensions = document.querySelectorAll(".extension");
  extensions.forEach((ext) => {
    ext.style.display = "";
  });
}

allExtensionsButton.addEventListener("click", () => {
  filterExtensions("all");
  showAllExtensions();
});

activeExtensionsButton.addEventListener("click", () => {
  filterExtensions("active");
  hideNonCheckedElements();
});

inactiveExtensionsButton.addEventListener("click", () => {
  filterExtensions("inactive");
  hideCheckedElements();
});
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-button")) {
    const extensionElement = event.target.closest(".extension");
    if (extensionElement) {
      extensionElement.remove();
    }
  }
});
