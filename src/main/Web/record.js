// record.js
document.addEventListener("DOMContentLoaded", function() {
    const recordList = document.getElementById('recordList');
    let records = JSON.parse(localStorage.getItem('records')) || [];

    records.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `金额: ${record.amount}, 类型: ${record.type}, 分类: ${record.category}, 备注: ${record.note}, 支付方式: ${record.paymentMethod}`;
        recordList.appendChild(li);
    });
});
