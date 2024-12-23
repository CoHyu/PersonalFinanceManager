// script.js
document.addEventListener("DOMContentLoaded", function() {
    // 默认显示我的账户内容
    showContent('myAccount');

    // 导航栏点击事件
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('href').substring(1);
            showContent(targetId);

            // 更新选中的链接
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 显示对应的内容区
    function showContent(id) {
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            content.style.display = 'none'; // 隐藏所有内容
            if (content.id === id) content.style.display = 'block'; // 显示目标内容
        });
    }

    // 添加记账功能
    document.getElementById('transactionForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        const typeSelect = document.getElementById('typeSelect').value;
        const categorySelect = document.getElementById('categorySelect').value;
        const note = document.getElementById('note').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        // 创建记账记录
        const record = {
            amount,
            type: typeSelect,
            category: categorySelect,
            note,
            paymentMethod
        };

        // 保存记录到 localStorage
        let records = JSON.parse(localStorage.getItem('records')) || [];
        records.push(record);
        localStorage.setItem('records', JSON.stringify(records));

        // 当支出时更新支出记录
        if (typeSelect === 'expense') {
            let expenseRecords = JSON.parse(localStorage.getItem('expenseRecords')) || [];
            expenseRecords.push(record);
            localStorage.setItem('expenseRecords', JSON.stringify(expenseRecords));
        }

        // 当收入时更新收入记录
        if (typeSelect === 'income') {
            let incomeRecords = JSON.parse(localStorage.getItem('incomeRecords')) || [];
            incomeRecords.push(record);
            localStorage.setItem('incomeRecords', JSON.stringify(incomeRecords));
        }

        // 清空输入框
        document.getElementById('amount').value = '';
        document.getElementById('note').value = '';
        document.getElementById('typeSelect').value = 'income'; // 重置选择为收入
        document.getElementById('categorySelect').value = 'salary'; // 默认选择类型
        document.getElementById('paymentMethod').value = 'cash'; // 默认选择支付方式

        // 刷新记录列表
        showRecords();
        showIncomeRecords();
        showExpenseRecords();
    });

    // 显示所有记账记录
    function showRecords() {
        const recordList = document.getElementById('recordList');
        recordList.innerHTML = ''; // 清空现有列表
        let records = JSON.parse(localStorage.getItem('records')) || [];
        records.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `金额: ${record.amount}, 类型: ${record.type}, 分类: ${record.category}, 备注: ${record.note}, 支付方式: ${record.paymentMethod}`;
            recordList.appendChild(li);
        });
    }

    // 显示收入记录
    function showIncomeRecords() {
        const incomeList = document.getElementById('incomeList');
        incomeList.innerHTML = ''; // 清空现有收入列表
        let incomeRecords = JSON.parse(localStorage.getItem('incomeRecords')) || [];
        incomeRecords.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `金额: ${record.amount}, 类型: ${record.category}, 备注: ${record.note}`;
            incomeList.appendChild(li);
        });
    }

    // 显示支出记录
    function showExpenseRecords() {
        const expenseList = document.getElementById('expenseList');
        expenseList.innerHTML = ''; // 清空现有支出列表
        let expenseRecords = JSON.parse(localStorage.getItem('expenseRecords')) || [];
        expenseRecords.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `金额: ${record.amount}, 类型: ${record.category}, 备注: ${record.note}`;
            expenseList.appendChild(li);
        });
    }
});
