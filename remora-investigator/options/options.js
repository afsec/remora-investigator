let page = document.getElementById("buttonDiv")
let selectedClassName = "current"
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"]

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName)
  }

  // Mark the button as selected
  const color = event.target.dataset.color
  event.target.classList.add(selectedClassName)
  console.log("handleButtonClick(): Setting color=", color)
  browser.storage.local.set({
    "global_config": {
      color
    }
  })
  if (color === "#4688f1") {
    browser.action.setIcon({ path: '/icons/RemoraLogo1.png' })
  } else if (color === "#3aa757") {
    browser.action.setIcon({ path: '/icons/RemoraLogo2.png' })
  } else {
    browser.action.setIcon({ path: '/icons/RemoraLogo0.png' })
  }
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  browser.storage.local.get("global_config", (data) => {
    const currentColor = Object.keys(data.global_config).length > 0 ? data.global_config["color"] : null
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button")
      button.innerHTML = `${buttonColor}`
      button.dataset.color = buttonColor
      button.style.backgroundColor = buttonColor

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName)
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick)
      page.appendChild(button)
    }
  })
}

// Initialize the page by constructing the color options
constructOptions(presetButtonColors)
