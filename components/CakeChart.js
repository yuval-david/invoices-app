import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);
import styles from '../styles/CakeChart.module.css';


export default function CakeChart({ paid, notpaid }) {

    // Data Object for the Cake Chart
    const data = {
        labels: [
            'Paid',
            'Not Paid'
        ],
        datasets: [{
            data: [paid.length, notpaid.length], //Amount of paid and not paid invoices
            backgroundColor: [
                '#D9F8C4',
                '#F37878',
            ],
            hoverBackgroundColor: [
                'green',
                'red',
            ]
        }]
    };


    return (
        <div className={styles.cake_diagram}>
            <Doughnut data={data} width={100} height={100} />
        </div>
    )
}
