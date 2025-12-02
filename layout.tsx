import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BNS International Inc - IT Staffing & Software Development',
  description: 'Leading IT staffing and Software Development Company. Leveraging ten years of experience in staffing and consulting to deliver client-centric, cost-effective solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}