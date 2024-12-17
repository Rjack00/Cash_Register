# Cash Register System

This is a simple cash register system that calculates the change due for a customer based on the amount they provide, given a total purchase price. It also simulates a cash drawer and handles currency denominations in a straightforward manner. The system uses a combination of a physical UI (onscreen keypad and input fields) and logic to perform the calculations.

## Features

- **Calculate Change Due**: The system calculates and displays the change due based on the total amount and the cash provided by the customer.
- **Exact Cash Handling**: If the customer pays the exact amount, no change is calculated and a message is displayed.
- **Insufficient Funds Handling**: If the cash in the drawer is not sufficient to provide the required change, an error message is displayed.
- **Onscreen Keypad**: A numeric keypad that allows the user to input the total due and cash input values without using a physical keyboard.
- **Input Validation**: Ensures that only valid values (numbers with up to two decimal places) are entered for the total due and cash inputs.
- **Cash Drawer Simulation**: Simulates a cash drawer with different currency denominations (Penny, Nickel, Dime, Quarter, etc.), and updates the drawer after each transaction.

## Table of Contents

1. [Usage](#usage)
2. [Code Explanation](#code-explanation)

## Usage

1. **Enter the total due**: Enter the total price of the items in the `Total Due` input field.
2. **Enter cash from customer**: Enter the amount given by the customer in the `Cash Given` input field.
3. **Click "Purchase"**: After entering the amounts, click the `Purchase` button to calculate the change.
4. **View change due**: The system will display the total change due and break it down by currency denomination.
5. **Clear the form**: Use the `Clear` button to reset the form and start over with new amounts.

## Code Explanation

### JavaScript

The logic of this cash register system is encapsulated in the main JavaScript file. The script interacts with the DOM to process input values, calculate change, and display the results. Here's a breakdown of the key parts:

- **DOM Elements**: The script begins by importing and destructuring the DOM elements that will be interacted with, including input fields for `totalDue` and `cashInput`, as well as display elements for `changeTotalElement` and `changeDueElement`.

- **Currency Denominations (cid)**: The cash drawer is initialized with predefined currency denominations and their amounts. This array will be used for change calculation.

- **Status Handling**: The `updateStatus` and `updateUI` functions update the UI based on the current state of the transaction (whether it's open, closed, or insufficient funds).

- **Register Function**: The core function of the system, `register`, takes the `totalDue`, `cashInput`, and `cid` (cash in drawer) as parameters. It calculates the total change due and updates the `changeDue` array with the correct denominations, adjusting the cash in the drawer as it goes.

- **Input Validation**: An event listener validates user input in the numeric fields, ensuring only valid numbers (with up to two decimal places) are entered. The onscreen keypad also updates the `inputField` elements based on user interaction.

- **Button Listeners**: There are event listeners for the `purchaseBtn` (for completing the transaction) and `clearBtn` (for clearing the inputs and resetting the form).
