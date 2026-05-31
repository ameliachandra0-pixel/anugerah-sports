import Link from 'next/link'
import { useCart } from '../context/CartContext'

function fmt(n) {
  if (!n) return null
  return 'Rp' + Number(n).toLocaleString('id-ID')
}

export default function ProductCard({ product }) {
  const { addItem, setIsOpen } = useCart()

  function handleAddCart(e) {
    e.preventDefault()
    addItem(product, 1, '')
    setIsOpen(true)
  }

  const hasWA = product.wa_price > 0
  const hasMarket = product.price > 0
  const hasSale = product.sale_price > 0 && product.sale_price < product.price
  const discPct = hasSale ? Math.round((1 - product.sale_price / product.price) * 100) : 0

  return (
    <Link href={`/produk/${product.slug}`} className="group bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative bg-sand aspect-square flex items-center justify-center overflow-hidden">
        {product.img ? (
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="text-5xl opacity-10">🏸</span>
        )}
        {discPct > 0 && (
          <span className="absolute top-0 right-0 bg-navy text-white text-[10px] font-extrabold px-2.5 py-1">
            -{discPct}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{product.brand}</p>
        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 flex-1">{product.name}</p>

        {/* Price */}
        {hasWA ? (
          <div className="bg-green-50 border border-green-200 rounded-lg px-2.5 py-1.5 mt-1">
            <p className="text-[9px] font-extrabold tracking-widest uppercase text-green-700">Harga WA</p>
            <p className="text-base font-extrabold text-green-900">{fmt(product.wa_price)}</p>
            {hasMarket && (
              <p className="text-[10px] text-gray-400 line-through">{fmt(product.price)}</p>
            )}
          </div>
        ) : hasMarket ? (
          <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
            {hasSale && <span className="text-xs text-gray-400 line-through">{fmt(product.price)}</span>}
            <span className={`text-base font-extrabold ${hasSale ? 'text-red' : 'text-gray-900'}`}>
              {fmt(hasSale ? product.sale_price : product.price)}
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-1">Hubungi Kami</p>
        )}

        {/* Button */}
        <button
          onClick={handleAddCart}
          className="mt-2 w-full bg-navy text-white text-xs font-bold py-2 rounded-lg hover:bg-red transition-colors flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Pesan via WA
        </button>
      </div>
    </Link>
  )
}
