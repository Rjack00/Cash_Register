import { getDomElements } from './elements.js';

const { totalDue, cashInput, changeTotalElement, purchaseBtn, clearBtn, changeDueElement, cashInDrawer, key1, key2, key3, key4, key5, key6, key7, key8, key9, clearKey, key0, backspace } = getDomElements();

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

// REGISTER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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

// Rules for input field input
const inputField = document.querySelectorAll('input');

const regex = /^\d*(\.\d{0,2})?$/;

inputField.forEach(field => {
  field.addEventListener('keydown', (event) => {
    const key = event.key;
    const currentValue = event.target.value;

    const editNavKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(key);

    if(editNavKeys) return;

    if(!regex.test(currentValue + key)) {
      event.preventDefault();
    } else if (key === '.' && currentValue.includes('.')) {
      event.preventDefault();
    }
  })
});

//Rules and functionality for onscreen keypad
document.addEventListener("DOMContentLoaded", () => {
  let activeInput = null;
  const inputs = document.querySelectorAll('.input-field');

  inputs.forEach(input => {
    input.addEventListener('click', () => {
      activeInput = input;
    });
  });

  const keys = document.querySelectorAll('.key');
  
  keys.forEach(key => {
    key.addEventListener('click', () => {      
      if(activeInput) {
        const cursorPos = activeInput.selectionStart;

        if(key.dataset.number === "back" && cursorPos > 0) {
          console.log('cursorPos: ', cursorPos);
          let inputValue = activeInput.value;
          inputValue = inputValue.slice(0, cursorPos -1) + inputValue.slice(cursorPos);
          activeInput.value = inputValue;
          activeInput.setSelectionRange(cursorPos -1, cursorPos -1);
        } else {
          if(key.dataset.number === "." && activeInput.value.includes(".")) return;
          
          if(!regex.test(activeInput.value + key.dataset.number)) return;
          
          activeInput.value += key.dataset.number;
        }
        activeInput.focus();
      }
    });
  });
});

purchaseBtn.addEventListener('click', () => {
  if(Number(totalDue.value) > Number(cashInput.value)){
    return alert("Customer does not have enough money to purchase the item");
  } else {
    register(Number(totalDue.value), Number(cashInput.value), cid);
    updateUI(registerStatus);
    changeDue = [];

    cashTransactionContainer.prepend(changeTotalDiv);
    changeTotalDiv.style.backgroundColor = 'white';
    changeTotalDiv.style.color = 'green';
    changeTotalDiv.style.fontSize = '1.2em';
    changeTotalDiv.style.fontWeight = 'bold';
    changeTotalDiv.style.borderRadius = '20px';
    changeTotalDiv.style.border = '4px solid black';
    changeDueElement.textContent = 'Change Due:';
  }
}
);

clearBtn.addEventListener('click', () => {
  totalDue.value = '';
  cashInput.value = '';
  changeTotalElement.textContent = '0';
  document.querySelectorAll('.denom-row, .status').forEach(item => {
    item.textContent = '';
  });
  changeTotalDiv.removeAttribute('style');
  cashTransactionContainer.appendChild(changeTotalDiv);

});
