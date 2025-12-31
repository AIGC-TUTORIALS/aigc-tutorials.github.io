// 模拟数据库
const tradeData = {
    "2023-10-27": {
        profit: "+¥5,230",
        trades: [
            { name: "赛力斯", action: "买入", price: "82.50", result: "+3.5%", note: "均线支撑" },
            { name: "宁德时代", action: "止损", price: "192.10", result: "-1.8%", note: "破位卖出" }
        ]
    },
    "2023-10-26": {
        profit: "-¥1,100",
        trades: [
            { name: "贵州茅台", action: "卖出", price: "1750", result: "-0.5%", note: "震荡调仓" }
        ]
    }
};

// 1. 视图切换逻辑
function showView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(`view-${viewName}`).style.display = 'block';
}

// 2. 加载特定日期数据
function loadDataByDate(date) {
    const data = tradeData[date];
    const tableBody = document.getElementById('trade-table-body');
    const profitEl = document.getElementById('day-profit');
    
    if (data) {
        profitEl.innerText = data.profit;
        profitEl.className = data.profit.includes('+') ? 'profit' : 'loss';
        
        tableBody.innerHTML = data.trades.map(t => `
            <tr>
                <td><b>${t.name}</b></td>
                <td>${t.action}</td>
                <td>${t.price}</td>
                <td class="${t.result.includes('+') ? 'profit' : 'loss'}">${t.result}</td>
                <td>${t.note}</td>
            </tr>
        `).join('');
    } else {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center">该日无交易记录</td></tr>';
        profitEl.innerText = "¥0";
        profitEl.className = "";
    }
}

// 3. 从首页跳转到详情
function viewDate(date) {
    document.getElementById('review-date').value = date;
    loadDataByDate(date);
    showView('detail');
}

// 初始化加载
window.onload = () => {
    loadDataByDate("2023-10-27");
};
