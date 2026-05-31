import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1400&q=80&fit=crop',
    tag: 'Toko Olahraga Malang · Est. 1974',
    title: 'Peralatan Badminton',
    highlight: 'Terlengkap di Malang',
    desc: 'Lebih dari 50 tahun melayani atlet & pecinta olahraga. Produk 100% original langsung dari distributor resmi.',
  },
  {
    img: 'https://dkjulgymkya8y.cloudfront.net/images/b7f63bcf-1c3f-4f60-a9ec-c5a62a14b52e.jpg',
    tag: 'New Arrival 2025',
    title: 'Raket Terbaru',
    highlight: 'Yonex & Victor',
    desc: 'Koleksi raket badminton terbaru dari brand dunia. Teknologi terkini untuk performa terbaik Anda.',
  },
  {
    img: 'https://us.yonex.com/cdn/shop/files/ChatGPT_Image_Mar_25_2026_04_47_27_PM.png?v=1774482460&width=1400',
    tag: 'Exclusive Offer',
    title: 'Sepatu Badminton',
    highlight: 'Diskon Spesial',
    desc: 'Dapatkan penawaran terbaik untuk sepatu badminton & tenis. Stok terbatas, pesan sekarang!',
  },
]

const STATS = [
  { n: '50+', label: 'Tahun Berdiri' },
  { n: '4.5★', label: 'Google Rating' },
  { n: '77rb+', label: 'Produk Terjual' },
  { n: '660+', label: 'Ulasan Pelanggan' },
]

const WHY = [
  { icon: '✅', title: '100% Produk Original', desc: 'Anugerah Sports hanya menjual produk original. Distributor resmi Yonex, Victor, Li-Ning sejak 1974.' },
  { icon: '⭐', title: 'Terpercaya Sejak 1974', desc: 'Lebih dari 50 tahun melayani pelanggan setia di Malang dan seluruh Indonesia. Rating 5.0★ Tokopedia.' },
  { icon: '🎯', title: 'Stringing Profesional', desc: 'Layanan pasang senar raket profesional menggunakan mesin digital terkalibrasi. Berpengalaman 30+ tahun.' },
  { icon: '🚚', title: 'Online & Offline', desc: 'Kunjungi toko kami di Jl. Ade Irma Suryani No.3, Malang — atau pesan via WA, Tokopedia, Shopee.' },
]

export default function Home({ newProducts, hotProducts }) {
  const [slide, setSlide] = useState(0)
  const WA = process.env.NEXT_PUBLIC_WA_NUMBER || '6285755000069'

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      {/* ── HERO SLIDER ── */}
      <section className="relative h-[520px] md:h-[580px] bg-black overflow-hidden">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.img} alt={s.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent"/>
            <div className="absolute inset-0 flex items-end pb-16 px-8 md:px-16 max-w-2xl">
              <div>
                <p className="text-[11px] font-bold tracking-[3px] uppercase text-white/50 mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-red inline-block"/>
                  {s.tag}
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
                  {s.title}<br/><span className="text-red">{s.highlight}</span>
                </h1>
                <p className="text-sm text-white/60 mb-6 leading-relaxed max-w-sm">{s.desc}</p>
                <div className="flex gap-3 flex-wrap">
                  <Link href="/catalog" className="btn-red">Lihat Produk →</Link>
                  <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="btn-outline">Chat WA</a>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Arrows */}
        <button onClick={() => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white text-xl flex items-center justify-center hover:bg-white/30 transition-all">‹</button>
        <button onClick={() => setSlide(s => (s + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white text-xl flex items-center justify-center hover:bg-white/30 transition-all">›</button>
        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${i === slide ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}/>
          ))}
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <div className="bg-sand border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i} className={`py-4 px-6 text-center ${i < 3 ? 'border-r border-gray-200' : ''}`}>
              <p className="text-2xl font-extrabold text-gray-900">{s.n}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEW ARRIVAL ── */}
      {newProducts.length > 0 && (
        <section className="py-14 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="section-title">New Arrival</h2>
                <div className="section-underline mx-0"/>
              </div>
              <Link href="/catalog?section=new" className="text-sm font-semibold text-gray-400 hover:text-red transition-colors">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {newProducts.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        </section>
      )}

      {/* ── HOT PRODUCTS ── */}
      {hotProducts.length > 0 && (
        <section className="py-14 bg-sand">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="section-title">Produk Terlaris</h2>
                <div className="section-underline mx-0"/>
              </div>
              <Link href="/catalog?section=hot" className="text-sm font-semibold text-gray-400 hover:text-red transition-colors">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {hotProducts.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY CHOOSE US ── */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold uppercase tracking-wide text-white mb-2">Kenapa Pilih Anugerah Sports?</h2>
            <div className="w-10 h-0.5 bg-blue-400 rounded mx-auto"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, i) => (
              <div key={i} className="text-center px-4 py-6">
                <div className="text-4xl mb-4">{w.icon}</div>
                <h3 className="text-xs font-extrabold tracking-widest uppercase text-white mb-3">{w.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div className="rounded-2xl overflow-hidden aspect-video">
              <img
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80&fit=crop"
                alt="Anugerah Sports"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-2 flex items-center gap-2">
                <span className="w-4 h-px bg-red inline-block"/> Tentang Kami
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">Terpercaya Sejak 1974</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Anugerah Sports adalah toko peralatan olahraga yang telah berdiri sejak <strong className="text-gray-800">tahun 1974</strong> di Malang, Jawa Timur. Selama lebih dari 50 tahun kami melayani atlet dan pecinta olahraga dengan produk 100% original.
              </p>
              <blockquote className="text-base font-bold italic text-gray-800 border-l-4 border-red pl-4 leading-snug mb-6">
                "Toko Olahraga terpercaya sejak tahun 1974 — ORIGINAL ONLY"
              </blockquote>
              <a
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
              >
                💬 Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps() {
  const [{ data: newProducts }, { data: hotProducts }] = await Promise.all([
    supabase.from('products').select('*').eq('section', 'new').limit(10),
    supabase.from('products').select('*').eq('section', 'hot').limit(10),
  ])
  return {
    props: {
      newProducts: newProducts || [],
      hotProducts: hotProducts || [],
    },
  }
}
