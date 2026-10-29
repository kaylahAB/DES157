(function () {
  "use strict";

  const form = document.querySelector("form");
  const textBoxes = document.querySelectorAll('input[type="text"]');
  const alertBox = document.querySelector("#alert");

  const storyScreen = document.querySelector("#revelation");
  const storyHeading = document.querySelector("#revelation h1");
  const storySummary = document.querySelectorAll("#revelation > p")[1];
  const storyTitle = document.querySelector("#revelation h2");
  const storyText = document.querySelectorAll("#revelation article p")[1];
  const amendButton = document.querySelector("#revelation > button");

  const groups = [
    ["beginning", "Choose Your Beginning"],
    ["archetype", "Choose Your Tragic Archetype"],
    ["manner", "Choose the Manner of Your Account"]
  ];

  /* Helpers */
  function escapeHTML(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function gold(word) {
    return "<strong>" + escapeHTML(word) + "</strong>";
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function value(id) {
    return document.querySelector("#" + id).value.trim();
  }

  function showAlert(message) {
    alertBox.textContent = message;
    alertBox.hidden = false;
    alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* Validation */
  function findProblem() {
    for (let i = 0; i < groups.length; i++) {
      if (!document.querySelector('input[name="' + groups[i][0] + '"]:checked')) {
        showAlert("The scribe awaits: please make a choice under \u201C" + groups[i][1] + ".\u201D");
        return true;
      }
    }
    for (let i = 0; i < textBoxes.length; i++) {
      if (textBoxes[i].value.trim() === "") {
        showAlert("The scribe awaits: please fill in \u201C" + textBoxes[i].previousElementSibling.textContent + ".\u201D");
        textBoxes[i].focus();
        return true;
      }
    }
    return false;
  }

  /* Events */
  form.addEventListener("input", function () {
    alertBox.hidden = true;
  });

  amendButton.addEventListener("click", function () {
    storyScreen.classList.remove("show");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (findProblem()) {
      return;
    }
    alertBox.hidden = true;

    const beginning = document.querySelector('input[name="beginning"]:checked').value;
    const archetypeInput = document.querySelector('input[name="archetype"]:checked');
    const archetypeName = archetypeInput.nextElementSibling.textContent;
    const manner = document.querySelector('input[name="manner"]:checked').value;

    const playerName = value("your-name");
    const name = gold(playerName);
    const place = gold(value("place"));
    const verb = gold(value("past-verb"));
    const noun = gold(value("noun"));
    const adjective = gold(value("adjective"));
    const weapon = gold(value("weapon"));
    const creature = gold(value("creature"));
    const creatureStart = gold(capitalize(value("creature")));
    const god = gold(value("outer-god"));
    const command = gold(capitalize(value("command")));
    const sad = gold(value("sad-word"));

    const beginningGold = gold(beginning);
    const epithetGold = gold(archetypeInput.value);

    let story = "";
    let mannerName = "";

    if (manner === "origin") {
      mannerName = "Chronicle of Origin";
      story = "Hearken to the account of " + name + ", whom the sealed annals name the " + epithetGold + ". " +
        "They were not born to legend, but lived once as a " + beginningGold + " of " + place + ". " +
        "There they " + verb + " the sacred " + noun + ", and for this trespass the elders cast them forth. " +
        "With nothing save " + weapon + " in their keeping, they crossed the " + adjective + " wastes, " +
        "whilst " + creature + " followed ever at their heel. " +
        "Beneath a heaven bereft of light, " + god + " spoke a single command: \u201C" + command + ".\u201D " +
        "From that hour, hope departed their heart, and every road bore them nearer to " + sad + ".";

    } else if (manner === "downfall") {
      mannerName = "Account of the Fall";
      story = "Let the fall of " + name + " be preserved amongst the most closely sealed accounts. " +
        "From " + place + " they came, a " + beginningGold + " once praised as " + adjective + ". " +
        "Yet for the sake of power, they " + verb + " the last " + noun + " before the gathered pilgrims. " +
        creatureStart + " beheld the deed and placed " + weapon + " within their grasp. " +
        "\u201C" + command + ",\u201D whispered " + god + " from beyond the wheeling stars. " +
        "Thus did they take up the mantle of the " + epithetGold + "; " +
        "and with its power came the everlasting " + sad + " that all such power doth demand.";

    } else {
      mannerName = "The Latter Prophecy";
      story = "When the oathkeepers gather at the drowned cloister of Vey, seek the one called " + name + ". " +
        "They shall appear as a figure most " + adjective + ", bearing " + weapon + ", " +
        "whilst " + creature + " keeps pace within their shadow. " +
        "Ere that hour, they will have " + verb + " the final " + noun + ", believing the deed an act of devotion. " +
        "Then shall " + god + " speak through the hollow heavens: \u201C" + command + ".\u201D " +
        "Know then that the " + epithetGold + " hath awakened, and the age shall end not in glory, but in " + sad + ".";
    }

    storyHeading.textContent = playerName + ", Recorded";
    storySummary.textContent = capitalize(beginning) + " \u00B7 " + archetypeName + " \u00B7 " + mannerName;
    storyTitle.innerHTML = name + ", the " + epithetGold;
    storyText.innerHTML = story;
    storyScreen.classList.add("show");
  });
})();