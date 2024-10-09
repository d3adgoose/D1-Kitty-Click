import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Kitty Clicker"; // Setting the title of the game
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0; // Initializing the counter

// Creating a display for the counter
const counterDisplay = document.createElement("div");
counterDisplay.innerHTML = `Counter: ${counter}`;
app.append(counterDisplay);

const button = document.createElement("button"); // Creating a button that the player can click
button.innerHTML = "Click Meow! 🐱";
app.append(button);

// Function to update the counter display
const updateCounterDisplay = () => {
    counterDisplay.innerHTML = `Counter: ${counter}`;
};

// Creating an event listener that increments the counter when the button is clicked
button.addEventListener("click", () => {
    counter++;
    updateCounterDisplay();
});

// Automatic clicking
setInterval(() => {
    counter++;
    updateCounterDisplay();
}, 1000);
