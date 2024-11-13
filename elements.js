const getDomElements = () => {
    return {
        totalDue: document.getElementById("cost-amount"),
        cashInput: document.getElementById("cash"),
        changeTotalElement: document.getElementById("change-total"),
        purchaseBtn: document.getElementById('purchase-btn'),
        changeDueElement: document.getElementById('change-due')
    };
}

export { getDomElements };