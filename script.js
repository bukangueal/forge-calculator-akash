// All forgeable items and base chance
const items = {
    weapon: {
        "Dagger": { ore: 3, chance: 100 },
        "Straight Sword": { ore: 6, chance: 86 },
        "Gauntlet": { ore: 9, chance: 65 },
        "Katana": { ore: 12, chance: 72 },
        "Great Sword": { ore: 16, chance: 69 },
        "Great Axe": { ore: 22, chance: 67 },
        "Colossal Sword": { ore: 40, chance: 65 },
    },
    armor: {
        "Light Helm": { ore: 3, chance: 100 },
        "Light Leg": { ore: 7, chance: 67 },
        "Light Chestplate": { ore: 10, chance: 53 },
        "Med Helm": { ore: 13, chance: 60 },
        "Med Leg": { ore: 16, chance: 57 },
        "Med Chestplate": { ore: 21, chance: 63 },
        "Heavy Helm": { ore: 25, chance: 51 },
        "Heavy Leg": { ore: 30, chance: 49 },
        "Heavy Chestplate": { ore: 33, chance: 47 },
    }
};

// Ore list
const oreList = [
    "Eye Ore",
    "Rivalite",
    "Obsidian",
    "Magmaite",
    "Mythril",
    "Lightite",
    "Fireite",
    "Uranium",
    "Demonite",
    "Darkyte",
    "Ruby",
    "Cuprite",
    "Emerald"
];

// Default inventory
const inventory = {
    "Eye Ore": 7,
    "Rivalite": 16,
    "Obsidian": 2,
    "Magmaite": 0,
    "Mythril": 11,
    "Lightite": 3,
    "Fireite": 0,
    "Uranium": 9,
    "Demonite": 0,
    "Darkyte": 0,
    "Ruby": 20,
    "Cuprite": 39,
    "Emerald": 25
};

function updateItems() {
    const cat = document.getElementById("category").value;
    const itemSelect = document.getElementById("item");
    itemSelect.innerHTML = "";

    Object.keys(items[cat]).forEach(name => {
        let opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        itemSelect.appendChild(opt);
    });

    updateOreRequirement();
}

function updateOreRequirement() {
    const cat = document.getElementById("category").value;
    const itemName = document.getElementById("item").value;
    document.getElementById("totalOre").value = items[cat][itemName].ore;

    let container = document.getElementById("oreInputs");
    container.innerHTML = "";

    oreList.forEach(ore => {
        container.innerHTML += `
            <label>${ore} (You have ${inventory[ore] || 0})</label>
            <input id="ore_${ore}" type="number" value="0" min="0">
        `;
    });
}

function computeForge() {
    const cat = document.getElementById("category").value;
    const itemName = document.getElementById("item").value;
    const totalOre = items[cat][itemName].ore;

    let threshold = Math.ceil(totalOre * 0.10);

    let resultText = `<b>Base Forge Chance:</b> ${items[cat][itemName].chance}%<br>`;
    resultText += `<b>Trait Threshold:</b> ${threshold} ore (10%)<br><br>`;
    resultText += `<b>Activated Traits:</b><br>`;

    let activated = false;

    oreList.forEach(ore => {
        let inputVal = Number(document.getElementById("ore_" + ore).value);
        if (inputVal >= threshold) {
            activated = true;
            resultText += `✔ ${ore}<br>`;
        }
    });

    if (!activated) resultText += `None`;

    document.getElementById("result").innerHTML = resultText;
}

// Initialize page
updateItems();
