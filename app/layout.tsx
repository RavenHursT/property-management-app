import './ui/global.css'
import {Providers} from "./providers";
import { Metadata } from 'next'
import {Link} from '@nextui-org/link'

export const metadata: Metadata = {
  title: 'Submit A Property',
  description: 'Welcome to Property Manager',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className="custom-dark">
    <body className="px-6">
    <Providers>
      <header {...{
        className: 'container mx-auto flex justify-between py-4'
      }}>
        <Link color="foreground" href="/">
          <h1 {...{
            className: 'uppercase font-bold tracking-tight text-xl'
          }}>Property Management Tool</h1>
        </Link>
        <Link href="/admin">Admin Login</Link>
      </header>
      <main className="container mx-auto items-center flex flex-col">
        {children}
      </main>
      <footer {...{
        className: 'fixed bottom-0'
      }}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo"/>
        </a>
      </footer>
    </Providers>
    </body>
    </html>
)
}
