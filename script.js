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
  const cidCopyM100 = [...cidReversed];
  cidCopyM100.forEach(item => item[1] = Math.round(item[1] * 100));
  return cidCopyM100.reduce((a, b) => a + Number(b[1]), 0) / 100;
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
    changeDueElement.textContent = messages.exactCash;
    return;
  }
  
 // making change
  while(change > 0) {
    for (let i = 0; i < denominations.length; i++) {
      if (cidTotal < change) {
        console.log("cidTotal<Change");  // when this if() nothing happens/ infinite loop??
        // updateStatus("insufficient");
        return;
      }
      if(cidReversed[i][1] <= 0) {
        continue;
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

const updateUI = () => {
  changeDueElement.innerHTML = `<p>STATUS: ${updateStatus()}</p>`
  for(const subArr of changeDue) {
    changeDueElement.innerHTML += `
    <p>${subArr[0]}: $${subArr[1]}</p>`;
  }
}




purchaseBtn.addEventListener('click', () => {
  console.time('RegisterRunTime');
  register(Number(cashInput.value), Number(totalDue.value));
  console.timeEnd('RegisterRunTime');
  updateUI();
});
