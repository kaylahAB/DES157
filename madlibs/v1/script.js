(function () {
  "use strict";

  const form = document.querySelector("form");
  const storyScreen = document.querySelector("section");
  const storyTitle = document.querySelector("h2");
  const storyText = document.querySelectorAll("article p")[1];
  const resetButton = document.querySelector("article button");
  const textBoxes = document.querySelectorAll('input[type="text"]');

  function gold(word) {
    return "<strong>" + word + "</strong>";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    for (let i = 0; i < textBoxes.length; i++) {
      if (textBoxes[i].value.trim() === "") {
        console.warn("Please fill in: " + textBoxes[i].previousElementSibling.textContent);
        return;             
      }
    }

    const beginning = document.querySelector('input[name="beginning"]:checked').value;
    const archetype = document.querySelector('input[name="archetype"]:checked').value;
    const manner = document.querySelector('input[name="manner"]:checked').value;

    const name = gold(document.querySelector("#your-name").value.trim());
    const place = gold(document.querySelector("#place").value.trim());
    const verb = gold(document.querySelector("#past-verb").value.trim());
    const noun = gold(document.querySelector("#noun").value.trim());
    const adjective = gold(document.querySelector("#adjective").value.trim());
    const weapon = gold(document.querySelector("#weapon").value.trim());
    const creature = gold(document.querySelector("#creature").value.trim());
    const god = gold(document.querySelector("#outer-god").value.trim());
    const command = gold(document.querySelector("#command").value.trim());
    const sad = gold(document.querySelector("#sad-word").value.trim());

    const beginningGold = gold(beginning);
    const archetypeGold = gold(archetype);

    let story = "";

    if (manner === "origin") {
      story = "Hearken to the account of " + name + ", whom the sealed annals name the " + archetypeGold + ". " +
        "They were not born to legend, but lived once as a " + beginningGold + " of " + place + ". " +
        "There they " + verb + " the sacred " + noun + ", and for this trespass the elders cast them forth. " +
        "With nothing save " + weapon + " in their keeping, they crossed the " + adjective + " wastes, " +
        "whilst " + creature + " followed ever at their heel. " +
        "Beneath a heaven bereft of light, " + god + " spoke a single command: \u201C" + command + ".\u201D " +
        "From that hour, hope departed their heart, and every road bore them nearer to " + sad + ".";

    } else if (manner === "downfall") {
      story = "Let the fall of " + name + " be preserved amongst the most closely sealed accounts. " +
        "From " + place + " they came, a " + beginningGold + " once praised as " + adjective + ". " +
        "Yet for the sake of power, they " + verb + " the last " + noun + " before the gathered pilgrims. " +
        creature + " beheld the deed and placed " + weapon + " within their grasp. " +
        "\u201C" + command + ",\u201D whispered " + god + " from beyond the wheeling stars. " +
        "Thus did they take up the mantle of the " + archetypeGold + "; " +
        "and with its power came the everlasting " + sad + " that all such power doth demand.";

    } else {
      story = "When the oathkeepers gather at the drowned cloister of Vey, seek the one called " + name + ". " +
        "They shall appear as a figure most " + adjective + ", bearing " + weapon + ", " +
        "whilst " + creature + " keeps pace within their shadow. " +
        "Ere that hour, they will have " + verb + " the final " + noun + ", believing the deed an act of devotion. " +
        "Then shall " + god + " speak through the hollow heavens: \u201C" + command + ".\u201D " +
        "Know then that the " + archetypeGold + " hath answered, and the age shall end not in glory, but in " + sad + ".";
    }

    storyTitle.innerHTML = name + ", the " + archetypeGold;
    storyText.innerHTML = story;
    storyScreen.classList.add("show");
  });

  for (let i = 0; i < textBoxes.length; i++) {
    textBoxes[i].addEventListener("invalid", function (event) {
      event.preventDefault(); 
      console.warn("Please fill in: " + textBoxes[i].previousElementSibling.textContent);
    });
  }

  const choices = document.querySelectorAll('input[type="radio"][required]');
  for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener("invalid", function (event) {
      event.preventDefault(); 
      console.warn("Please pick one in: " + choices[i].parentElement.querySelector("legend").textContent);
    });
  }

  resetButton.addEventListener("click", function () {
    storyScreen.classList.remove("show");
    form.reset();
  });
})();