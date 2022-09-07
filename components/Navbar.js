import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import montoLogo from '../public/images/monto.jpg'

export default function Navbar() {
    return (
        <div className='navbar-container'>
            <nav>
                <Link href="/">Invoices</Link>
                <Link href="/dataAnalysis">Data Analysis</Link>
                <Link href="/addInvoice">Add new invoice</Link>
            </nav>

            <div className='logo-nav'>
                <Image
                    src={montoLogo}
                    alt="Monto logo"
                />
            </div>
        </div>
    )
}
