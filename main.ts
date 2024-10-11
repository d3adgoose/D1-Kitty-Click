// Import the CSS for styling
import "./style.css";

// Select the main app container in the HTML
const app: HTMLDivElement = document.querySelector("#app")!;

// Set the game title
const gameName = "Kitty Clicker";
document.title = gameName;

// Create and append a header with the game name
const header = document.createElement("h1");
header.textContent = gameName;
app.appendChild(header);

// Initialize the counter variable to store the current count
let counter = 0;

// Create and append a display element for the counter
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Counter: ${counter} purrs`;
app.appendChild(counterDisplay);

// Create and append a button for player interaction
const button = document.createElement("button");
button.textContent = "Click Meow! 🐱";
app.appendChild(button);

// Function to update the counter display with the latest value
const updateCounterDisplay = () => {
    counterDisplay.textContent = `Counter: ${counter} purrs`;
};

// Add an event listener to the button for the click event to increase the counter
button.addEventListener("click", () => {
    counter++;
    updateCounterDisplay();
});

// Automatically increase the counter every 1000 milliseconds (1 second)
setInterval(() => {
    counter++;
    updateCounterDisplay();
}, 1000);

// Define an interface for the items/upgrades in the game
interface Item {
    name: string;
    cost: number;
    rate: number;
    description: string;
}

// Array of objects representing different items/upgrades available in the game
const items: Item[] = [
    { name: "Catnip", cost: 10, rate: 0.1, description: "A bit of catnip increases purrs by 0.1 per second." },
    { name: "Scratching Post", cost: 100, rate: 2, description: "A scratching post increases purrs by 2 per second." },
    { name: "Yarn Ball", cost: 1000, rate: 50, description: "A yarn ball increases purrs by 50 per second." },
];

// Create buttons for each item and add functionality for purchasing these items
const upgrades = items.map(item => {
    const upgradeButton = document.createElement("button");
    upgradeButton.textContent = `Buy ${item.name} (${item.cost} purrs)`;
    upgradeButton.disabled = counter < item.cost;
    upgradeButton.addEventListener("click", () => {
        if (counter >= item.cost) {
            counter -= item.cost;
            item.cost *= 1.15; // Increase the cost by 15% after each purchase
            item.rate += item.rate; // Double the rate of increase
            upgradeButton.textContent = `Buy ${item.name} (${Math.round(item.cost)} purrs)`;
            setInterval(() => {
                counter += item.rate;
                updateCounterDisplay();
            }, 1000);
        }
        updateCounterDisplay();
    });
    app.appendChild(upgradeButton);
    return upgradeButton;
});

// Create a div to display the status of each upgrade
const upgradeStatus = document.createElement("div");
app.appendChild(upgradeStatus);

// Function to update the status display showing the rate of purrs per second for each upgrade
const updateUpgradeStatus = () => {
    upgradeStatus.innerHTML = items.map(item => `${item.name}: ${Math.floor(item.rate)} purrs/sec`).join("<br>");
};

// Set an interval to continuously update the upgrade statuses and check if upgrades can be purchased
setInterval(() => {
    updateUpgradeStatus();
    upgrades.forEach((button, index) => {
        button.disabled = counter < items[index].cost;
    });
}, 1000);

