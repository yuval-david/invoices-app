import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);


function BarChart({ paid, notpaid }) {

    console.log(paid);
    console.log(notpaid);

    // Function to sum the amounts (payment) of all invoices in the array
    const sumAmount = (invoicesArr) => {
        let sum = 0;
        invoicesArr.forEach(inv => {
            sum += parseInt(inv.ammount_to_pay);
        });
        return sum;
    }

    // Results of amounts for Paid and Not paid invoices arrays
    const invoicesPaidAmount = sumAmount(paid);
    const invoicesNotPaidAmount = sumAmount(notpaid);

    // Data Object for the Bar Chart
    const data = {
        labels: ['Paid', 'Not paid'],
        datasets: [{
            label: 'Payment ($)',
            data: [invoicesPaidAmount, invoicesNotPaidAmount],
            backgroundColor: [
                '#D9F8C4',
                '#F37878',
            ],
            borderColor: [
                'green',
                'red',
            ],
            borderWidth: 1
        }]
    }

    return (
        <div>
            <Bar
                data={data}
                width={400}
                height={200}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default BarChart