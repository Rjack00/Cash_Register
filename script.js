const cashInput = document.getElementById('cash');
const changeDueElement = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const totalDue = document.getElementById("cost-amount");

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
}

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


console.log(cidReversed[1][0]);

const register = (cashAmnt) => {
  if(!cashAmnt) {
    return;
  }
  let cidReversed = [...cid].reverse();
  
  

}