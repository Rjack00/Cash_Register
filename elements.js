const getDomElements = () => {
    return {
        totalDue: document.getElementById("cost-amount"),
        cashInput: document.getElementById("cash"),
        changeTotalElement: document.getElementById("change-total"),
        purchaseBtn: document.getElementById('purchase-btn'),
        clearBtn: document.getElementById('clear-btn'),
        changeDueElement: document.getElementById('change-due'),
        cashInDrawer: document.getElementById('cash-in-drawer')
    };
}

export { getDomElements };