const ores = {
    "Darkryte": { mult: 6.3, trait: "15% dodge by turning into shadow" },
    "Demonite": { mult: 5.5, trait: "Burn on hit + Armor burn passive" },
    "Fireite": { mult: 4.5, trait: "30% chance burn for 2 sec" },
    "Uranium": { mult: 3, trait: "5% max HP AoE (armor)" },
    "Lightite": { mult: 4.6, trait: "Speed boost (armor)" },
    "Eye": { mult: 4, trait: "15% DMG but -10% HP" },
    "Magmaite": { mult: 5, trait: "35% explode for 50% AoE DMG" },
    "Mythril": { mult: 3.5, trait: "Armor +15%" },
    "Rainbow Crystal": { mult: 5.25, trait: "None" }
};

const items = {
    weapon: {
        "Dagger": { ore: 3, chance: 100 },
        "Straight Sword": { ore: 6, chance: 86 },
        "Gauntlet": { ore: 9, chance: 65 },
        "Katana": { ore: 12, chance: 72 },
        "Great Sword": { ore: 16, chance: 69 },
        "Great Axe": { ore: 22, chance: 67 },
        "Colossal Sword": { ore: 40, chance: 65 }
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
        "Heavy Chestplate": { ore: 40, chance: 75 }
    }
};

let selected = [];

function updateItems() {
    const category = document.getElementById("category").value;
    const itemSelect = document.getElementById("item");
    itemSelect.innerHTML = "";

    Object.keys(items[category]).forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.innerText = item;
        itemSelect.appendChild(opt);
    });

    updateForgeInfo();
}

function updateForgeInfo() {
    const category = document.getElementById("category").value;
    const item = document.getElementById("item").value;

    let info = items[category][item];
    document.getElementById("forgeInfo").innerHTML =
        `Ore Needed: ${info.ore}<br>Base Forge Chance: ${info.chance}%`;

    computeSummary();
}

function loadOreButtons() {
    const container = document.getElementById("oreButtons");
    container.innerHTML = "";

    Object.keys(ores).forEach(ore => {
        const btn = document.createElement("div");
        btn.className = "ore-button";
        btn.innerText = ore;
        btn.onclick = () => addOre(ore);
        container.appendChild(btn);
    });
}

function addOre(ore) {
    selected.push(ore);
    renderSelected();
    computeSummary();
}

function renderSelected() {
    const box = document.getElementById("selectedOres");
    box.innerHTML = selected.map(o => `• ${o}`).join("<br>");
}

function computeSummary() {
    const category = document.getElementById("category").value;
    const item = document.getElementById("item").value;
    const info = items[category][item];

    let totalMult = selected.reduce((sum, ore) => sum + ores[ore].mult, 0);
    let traits = selected.map(ore => ores[ore].trait).join("<br>");

    document.getElementById("forgeResult").innerHTML = `
        <b>Item:</b> ${item}<br>
        <b>Base Chance:</b> ${info.chance}%<br>
        <b>Total Ore Used:</b> ${selected.length}/${info.ore}<br>
        <b>Total Multiplier:</b> ${totalMult.toFixed(2)}x<br><br>
        <b>Traits Activated:</b><br>${traits || "None"}
    `;
}

updateItems();
loadOreButtons();
