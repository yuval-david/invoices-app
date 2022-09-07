import React, { useState } from 'react'
import styles from '../styles/AddInvoice.module.css'

function Form() {

    const [inv_num, setInvNumber] = useState();
    const [ammount_to_pay, setInvAmount] = useState(0);
    const [customer_name, setInvCustomer] = useState("");
    const [c_logo, setInvCustomerLogo] = useState("");
    const [date, setInvDate] = useState("");
    const [payment_status, setInvStatus] = useState(null);
    const [fileName, setInvFile] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    // Add new invoice
    const addInvoice = (e) => {
        e.preventDefault();


        // Basic Validation 
        if (inv_num && ammount_to_pay && customer_name && date != "" && payment_status != null) {
            setIsLoading(true);
            let file = fileName != "" ? fileName.split('fakepath\\')[1] : "";
            let customer_logo = c_logo != "" ? c_logo.split('fakepath\\')[1] : "";
            let invoice_number = parseInt(inv_num);
            console.log(invoice_number);

            // Fetch to Lambda function (add_invoice)
            fetch("https://sivknod5ry2qrmea2a3au2zuym0pbxos.lambda-url.us-east-1.on.aws/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    invoice_number,
                    customer_name,
                    customer_logo,
                    payment_status,
                    ammount_to_pay,
                    date,
                    file
                })
            }).then(res => {
                setIsLoading(false);
                if (res.ok) {
                    alert("Invoice successfully added 😀");
                    // Clear form
                    setInvNumber("");
                    setInvAmount(0);
                    setInvCustomer("");
                    setInvCustomerLogo("");
                    setInvDate("");
                    setInvFile("");
                    let radios = document.querySelectorAll('input[type=radio]');
                    radios.forEach((radio) => {
                        radio.checked = false;
                    })
                } else {
                    alert("Something went wrong 🧐");
                }
            })
        } else {
            alert("You need to fill all the required fields 🧐")
        }
    }

    return (
        <div>
            <form className={styles.form}>

                <div className={styles.flex_container}>
                    <div className={styles.left_side}>
                        <div className={styles.inp_div}>
                            <label htmlFor="inv_num">*Invoice number:</label>
                            <input type="number" min={0} name="inv_num" id="inv_num" value={inv_num} onChange={e => setInvNumber(e.target.value)} />
                        </div>
                        <div className={styles.inp_div}>
                            <label htmlFor="inv_amount">*Amount:</label>
                            <input type="number" min={0} name="inv_amount" id="inv_amount" value={ammount_to_pay} onChange={e => setInvAmount(e.target.value)} />
                        </div>
                        <div className={styles.inp_div}>
                            <label htmlFor="inv_customer">*Customer name:</label>
                            <input type="text" value={customer_name} name="inv_customer" id="inv_customer" onChange={e => setInvCustomer(e.target.value)} />
                        </div>
                        <div className={styles.inp_div}>
                            <label htmlFor="inv_customer">Customer logo:</label>
                            <input type="file" name="inv_customer_logo" id="inv_customer_logo" value={c_logo} onChange={e => setInvCustomerLogo(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.inp_div}>
                            <label htmlFor="inv_date">*Date:</label>
                            <input type="date" name="inv_date" id="inv_date" value={date} onChange={e => setInvDate(e.target.value)} />
                        </div>
                        <div className={styles.inp_div}>
                            <label>*Payment status:</label>
                            <div className={styles.radio_div}>
                                <input type="radio" name="inv_status" id="inv_status_1" onClick={e => setInvStatus(1)} />
                                <label htmlFor="inv_status_1">Paid</label>
                            </div>
                            <div className={styles.radio_div}>
                                <input type="radio" name="inv_status" id="inv_status_0" onClick={e => setInvStatus(0)} />
                                <label htmlFor="inv_status_0">Not Paid</label>
                            </div>
                        </div>
                        <div className={styles.inp_div}>
                            <label htmlFor="inv_file">File:</label>
                            <input type="file" value={fileName} name="inv_file" id="inv_file" onChange={e => setInvFile(e.target.value)} />
                        </div>
                    </div>
                </div>

                <button onClick={addInvoice} className={styles.btn_submit}>Submit</button>

            </form>
            {isLoading ? <div className={styles.loader}></div> : " "}
        </div>
    )
}

export default Form