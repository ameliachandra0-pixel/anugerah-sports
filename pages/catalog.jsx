import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

const PER_PAGE = 16

export default function Catalog({ products, categories, brands }) {
  const router = useRouter()
  const [activeCat, setActiveCat] = useState('Semua')
  const [activeBrand, setActiveBrand] = useState('Semua')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Read URL params on load
  useEffect(() => {
    if (router.query.cat) setActiveCat(router.query.cat)
    if (router.query.brand) setActiveBrand(router.query.brand)
    if (router.query.section) {
      // handled via filtering below
    }
  }, [router.query])

  // Filter
  let filtered = [...products]
  if (router.query.section) filtered = filtered.filter(p => p.section === router.query.section)
  if (activeCat !== 'Semua') filtered = filtered.filter(p => p.cat === activeCat)
  if (activeBrand !== 'Semua') filtered = filtered.filter(p => p.brand === activeBrand)
  if (search) filtered = filtered.filter(p =>
    (p.name + p.brand + p.cat).toLowerCase().includes(search.toLowerCase())
  )
  if (sort === 'price-asc') filtered.sort((a, b) => (a.wa_price || a.price || 0) - (b.wa_price || b.price || 0))
  else if (sort === 'price-desc') filtered.sort((a, b) => (b.wa_price || b.price || 0) - (a.wa_price || a.price || 0))
  else if (sort === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name))

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  function setCat(c) { setActiveCat(c); setPage(1); setSidebarOpen(false) }
  function setBrand(b) { setActiveBrand(b); setPage(1); setSidebarOpen(false) }
  function clearFilters() { setActiveCat('Semua'); setActiveBrand('Semua'); setSort(''); setSearch(''); setPage(1) }

  const hasFilters = activeCat !== 'Semua' || activeBrand !== 'Semua' || sort || search

  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Cari Produk</p>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Nama produk, brand..."
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red"
          />
          <svg className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Urutkan</p>
        <div className="flex flex-col gap-1">
          {[['', 'Default'], ['price-asc', 'Harga Termurah'], ['price-desc', 'Harga Termahal'], ['name-asc', 'Nama A–Z']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => { setSort(val); setPage(1) }}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-all ${sort === val ? 'bg-navy text-white font-bold' : 'text-gray-600 hover:bg-sand'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Kategori</p>
        <div className="flex flex-col gap-0.5">
          {['Semua', ...categories].map(c => {
            const count = c === 'Semua' ? products.length : products.filter(p => p.cat === c).length
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-all ${activeCat === c ? 'bg-red/10 text-red font-bold' : 'text-gray-600 hover:bg-sand'}`}
              >
                <span>{c}</span>
                <span className={`text-xs ${activeCat === c ? 'text-red' : 'text-gray-400'}`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Brand */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Brand</p>
        <div className="flex flex-col gap-0.5">
          {['Semua', ...brands].map(b => {
            const count = b === 'Semua' ? products.length : products.filter(p => p.brand === b).length
            return (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`flex items-center justify-between text-sm px-3 py-2 rounded-lg transition-all ${activeBrand === b ? 'bg-red/10 text-red font-bold' : 'text-gray-600 hover:bg-sand'}`}
              >
                <span>{b}</span>
                <span className={`text-xs ${activeBrand === b ? 'text-red' : 'text-gray-400'}`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {hasFilters && (
        <button onClick={clearFilters} className="text-sm text-red font-semibold hover:underline text-left">
          ✕ Hapus semua filter
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Semua Produk</h1>
          <p className="text-sm text-gray-400 mt-1">
            {hasFilters
              ? `${filtered.length} produk ditemukan`
              : `${products.length} produk tersedia`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter bar */}
            <div className="flex items-center gap-3 mb-5 lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
                Filter
                {hasFilters && <span className="bg-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">!</span>}
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Cari produk..."
                  className="w-full pl-8 pr-3 py-2.5 border border-gray-200 bg-white rounded-xl text-sm focus:outline-none focus:border-red"
                />
                <svg className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <select
                value={sort}
                onChange={e => { setSort(e.target.value); setPage(1) }}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 focus:outline-none focus:border-red"
              >
                <option value="">Urutkan</option>
                <option value="price-asc">Termurah</option>
                <option value="price-desc">Termahal</option>
                <option value="name-asc">A–Z</option>
              </select>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCat !== 'Semua' && (
                  <span className="flex items-center gap-1 bg-red text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {activeCat}
                    <button onClick={() => setCat('Semua')} className="ml-1 opacity-70 hover:opacity-100">✕</button>
                  </span>
                )}
                {activeBrand !== 'Semua' && (
                  <span className="flex items-center gap-1 bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {activeBrand}
                    <button onClick={() => setBrand('Semua')} className="ml-1 opacity-70 hover:opacity-100">✕</button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {paged.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <p className="font-bold text-gray-600">Produk tidak ditemukan</p>
                <p className="text-sm">Coba kata kunci lain atau hapus filter</p>
                <button onClick={clearFilters} className="mt-2 text-sm text-red font-semibold hover:underline">Hapus semua filter</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paged.map(p => <ProductCard key={p.id} product={p}/>)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 disabled:opacity-30 hover:bg-sand transition-all"
                >‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                  .reduce((acc, n, idx, arr) => {
                    if (idx > 0 && n - arr[idx - 1] > 1) acc.push('...')
                    acc.push(n)
                    return acc
                  }, [])
                  .map((n, i) => n === '...'
                    ? <span key={i} className="px-2 text-gray-400">…</span>
                    : (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-9 h-9 rounded-lg border text-sm font-bold transition-all ${page === n ? 'bg-navy border-navy text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-sand'}`}
                      >{n}</button>
                    )
                  )
                }
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 disabled:opacity-30 hover:bg-sand transition-all"
                >›</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}/>
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <span className="font-extrabold text-gray-900">Filter Produk</span>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-gray-400">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const all = products || []
  const categories = [...new Set(all.map(p => p.cat).filter(Boolean))].sort()
  const brands = [...new Set(all.map(p => p.brand).filter(Boolean))].sort()

  return { props: { products: all, categories, brands } }
}
