let playerData = {
	luck: 1,
	rollSpeed: 10, // in seconds

}

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
    }); // Calculates the cumulative value for each sword, necessary for rolling
    return acc;
}, []);


function rollSword() {
    const roll = Math.pow(Math.random(), 1 / playerData.luck); // Maybe balance this later,
    const chosenSword =
        cumulativeChance.find((sword) => roll <= sword.cumulative) ||
        cumulativeChance[cumulativeChance.length - 1]; // Determines which cumulative value it lies between and returns that sword
    document.getElementById('swordRolled').innerHTML = `You got a ${chosenSword.name} (${chosenSword.chance * 100}%)`;
    console.log(`You rolled ${roll}, and got: ${chosenSword.name}`);
}
