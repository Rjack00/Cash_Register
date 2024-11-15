import { getDomElements } from './elements.js';

const { totalDue, cashInput, changeTotalElement, purchaseBtn, changeDueElement } = getDomElements();

const status = {
  open: "OPEN",
  closed: "CLOSED",
  insuff: "INSUFFICIENT_FUNDS"
};

let registerStatus = ``;

let changeDue = [];

const messages = {
  insufficientMessage: "Customer does not have enough money to purchase the item",
  exactCash: "No change due - customer paid with exact cash"
};

let registerMessage = ``;

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

// reversing cid to place larger values first
let cidReversed = cid.reverse();
// changed dollars to cents to avoid floating-point precision issues
for(const element of cidReversed) {
  element[1] = Math.round(element[1] * 100);
}

const denominationNames = ["ONE HUNDRED","TWENTY","TEN","FIVE","ONE","QUARTER","DIME","NICKLE","PENNY"];

const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

let cidTotal = () => {
  return cidReversed.reduce((a, b) => a + Number(b[1]), 0);
}

const updateStatus = (registerStatus) => {
  if (registerStatus === "insufficient") {
    return status.insuff;
  } else if (registerStatus === "closed") {
    return status.closed;
  } else {
    return status.open;
  }
}

const updateUI = () => {
  changeDueElement.innerHTML = `
    <p>STATUS: ${updateStatus(registerStatus)}</p>
    <p>${registerMessage}</p>
    `;
  for(const subArr of changeDue) {
    changeDueElement.innerHTML += `<p>${subArr[0]}: $${subArr[1]}</p>`;
  }
}
console.log('cid1',cidReversed);
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
    alert("Enter cash from customer");
    return;
  }

  let change = (cashAmount * 100) - (price * 100);

  if (cashAmount < price) {
    alert(messages.insufficientMessage);
    return;
  };
  
  if (change === 0) {
    console.log('exactCash');
    registerMessage = messages.exactCash;
    return;
  }
  // need to get exact change; currently can't get all 0's when 1 - 334.41
 // making change
  while(change > 0) {
    for (let i = 0; i < denominations.length; i++) {
      console.log(`cidTotal(): ${cidTotal()}, change ${change}`);
      if (cidTotal() < change) {
        registerStatus = `insufficient`;
        return;
      }
      if(cidReversed[i][1] <= 0) {
        continue;
      }
      if(denominations[i] <= change) {
        change -= denominations[i];
        cidReversed[i][1] -= denominations[i];
        
        if (changeDue.some(subArray => subArray.includes(denominationNames[i]))) {
          for(const denomination of changeDue) {
              if(denomination[0] === denominationNames[i]) {
                denomination[1] += denominations[i];
              }
          }
        } else {
        changeDue.push([denominationNames[i], denominations[i]]);
        }
        break;
      }
    }
  }
  // changing denominations of changeDue to dollars
  for(const element of changeDue) {
    element[1] = Math.round(element[1] / 100);
  }
  // changing denominations of cidReversed back to dollars
  for(const element of cidReversed) {
    element[1] = Math.round(element[1] / 100);
  }
  console.log("changeDue: ", changeDue);
  console.log("cidReversed: ", cidReversed);
  return ;
};


purchaseBtn.addEventListener('click', () => {
  console.time('RegisterRunTime');
  register(Number(cashInput.value), Number(totalDue.value));
  console.timeEnd('RegisterRunTime');
  updateUI();
});
