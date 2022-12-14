import { useRouter } from 'next/router'
import Link from 'next/dist/client/link';
import Image from 'next/image';
import Head from 'next/head'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Invoice = ({ invoice }) => {

    const router = useRouter();
    let inv_num = router.query.id;
    let colorClass, status;
    const logosPath = '/images/customers/';

    if (invoice.payment_status) {
        colorClass = "green";
        status = "PAID";
    } else {
        colorClass = "red";
        status = "NOT PAID";
    }

    return (
        <div className='container'>
            <Head>
                <title>Invoice details</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="main">

                <Navbar />
                <h1>Invoice Number: {inv_num}</h1>
                <div className='invoice-main-container'>
                    <div className='invoic-data-container'>
                        <div className='data-block'>
                            <label>Amount: </label>
                            <span>{invoice.ammount_to_pay}$</span>
                        </div>
                        <div className='data-block'>
                            <label>Date: </label>
                            <span>{invoice.date}</span>
                        </div>
                        <div className="data-block">
                            <label>Payment Status: </label>
                            <span className={`bold ${colorClass}`}>{status}</span>
                        </div>
                        <div className='data-block'>
                            <label>Customer: </label>
                            <span>{invoice.customer_name}</span>
                        </div>

                        {invoice.file ?
                            <div className='data-block'>
                                <label>Invoice pdf file: </label>
                                <span>
                                    <a style={{ textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" href={`/files/${invoice.file}`}>{invoice.file}</a>
                                </span>
                            </div>
                            : ""}

                    </div>

                    <div className='customer-data-container'>
                        <div className='customer-img'>
                            {invoice.customer_logo ? <Image
                                src={logosPath + invoice.customer_logo}
                                alt="logo"
                                layout='responsive'
                                width={7}
                                height={7}
                            /> : ""}
                        </div>

                    </div>
                </div>


                <Link href='/'>
                    <a className='btn-back'>Back to Invoices Dashboard</a>
                </Link>

            </main>
            <Footer />
        </div>
    )

}

export default Invoice


export async function getServerSideProps(context) {
    const { params } = context;
    const invoiceNumber = params.id;

    const res = await fetch(`https://un3xyrmx5b5i75oplstwznzpku0rifif.lambda-url.us-east-1.on.aws/?inv_num=${invoiceNumber}`)
    const data = await res.json();
    let invoice = data.invoice;

    return {
        props: {
            invoice,
        },
    }
}