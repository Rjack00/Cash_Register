import { getDomElements } from './elements.js';

const { totalDue, cashInput, changeTotalElement, purchaseBtn, clearBtn, changeDueElement, cashInDrawer } = getDomElements();

const cashTransactionContainer = document.querySelector('.cash-transaction');
const changeTotalDiv = document.getElementById('change-total-div');

let changeDue = [];

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['HUNDRED', 100]
];

const statUs = {
  open: "OPEN",
  closed: "CLOSED",
  insuff: "INSUFFICIENT_FUNDS"
};

const messages = {
  insufficientMessage: "Customer does not have enough money to purchase the item",
  exactCash: "No change due - customer paid with exact cash"
};

let registerMessage = ``;

// updating register status
const updateStatus = (registerStatus) => {
  if (registerStatus === "insuff") {
    return statUs.insuff;
  } else if (registerStatus === "closed") {
    return statUs.closed;
  } else {
    return statUs.open;
  }
}

// using registerStatus() to update UI after button clicked/transaction complete
const updateUI = (registerStatus) => {
  if(registerStatus) {
    changeDueElement.innerHTML += `<p class='change-display status'>Status: ${updateStatus(registerStatus)}</p>`;
    if(!exactChangeNotAvailable) {
      changeDue.map(([denominationName, amount]) => {
      changeDueElement.innerHTML += `
    <div class='denom-row'>
    <span class='denom-name'>${denominationName}: </span>
    <span class='denom-amount'>$${amount}</span>
    </div>`;
      });
    }
  } else {
    changeDueElement.textContent = `${registerMessage}`;
  }
}

let registerStatus = '';
let exactChangeNotAvailable = false;

// REGISTER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const register = (totalDue, cashInput, cid) => {
  
  exactChangeNotAvailable = false;
  registerStatus = '';
  //Denomination names to simplify calling/assignment
  const denominationNames = ["HUNDRED","TWENTY","TEN","FIVE","ONE","QUARTER","DIME","NICKLE","PENNY"];

  //Denominations to cents to avoid floating-point precision issues
  const denominations = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];

  // reversing cid to place larger values first
  let cidReversed = cid.reverse();

  // changed dollars to cents to avoid floating-point precision issues
  for(const element of cidReversed) {
    element[1] = Math.round(element[1] *100);
  }

  if(!totalDue) {
    alert("Enter amount due");
    return;
  }

  if(!cashInput) {
    alert("Enter cash from customer");
    return;
  }

  let change = Math.round((cashInput * 100) - (totalDue * 100));

  let totalChange = change / 100;
  changeTotalElement.textContent = `$${totalChange}`;

  
  if (totalDue === cashInput) {
    registerMessage = messages.exactCash;
    return;
  }

  const cidTotal = () => {
    return cidReversed.reduce((a, b) => a + Number(b[1]), 0);
  }

  if (cidTotal() < change) {
    registerStatus = 'insuff';
    return;
  }

  // making change
  while(change > 0 && !exactChangeNotAvailable) {
    let denominationUsed = false;
    for (let i = 0; i < denominations.length; i++) {
      
      if(cidReversed[i][1] <= 0) continue;
      
      if(denominations[i] <= change && cidReversed[i][1] >= denominations[i]) {
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
        denominationUsed = true;
        break;
      }
    }
    if(!denominationUsed) exactChangeNotAvailable = true;
    registerStatus = 'open';
  }

  if (cidReversed.reduce((a, b) => a + b[1], 0) === 0) registerStatus = 'closed';

  if(exactChangeNotAvailable) registerStatus = 'insuff';
  
  // changing denominations of changeDue to dollars
  for(const element of changeDue) {
    element[1] = (element[1] / 100).toFixed(2);
  }
  // changing denominations of cidReversed back to dollars
  for(const element of cidReversed) {
    element[1] = (element[1] / 100).toFixed(2);
  }

  cidReversed.map(([denominationName, amount]) => {
    cashInDrawer.innerHTML += `
    <div class='denom-row'>
    <span class='denom-name'>${denominationName}: </span>
    <span class='denom-amount'>$${amount}</span>
    </div>`;
  });

};


purchaseBtn.addEventListener('click', () => {
  Number(totalDue.value) > Number(cashInput.value)
    ? alert("Customer does not have enough money to purchase the item")
    : register(Number(totalDue.value), Number(cashInput.value), cid);
    updateUI(registerStatus);
    changeDue = [];

  cashTransactionContainer.prepend(changeTotalDiv);
  changeTotalDiv.style.backgroundColor = 'white';
  changeTotalDiv.style.color = 'green';
  changeTotalDiv.style.fontSize = '1.2em';
  changeTotalDiv.style.fontWeight = 'bold';
  changeTotalDiv.style.borderRadius = '20px';
  changeTotalDiv.style.border = '4px solid black';
  }
);

clearBtn.addEventListener('click', () => {
  totalDue.value = '';
  cashInput.value = '';
  changeDue.textContent = '0';
  changeTotalElement.textContent = '0';
  document.querySelectorAll('.denom-row, .status').forEach(item => {
    item.textContent = '';
  });
  changeTotalDiv.removeAttribute('style');
  cashTransactionContainer.appendChild(changeTotalDiv);

})
