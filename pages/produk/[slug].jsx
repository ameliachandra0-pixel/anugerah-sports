import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import ProductCard from '../../components/ProductCard'
import { useCart } from '../../context/CartContext'

function fmt(n) {
  if (!n) return null
  return 'Rp' + Number(n).toLocaleString('id-ID')
}

export default function ProductDetail({ product, related }) {
  const { addItem, setIsOpen } = useCart()
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [added, setAdded] = useState(false)
  const WA = process.env.NEXT_PUBLIC_WA_NUMBER || '6285755000069'

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-extrabold text-gray-800 mb-2">Produk tidak ditemukan</p>
        <Link href="/catalog" className="text-red font-semibold hover:underline">← Kembali ke Katalog</Link>
      </div>
    </div>
  )

  const hasWA = product.wa_price > 0
  const hasMarket = product.price > 0
  const hasSale = product.sale_price > 0 && product.sale_price < product.price
  const savings = hasWA && hasMarket && product.wa_price < product.price
    ? product.price - product.wa_price : 0
  const savePct = savings ? Math.round(savings / product.price * 100) : 0

  function handleAddCart() {
    addItem(product, qty, note)
    setAdded(true)
    setIsOpen(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleOrderWA() {
    const waPrice = hasWA ? fmt(product.wa_price) : null
    const marketPrice = hasMarket ? fmt(product.price) : null
    let msg = `Halo Anugerah Sports! 👋\n\nSaya ingin memesan:\n📦 *${product.name}*\n`
    if (product.brand) msg += `Brand: ${product.brand}\n`
    if (waPrice) msg += `Harga WA: *${waPrice}*\n`
    else if (marketPrice) msg += `Harga: ${marketPrice}\n`
    else msg += `Harga: mohon konfirmasi\n`
    msg += `Jumlah: ${qty} pcs\n`
    if (note) msg += `Catatan: ${note}\n`
    msg += `\nMohon konfirmasi stok & ongkos kirim. Terima kasih! 🙏`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-sand border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-red transition-colors">Beranda</Link>
          <span>›</span>
          <Link href="/catalog" className="hover:text-red transition-colors">Produk</Link>
          {product.cat && <>
            <span>›</span>
            <Link href={`/catalog?cat=${product.cat}`} className="hover:text-red transition-colors">{product.cat}</Link>
          </>}
          <span>›</span>
          <span className="text-gray-700 font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="bg-sand rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
            {product.img
              ? <img src={product.img} alt={product.name} className="w-full h-full object-contain p-8"/>
              : <span className="text-9xl opacity-10">🏸</span>
            }
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-extrabold tracking-[2px] uppercase text-red mb-1">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>
              {product.cat && (
                <Link href={`/catalog?cat=${product.cat}`}
                  className="inline-block mt-2 text-xs bg-sand border border-gray-200 rounded-full px-3 py-1 text-gray-500 hover:border-red hover:text-red transition-all">
                  {product.cat}
                </Link>
              )}
            </div>

            {/* Price block */}
            <div className="flex flex-col gap-2">
              {hasWA && (
                <div className="bg-green-50 border-2 border-green-300 rounded-xl px-5 py-4">
                  <p className="text-[10px] font-extrabold tracking-widest uppercase text-green-700 mb-1">🎯 Harga WhatsApp — Lebih Murah!</p>
                  <p className="text-3xl font-extrabold text-green-900">{fmt(product.wa_price)}</p>
                  {savings > 0 && (
                    <p className="text-sm text-green-700 mt-1">
                      Hemat {fmt(savings)} ({savePct}%) dibanding marketplace
                    </p>
                  )}
                </div>
              )}
              {hasMarket && (
                <div className="flex items-center gap-3 bg-sand rounded-xl px-4 py-3">
                  <span className="text-xs font-bold text-gray-400">Harga Marketplace</span>
                  <span className={`text-base font-bold ${hasWA ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {fmt(hasSale ? product.sale_price : product.price)}
                  </span>
                  {hasSale && !hasWA && (
                    <span className="text-sm text-gray-400 line-through">{fmt(product.price)}</span>
                  )}
                  {hasMarket && !hasWA && <span className="text-xs text-gray-400">Tokopedia / Shopee</span>}
                </div>
              )}
              {!hasWA && !hasMarket && (
                <p className="text-lg font-bold text-gray-400">Hubungi kami untuk harga</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                {product.description}
              </p>
            )}

            {/* Order form */}
            <div className="bg-sand rounded-xl p-4 flex flex-col gap-3">
              <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Jumlah Pesanan</p>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-fit bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-sand text-lg">−</button>
                <input
                  type="number" value={qty} min={1} max={99}
                  onChange={e => setQty(Math.max(1, Math.min(99, +e.target.value)))}
                  className="w-14 h-10 text-center font-bold border-x border-gray-200 focus:outline-none bg-white text-sm"
                />
                <button onClick={() => setQty(q => Math.min(99, q + 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-sand text-lg">+</button>
              </div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Catatan (opsional)</p>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Ukuran, warna, tipe, info tambahan..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none h-16 focus:outline-none focus:border-red bg-white"
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleAddCart}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${added ? 'bg-green-500 text-white' : 'bg-navy text-white hover:bg-red hover:-translate-y-0.5'}`}
              >
                {added ? '✓ Ditambahkan ke Keranjang!' : '🛒 Tambah ke Keranjang'}
              </button>
              <button
                onClick={handleOrderWA}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.986l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.045-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.86 9.86 0 012.106 12C2.106 6.561 6.561 2.106 12 2.106c5.438 0 9.894 4.455 9.894 9.894 0 5.438-4.456 9.894-9.894 9.894z"/></svg>
                Pesan via WhatsApp
              </button>

              {/* Marketplace links */}
              {(product.toko_url || product.shopee_url || product.desty_url) && (
                <div className="flex gap-2 mt-1">
                  {product.toko_url && (
                    <a href={product.toko_url} target="_blank" rel="noreferrer"
                      className="flex-1 text-center border border-gray-200 rounded-xl py-2.5 text-sm font-bold text-gray-600 hover:bg-sand transition-all">
                      Beli di Tokopedia
                    </a>
                  )}
                  {product.shopee_url && (
                    <a href={product.shopee_url} target="_blank" rel="noreferrer"
                      className="flex-1 text-center border border-gray-200 rounded-xl py-2.5 text-sm font-bold text-gray-600 hover:bg-sand transition-all">
                      Beli di Shopee
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="section-title">Produk Terkait</h2>
              <div className="section-underline mx-0"/>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .limit(1)

  const product = products?.[0] || null

  let related = []
  if (product) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('cat', product.cat)
      .neq('id', product.id)
      .limit(5)
    related = data || []
  }

  return { props: { product, related } }
}
