// Import the CSS for styling
import "./style.css";

// Select the main app container in the HTML
const app: HTMLDivElement = document.querySelector("#app")!;

// Set the game title to Kaylee Morales' game
const gameName = "Kitty Clicker by Kaylee Morales";
document.title = gameName;

// Define an interface for game items/upgrades
interface Item {
    name: string;
    cost: number;
    rate: number;
    description: string;
}

// Array of objects representing different cat-themed upgrades
const availableItems: Item[] = [
    { name: "Milk Bowl 🥛", cost: 10, rate: 0.1, description: "A simple milk bowl to start the purrs"},
    { name: "Fish Treat 🐟", cost: 100, rate: 2, description: "Tasty fish that makes your kitty purr louder"},
    { name: "Catnip Toy 😺", cost: 1000, rate: 50, description: "A fun catnip toy to keep the purrs going"},
    { name: "Comfy Bed 🛏️", cost: 5000, rate: 100, description: "A comfy bed to relax and purr happily"},
    { name: "Majestic Tree 🌳", cost: 10000, rate: 250, description: "A majestic tree for endless climbing and purring"}
];

// Create a button to feed the cat
const button = document.createElement("button");
button.textContent = "Feed Meow! 🐱";
app.appendChild(button);

// Initialize the counter and display it
let counter: number = 0;
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Purrs: ${counter}`;
app.appendChild(counterDisplay);

// Function to update the counter display
const updateCounterDisplay = () => {
    counterDisplay.textContent = `Purrs: ${Math.round(counter)}`;
};

// Increase purrs by clicking the button
button.addEventListener("click", () => {
    counter++;
    updateCounterDisplay();
});

// Array to keep track of the number of each item purchased
const upgrades = new Array(availableItems.length).fill(0);

// Function to handle automatic purr increase
const updatePurrsOverTime = () => {
    const increment = availableItems.reduce((acc, item, index) => acc + upgrades[index] * item.rate, 0);
    counter += increment / 10; // update every 100 milliseconds for smoother increment
    updateCounterDisplay();
    setTimeout(updatePurrsOverTime, 100);
};

setTimeout(updatePurrsOverTime, 100);

// Function to update the availability of purchase buttons based on current purrs
const updateShopButtons = () => {
    availableItems.forEach((item, index) => {
        const shopButton = document.getElementById(`shopButton-${index}`) as HTMLButtonElement;
        shopButton.disabled = counter < item.cost;
    });
};

// Append elements for each upgrade item
availableItems.forEach((item, index) => {
    const shopButton = document.createElement("button");
    shopButton.textContent = `${item.name} (Cost: ${item.cost} purrs)`;
    shopButton.id = `shopButton-${index}`;
    shopButton.disabled = true;
    app.appendChild(shopButton);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.textContent = item.description;
    descriptionDiv.style.fontStyle = "italic";
    app.appendChild(descriptionDiv);

    // Purchase upgrade and update counters
    shopButton.addEventListener("click", () => {
        if (counter >= item.cost) {
            counter -= item.cost; // deduct the cost
            upgrades[index]++; // increment the number of items
            item.cost *= 1.15; // increase the cost by 15%
            shopButton.textContent = `${item.name} (Cost: ${Math.round(item.cost)} purrs)`;
            updateCounterDisplay();
            updateShopButtons();
        }
    });
});

// Periodically check if buttons should be enabled based on purr count
setInterval(updateShopButtons, 100);
