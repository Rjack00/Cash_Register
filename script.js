import { getDomElements } from './elements.js';

const { totalDue, cashInput, changeTotalElement, purchaseBtn, changeDueElement } = getDomElements();

const status = {
  open: "OPEN",
  closed: "CLOSED",
  insuff: "INSUFFICIENT_fUNDS"
};

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

let cidReversed = cid.reverse();

console.log("cidReversed: ", cidReversed);

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

const denominations = [
  10000, 
  2000, 
  1000, 
  500, 
  100, 
  25, 
  10, 
  5, 
  1
];


let cidTotal = () => {
  const cidCopyM100 = [...cidReversed].forEach(item => item[1] = Math.round(item[1] * 100));
  return cidCopyM100.reduce((a, b) => a + Number(b[1]), 0) / 100;
}

// TODO register():
// - add STATUS: to messages
// - innerHTML for changeDueElement
// - innerHTML for changeTotalElement
// - innerHTML for changeInDrawer
const register = (cashAmount, price) => {

  if(!price) {
    alert("Enter amount due");
    return;
  }

  if(!cashAmount) {
    console.log('if(cashAmount === "") triggered');
    alert("Enter cash from customer");
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
      console.log(`change: ${change}`);
      if (cidTotal < change) {
        console.log("cid is insufficient: ", cidTotal);
        console.log("change: ", change);
        return;
      }
      if(cidReversed[i][1] === 0) {
        console.log(`cidReversed[i][1] === 0 ? cidReversed[i][1]: ${cidReversed[i][1]}, i: ${i}`);
        i++;
      }
      if(denominations[i] <= change) {
        change -= denominations[i];
        cidReversed[i][1] -= denominations[i] / 100;
        
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
  console.log("changeDue: ", changeDue);
  console.log("cidReversed: ", cidReversed);
  return ;
};




purchaseBtn.addEventListener('click', () => {
  register(Number(cashInput.value), Number(totalDue.value));
});
