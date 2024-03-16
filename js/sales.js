function getSales(period) {
    console.log(`Sales Details for ${period}:`);
    const today = new Date();
    let counter = 0;

    // Calculate the start and end dates based on the selected period
    let startDate, endDate;
    if (period === 'day') {
        startDate = new Date(today);
        endDate = new Date(today);
    } else if (period === 'week') {
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - startDate.getDay() + (startDate.getDay() === 0 ? -6 : 1)); // Adjust start date to Sunday if it's currently Sunday
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // Adjust end date to Saturday
    } else if (period === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else {
        console.error("Invalid period specified.");
        return;
    }

    // Query sales collection and filter by the selected period
    db.collection("sales")
        .where("date", ">=", startDate)
        .where("date", "<=", endDate)
        .get()
        .then((itemSnapshot) => {
            const sortedSales = [];
            itemSnapshot.forEach((itemDoc) => {
                const docId = itemDoc.id;
                const itemData = itemDoc.data();
                const date = itemData.date.toDate();
                sortedSales.push({
                    docId: docId,
                    customerId: itemData.customerId,
                    tableId: itemData.tableId,
                    total: itemData.total,
                    date: date
                });
            });
            // Sort sales by date and time in descending order
            sortedSales.sort((a, b) => b.date - a.date);
            sortedSales.forEach((sale) => {
                const newDate = sale.date.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: '2-digit'
                });
                const hours = sale.date.getHours() % 12 || 12;
                const minutes = sale.date.getMinutes();
                const amPm = sale.date.getHours() >= 12 ? 'PM' : 'AM';
                const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
                counter++;
                appendSale(sale.docId, sale.customerId, sale.tableId, sale.total, newDate, time);
            });
        })
        .catch((error) => {
            console.error("Error getting sales:", error);
        });
}
// Appending the Sale
function appendSale(docId, customerId, tableId, total, date, time){
    // console.log(docId);
    document.querySelector(`#sales-items`).innerHTML += `
        <tr>
            <td>${date}</td>
            <td>${customerId}</td>
            <td>${tableId}</td>
            <td>${total}</td>
            <td>${time}</td>
            <td><button class="btn btn-sm btn-success list-button" id="${docId}" onclick="getDetails('${docId}', 'sales')">Confirm</button></td>
        </tr>
    `;
}

// Example usage:
// getSales('week'); // Get sales for the current day
// getSales('week'); // Get sales for the current week
getSales('month'); // Get sales for the current month