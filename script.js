import { getDomElements } from './elements.js';

const { totalDue, cashInput, changeTotalElement, purchaseBtn, changeDueElement } = getDomElements();

console.log("test1");


console.log("test2");

const status = {
  open: "OPEN",
  closed: "CLOSED",
  insuff: "INSUFFICIENT_fUNDS"
};

let cash = cashInput.value;
let price = totalDue.value;
let changeDue = [];

const messages = {
  insufficientMessage: "Customer does not have enough money to purchase the item",
  exactCash: "No change due - customer paid with exact cash"
};

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// const denominationNames = {
//   "ONE HUNDRED": "ONE HUNDRED",
//   TWENTY: "TWENTY",
//   TEN: "TEN",
//   FIVE: "FIVE",
//   ONE: "ONE",
//   QUARTER: "QUARTER",
//   DIME: "DIME",
//   NICKLE: "NICKLE",
//   PENNY: "PENNY"
// };

const denominationNames = [
  "ONE HUNDRED",
  "TWENTY",
  "TEN",  
  "FIVE",
  "ONE",
  "QUARTER",
  "DIME",
  "NICKLE",
  "PENNY"
];

const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];


const register = (cashAmount, price) => {

  if(cashAmount === "") {
    console.log('if(cashAmount === "") triggered');
    return;
  }

  let change = (cashAmount * 100) - (price * 100);

  if (cashAmount < price) {
    console.log("if(cashAmount < price) triggered");
    alert(messages.insufficientMessage);
    return;
  };
  
  if (change === 0) {
    console.log("if(change === 0) triggered");
    changeDueElement.textContent = messages.exactCash;
    return;
  }

// making change
  while(change > 0) {
    for (let i = 0; i < denominations.length; i++) {
        if(denominations[i] <= change) {
          change -= denominations[i];
          
          if (changeDue.some(subArray => subArray.includes(denominationNames[i]))) {
            for(const denomination of changeDue) {
                if(denomination[0] === denominationNames[i]) {
                  denomination[1] += denominations[i] / 100;
                }
            }
          } else {
          changeDue.push([denominationNames[i], denominations[i] / 100]);
          }
          break;
        }
    }
  }
  console.log(changeDue);
  return;
};




purchaseBtn.addEventListener('click', () => {
  register(Number(cashInput.value), Number(totalDue.value));
});
