import React, { useEffect, useContext } from 'react'
import InvoiceCard from './InvoiceCard';
import styles from '../styles/InvoiceList.module.css';
import { InvoicesContext } from '../context/InvoicesContext';


export default function InvoicesList({ invoicesArr }) {

    const invoicesCards = invoicesArr.map((card) => {
        return (
            <InvoiceCard invoice={card} key={card._id} />
        )
    });


    return (
        <div className={styles.invoices_list_component}>
            {invoicesCards}
        </div>
    )
}
