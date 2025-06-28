import { vulturesData } from "./vltrs-data.js";

const newWorldGrid = document.getElementById("new-world-vultures");
const oldWorldGrid = document.getElementById("old-world-vultures");
const detailOverlay = document.getElementById("vultureDetail");
const detailContent = document.querySelector(".vulture-card-content");
const closeButton = document.querySelector(".close-button");
const audioToggle = document.getElementById("toggleAudio");
const bgMusic = document.getElementById("bgMusic");

bgMusic.src = "/assets/audio/bgloop.wav";
bgMusic.loop = true;
bgMusic.volume = 0.3;

audioToggle.textContent = "🎵";
audioToggle.classList.add("pulse-animation");

let isMusicPlaying = false;
audioToggle.addEventListener("click", () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    audioToggle.textContent = "🔇";
    audioToggle.classList.remove("pulse-animation");
  } else {
    bgMusic.play().catch((e) => console.log("Audio playback prevented: ", e));
    audioToggle.textContent = "🔊";
    audioToggle.classList.remove("pulse-animation");
  }
  isMusicPlaying = !isMusicPlaying;
});

function createVultureItems(vultures, gridElement) {
  vultures.forEach((vulture, index) => {
    const vultureItem = document.createElement("div");
    vultureItem.className = vulture.isSpecial
      ? "vulture-item special-vulture"
      : "vulture-item";
    vultureItem.dataset.vultureId = vulture.id;

    vultureItem.style.opacity = "0";
    vultureItem.style.transform = "translateY(20px)";
    vultureItem.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    vultureItem.style.transitionDelay = `${index * 0.05}s`;

    if (vulture.isSpecial) {
      vultureItem.innerHTML = `
            <div class="special-tag">Special</div>
            <img src="${vulture.image}" alt="${vulture.name}"
                 loading="lazy" width="100" height="100" class="professor-pic">
            <div class="vulture-name special-name">${vulture.name}</div>
          `;

      vultureItem.addEventListener("click", showVultureWisdom);
    } else {
      vultureItem.innerHTML = `
            <img src="${vulture.image}" alt="${vulture.name}"
                 loading="lazy" width="100" height="100">
            <div class="vulture-name">${vulture.name}</div>
          `;

      vultureItem.addEventListener("click", () => showVultureDetails(vulture));
    }

    gridElement.appendChild(vultureItem);

    setTimeout(() => {
      vultureItem.style.opacity = "1";
      vultureItem.style.transform = "translateY(0)";
    }, 10);
  });
}

function showVultureDetails(vulture) {
  detailContent.innerHTML = `
    <div class="vulture-detail-header">
      <h2>${vulture.name}</h2>
      <h3><em>${vulture.scientificName}</em></h3>
    </div>

    <div class="vulture-detail-content">
      <div class="vulture-detail-image">
        <img src="${vulture.image}" alt="${vulture.name}"
             width="200" height="200">
      </div>

      <div class="vulture-detail-info">
        ${vulture.altNames ? `<p><strong>Also known as:</strong> ${vulture.altNames}</p>` : ""}
        <p><strong>Taxonomy:</strong> ${vulture.taxonomy}</p>
        <p><strong>Size:</strong> ${vulture.size}</p>
        <p><strong>Estimated World Population:</strong> ${vulture.population}</p>
        <p><strong>Movements:</strong> ${vulture.movements}</p>
        <p><strong>Social Ecology:</strong> ${vulture.socialEcology}</p>

        <div class="vulture-special-traits">
          <h4>Special Traits</h4>
          <p>${vulture.specialTraits}</p>
        </div>
      </div>
    </div>
  `;

  detailOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  document.querySelectorAll(".vulture-item").forEach((item) => {
    if (item.dataset.vultureId !== vulture.id) {
      item.style.opacity = "0.3";
    }
  });

  setupScrollBehavior();
}

function showVultureWisdom() {
  const wisdomFacts = [
    "For scavenging birds like vultures, reproduction represents the cornerstone of survival. It ensures the continuation of their lineage and prevents their disappearance from our skies.",

    "The breeding patterns of vultures typically follow seasonal cycles, often influenced by the availability of food sources and favorable wind conditions for flight.",

    "Most vulture species show minimal size differences between males and females. Notable exceptions include the Andean Condor, where males exceed females in size, and the Bearded Vulture, which displays the opposite pattern with larger females - a trait sometimes connected to sibling competition.",

    "Young vultures typically take several years to reach breeding age, likely developing essential skills in finding food and establishing territory during this extended youth period.",

    "Vulture pairs often stay together across multiple years, though occasionally they may engage in mating outside their partnership or switch companions within a single season.",

    "Some vulture species defend specific territories, while others demonstrate more flexible spatial behaviors without strict territorial boundaries.",

    "Research suggests healthy reproduction rates in many vulture populations, though this observation might be influenced by studies primarily conducted in areas with abundant resources and thriving communities.",

    "Despite common perception, animal remains are relatively abundant in nature, and vultures have evolved specialized techniques to locate and utilize this food source effectively.",

    "Feeding exclusively on remains presents vultures with a nutritional paradox: while highly digestible and rich in nutrients, this diet also exposes them to potential infection and toxicity risks.",

    "Human farming practices often unintentionally benefit vultures by creating concentrated food resources in predictable locations and seasons.",

    "The relationship between vultures and humans is often mutually beneficial, with these birds thriving in landscapes shaped by human activity while providing important ecosystem services.",

    "To conserve energy, vultures have mastered efficient soaring techniques that allow them to cover vast distances with minimal wing flapping.",

    "Vision serves as the primary sense for food location among all vulture species, though some additionally utilize their sense of smell or potentially even sound to detect available resources.",

    "Vultures have developed a remarkable information network in the sky, where individuals observe others' behavior to locate food sources - a crucial strategy for their scavenging lifestyle.",

    "When multiple vultures gather at a feeding site, this social dynamic creates significant competition both within and between different vulture species.",

    "At feeding sites, vultures engage in complex competitive behaviors that can involve intense and dynamic interactions as they vie for access to food.",

    "While larger vulture species typically dominate smaller ones at feeding sites, groups of smaller vultures can sometimes collectively outcompete their larger counterparts.",

    "Although uncommon, vultures occasionally feed on members of their own species under certain circumstances.",

    "In some situations, vultures may approach animals that are near death and accelerate their demise before beginning to feed.",
  ];

  const wisdomModal = document.createElement("div");
  wisdomModal.className = "wisdom-overlay";

  wisdomModal.innerHTML = `
    <div class="wisdom-card">
      <button class="close-button">×</button>
      <div class="wisdom-content">
        <div class="wisdom-header">
          <img src="/assets/vltrs/pv.png" alt="Professor Vulture" class="professor-img">
          <div class="professor-info">
            <h2>Professor Vulture</h2>
            <p class="professor-title">Vulture Studies Specialist</p>
          </div>
        </div>

        <div class="wisdom-intro">
          <p>Welcome to my lecture series on vulture biology! <br> I've compiled these fascinating conclusions from extensive research.</p>
        </div>

        <div class="wisdom-fact-display">
          <p class="wisdom-fact">${wisdomFacts[0]}</p>
          <div class="fact-number">1/${wisdomFacts.length}</div>
        </div>

        <div class="wisdom-navigation">
          <button class="nav-button prev-button" disabled>< Prev</button>
          <button class="nav-button next-button">Next ></button>
        </div>

        <div class="wisdom-attribution">
          <p>Facts adapted from "Vultures of the World" by Keith L. Bildstein</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(wisdomModal);

  setTimeout(() => {
    const card = wisdomModal.querySelector(".wisdom-card");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 100);

  const prevButton = wisdomModal.querySelector(".prev-button");
  const nextButton = wisdomModal.querySelector(".next-button");
  const factDisplay = wisdomModal.querySelector(".wisdom-fact");
  const factCounter = wisdomModal.querySelector(".fact-number");
  let currentFact = 0;

  prevButton.addEventListener("click", () => {
    currentFact--;
    updateFactDisplay();
  });

  nextButton.addEventListener("click", () => {
    currentFact++;
    updateFactDisplay();
  });

  function updateFactDisplay() {
    factDisplay.textContent = wisdomFacts[currentFact];
    factCounter.textContent = `${currentFact + 1}/${wisdomFacts.length}`;

    prevButton.disabled = currentFact === 0;
    nextButton.disabled = currentFact === wisdomFacts.length - 1;

    factDisplay.classList.add("fact-change");
    setTimeout(() => factDisplay.classList.remove("fact-change"), 500);
  }

  const closeBtn = wisdomModal.querySelector(".close-button");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(wisdomModal);
  });

  wisdomModal.addEventListener("click", (event) => {
    if (event.target === wisdomModal) {
      document.body.removeChild(wisdomModal);
    }
  });
}

function addAuthorAttribution() {
  const footerContent = document.querySelector(".footer-content");
  const attribution = document.createElement("p");
  attribution.className = "attribution";
  attribution.innerHTML =
    'Vulture information from <span class="book-title">"Vultures of the World"</span> by Keith L. Bildstein';
  footerContent.appendChild(attribution);
}

function setupScrollBehavior() {
  const cardContent = document.querySelector(".vulture-card-content");
  const closeBtn = document.querySelector(".close-button");

  const isScrollable = cardContent.scrollHeight > cardContent.clientHeight;

  if (isScrollable) {
    cardContent.classList.add("scrollable");
  } else {
    cardContent.classList.remove("scrollable");
  }

  closeBtn.classList.add("visible");

  cardContent.addEventListener("scroll", () => {
    if (cardContent.scrollTop > 50) {
      closeBtn.classList.remove("visible");
      closeBtn.classList.add("hidden");
    } else {
      closeBtn.classList.remove("hidden");
      closeBtn.classList.add("visible");
    }

    if (
      cardContent.scrollHeight -
        cardContent.scrollTop -
        cardContent.clientHeight <
      10
    ) {
      cardContent.classList.remove("scrollable");
    } else if (isScrollable) {
      cardContent.classList.add("scrollable");
    }
  });
}

closeButton.addEventListener("click", () => {
  detailOverlay.style.display = "none";
  document.body.style.overflow = "";

  document.querySelectorAll(".vulture-item").forEach((item) => {
    item.style.opacity = "1";
  });
});

detailOverlay.addEventListener("click", (event) => {
  if (event.target === detailOverlay) {
    closeButton.click();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && detailOverlay.style.display === "flex") {
    closeButton.click();
  }
});

function init() {
  createVultureItems(vulturesData.newWorld, newWorldGrid);
  createVultureItems(vulturesData.oldWorld, oldWorldGrid);
  addAuthorAttribution();
}

document.addEventListener("DOMContentLoaded", init);
