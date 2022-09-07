import React from 'react';
import Image from 'next/image';
import Link from 'next/dist/client/link';
import styles from '../styles/InvoiceCard.module.css';
import deleteIcon from '../public/images/icons/delete.png';
import linkIcon from '../public/images/icons/link.png';
import { useRouter } from 'next/router';

export default function InvoiceCard(props) {

    const router = useRouter()
    let invoice = props.invoice;
    let colorClass, status;
    const logosPath = '/images/customers/';

    if (invoice.payment_status) {
        colorClass = styles.green;
        status = "Paid";
    } else {
        colorClass = styles.red;
        status = "Not Paid";
    }

    // Delete exsisting invoice (by invoice number)
    const deleteInvoice = async (event) => {
        let invId = event.target.closest('div').id;    

        // Fetch to Lambda function (delete_invoice)
        fetch(`https://w2me36hcqsgplrmdhmjcub3r2m0mqxlm.lambda-url.us-east-1.on.aws/?inv_num=${invId}`, { method: 'DELETE' })
            .then((res) => {
                if (res.ok) {
                    alert(`Invoice number: ${invId} deleted successfully`);
                    router.reload(window.location.pathname);
                } else {
                    alert("something went wrong..");
                }
            });
    }

    return (
        <div className={`${styles.invoice_card} card-inv`} id={invoice ? invoice.invoice_number : "id"}>
            <button onClick={deleteInvoice} className={styles.delete_btn} title="delete invoice">
                <Image src={deleteIcon} alt="delete" />
            </button>
            <Link href={`/invoices/${invoice.invoice_number}`} title="invoice page">
                <a className={styles.link_btn} >
                    <Image src={linkIcon} alt="link" />
                </a>
            </Link>


            <div className={styles.details_div}>
                <div className={styles.info_row}>
                    <label>Invoice number: </label>
                    <span>{invoice.invoice_number}</span>
                </div>
                <div className={styles.info_row}>
                    <label>Amount: </label>
                    <span>{invoice.ammount_to_pay}$</span>
                </div>
                <div className={styles.info_row}>
                    <label>Status: </label>
                    <span className={colorClass} style={{ fontWeight: 'bold' }}>{status}</span>
                </div>
                <div className={styles.info_row}>
                    <label>Date: </label>
                    <span>{invoice.date}</span>
                </div>
                <div className={styles.info_row}>
                    {invoice.file ? <label>File: </label> : ""}
                    <span>
                        <a style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" href={`/files/${invoice.file}`}>{invoice.file}</a>
                    </span>
                </div>
            </div>

            <div className={styles.customer_div}>
                <div className={styles.customer_container}>
                    <div className={styles.logo_customer}>
                        {invoice.customer_logo ? <Image
                            src={logosPath + invoice.customer_logo}
                            alt="logo"
                            layout='responsive'
                            width={7}
                            height={7}
                        /> : ""}

                    </div>
                    <div className={styles.customer_name}>{invoice.customer_name}</div>
                </div>
            </div>

        </div>
    )
}
