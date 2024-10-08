document.addEventListener("DOMContentLoaded", () => {
  const setupSearchLayout = () => {
    const searchBar = document.getElementById("search-bar");
    const searchBtn = document.getElementById("search-submit");
    const arrowKeys = [37, 38, 39, 40];
    let searchValue = searchBar.value;

    searchBar.focus();
    searchBar.select();

    searchBar.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
      } else if (searchBar.value !== searchValue && !arrowKeys.includes(event.keyCode)) {
        searchValue = searchBar.value;
        handleUserInput();
      }
    });
  };

  const setupConfigLayout = () => {
    const collapsible = document.getElementById("config-collapsible");
    const content = collapsible.nextElementSibling;

    collapsible.addEventListener("click", () => {
      collapsible.classList.toggle("active");
      content.style.maxHeight = content.style.maxHeight ? null : "400px";
      content.classList.toggle("open");
    });
  };

  const loadConfig = (event) => {
    event.preventDefault();
    const config = prompt("Enter the name of the config:");
    if (!config) {
      alert("Must specify a name for the config to load");
      return;
    }

    const xhrPUT = new XMLHttpRequest();
    xhrPUT.open("PUT", `config?name=${config}.conf`);
    xhrPUT.onload = function () {
      if (xhrPUT.readyState === 4 && xhrPUT.status !== 200) {
        alert("Error loading Whoogle config");
        return;
      }

      location.reload();
    };

    xhrPUT.send();
  };

  const saveConfig = (event) => {
    event.preventDefault();
    const config = prompt("Enter the name for this config:");
    if (!config) {
      alert("Must specify a name for the config to save");
      return;
    }

    const configForm = document.getElementById("config-form");
    configForm.action = `config?name=${config}.conf`;
    configForm.submit();
  };

  const hideConfig = () => {
    const selector_config = document.getElementById("config-collapsible");
    const content_config = document.getElementById("config-content");

    selector_config.classList.remove("active");
    content_config.classList.remove("open");
    content_config.style.maxHeight = "";
  };

  setTimeout(() => {
    document.getElementById("main").style.display = "block";
  }, 100);

  setupSearchLayout();
  setupConfigLayout();

  document.getElementById("config-load").addEventListener("click", loadConfig);
  document.getElementById("config-save").addEventListener("click", saveConfig);

  document.getElementById("search-bar").addEventListener("focus", hideConfig);

  // Focus on the search input field after the page has loaded completely
  document.getElementById("search-bar").focus();
});
