const getDomElements = () => {
    return {
        totalDue: document.getElementById("cost-amount"),
        cashInput: document.getElementById("cash"),
        changeTotalElement: document.getElementById("change-total"),
        purchaseBtn: document.getElementById('purchase-btn'),
        clearBtn: document.getElementById('clear-btn'),
        changeDueElement: document.getElementById('change-due'),
        cashInDrawer: document.getElementById('cash-in-drawer'),
        key1: document.getElementById('key1'),
        key2: document.getElementById('key2'),
        key3: document.getElementById('key3'),
        key4: document.getElementById('key4'),
        key5: document.getElementById('key5'),
        key6: document.getElementById('key6'),
        key7: document.getElementById('key7'),
        key8: document.getElementById('key8'),
        key9: document.getElementById('key9'),
        decimal: document.getElementById('decimal'),
        key0: document.getElementById('key0'),
        backspace: document.getElementById('backspace')
    };
}

export { getDomElements };