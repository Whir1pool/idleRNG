let gameData = {
	luck: 1,
	rollSpeed: 1, // in seconds
    inventory: {},

}
let canRoll = true // Determines whether the roll button is avaialbe yet.
let swords = [
    { name: "stick", chance: 0.5 },
    { name: "stone", chance: 0.34 },
    { name: "Dagger", chance: 0.16 },
]; // Cumulative value must add to 1 for the time being, might find a fix later


const cumulativeChance = swords.reduce((acc, sword) => {
    const lastCumulative = acc.length > 0 ? acc[acc.length - 1].cumulative : 0;
    acc.push({
        ...sword,
        cumulative: parseFloat((lastCumulative + sword.chance).toFixed(10)),
    }); // Assigns a cumulative value for each sword
    return acc;
}, []);


function rollSword() {
    if (!canRoll) {
        return;
    }
    canRoll = false

    // Determines the luck of the roll
    const roll = Math.pow(Math.random(), 1 / gameData.luck); // Maybe balance this later,
    const chosenSword =
        cumulativeChance.find((sword) => roll <= sword.cumulative) ||
        cumulativeChance[cumulativeChance.length - 1]; // Determines which cumulative value it lies between and returns that sword
    document.getElementById('swordRolled').innerHTML = `You got a ${chosenSword.name} (${chosenSword.chance * 100}%)`;
    console.log(`You rolled ${roll}, and got: ${chosenSword.name}`);

    // Adding sword to inventory
    if (gameData.inventory[chosenSword.name]) {
        gameData.inventory[chosenSword.name]++;
    } else {
        gameData.inventory[chosenSword.name] = 1;

        // Creating the sword in the inventory if its rolled for the first time

        const inventoryDiv = document.querySelector('.inventory');
        const swordElement = document.createElement('p');
        swordElement.id = `${chosenSword.name}Inventory`;
        swordElement.textContent = `${chosenSword.name}: ${gameData.inventory[chosenSword.name]}`;
        inventoryDiv.appendChild(swordElement);
    }

    //Update inventory count

    const swordElement = document.getElementById(`${chosenSword.name}Inventory`);
    swordElement.textContent = `${chosenSword.name}: ${gameData.inventory[chosenSword.name]}`;

    // Disable the button for a period of time
    setTimeout(() => {
        canRoll = true;
    }, 1000 / gameData.rollSpeed);
}

document.getElementById(`rollbtn`).addEventListener("click", rollSword)
