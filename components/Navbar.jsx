import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const WA = process.env.NEXT_PUBLIC_WA_NUMBER || '6285755000069'

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/catalog', label: 'Produk' },
    { href: '/tentang', label: 'Tentang' },
  ]

  return (
    <>
      {/* Top bar */}
      <div className="bg-sand text-xs font-bold tracking-widest uppercase text-gray-400 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between">
          <span>Anugerah Sports — Toko Olahraga Malang Sejak 1974</span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (0341) 326217
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-5">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-extrabold text-xl text-navy tracking-tight">
            ANUGERAH<span className="text-red">SPORTS</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 h-16 flex items-center text-sm font-bold transition-colors border-b-2 ${
                  router.pathname === l.href
                    ? 'text-gray-900 border-red'
                    : 'text-gray-400 border-transparent hover:text-gray-900'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <Link href="/catalog" className="w-9 h-9 rounded-lg bg-sand border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-white hover:border-gray-300 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-9 h-9 rounded-lg bg-sand border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-white hover:border-gray-300 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* WA button */}
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 bg-red text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-red-dark hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
              Pesan via WA
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-lg bg-sand border border-gray-100 flex flex-col items-center justify-center gap-1"
              onClick={() => setMobileOpen(true)}
            >
              <span className="w-4 h-px bg-gray-700 rounded"/>
              <span className="w-4 h-px bg-gray-700 rounded"/>
              <span className="w-4 h-px bg-gray-700 rounded"/>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)}/>
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="font-extrabold text-navy">ANUGERAH<span className="text-red">SPORTS</span></span>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-gray-400">✕</button>
            </div>
            <div className="flex-1 py-2">
              {links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-5 py-4 text-sm font-bold text-gray-700 border-b border-gray-50 hover:bg-sand"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t flex flex-col gap-3">
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-red text-white py-3 rounded-lg text-sm font-bold"
              >
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
