import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const ADMIN_PASSWORD = 'anugerah2024'

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const EMPTY = { name:'', brand:'', price:'', wa_price:'', sale_price:'', cat:'', section:'all', description:'', img:'', toko_url:'', shopee_url:'', desty_url:'' }

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('list')

  useEffect(() => {
    if (authed) fetchProducts()
  }, [authed])

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
  }

  function login() {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(false) }
    else { setPwErr(true); setPw('') }
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function handleForm(field, val) {
    setForm(f => ({ ...f, [field]: val }))
  }

  async function saveProduct() {
    if (!form.name.trim()) { alert('Nama produk wajib diisi'); return }
    if (!form.cat.trim()) { alert('Kategori wajib diisi'); return }
    setLoading(true)
    const payload = {
      ...form,
      price: form.price ? +form.price : null,
      wa_price: form.wa_price ? +form.wa_price : null,
      sale_price: form.sale_price ? +form.sale_price : null,
      slug: slugify(form.name),
    }
    if (editId) {
      await supabase.from('products').update(payload).eq('id', editId)
      showToast('✓ Produk diperbarui!')
    } else {
      payload.id = 'p' + Date.now()
      await supabase.from('products').insert([payload])
      showToast('✓ Produk ditambahkan!')
    }
    setForm(EMPTY); setEditId(null); setTab('list')
    await fetchProducts()
    setLoading(false)
  }

  function startEdit(p) {
    setForm({
      name: p.name || '', brand: p.brand || '',
      price: p.price || '', wa_price: p.wa_price || '',
      sale_price: p.sale_price || '', cat: p.cat || '',
      section: p.section || 'all', description: p.description || '',
      img: p.img || '', toko_url: p.toko_url || '',
      shopee_url: p.shopee_url || '', desty_url: p.desty_url || '',
    })
    setEditId(p.id); setTab('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deleteProduct(id) {
    if (!confirm('Hapus produk ini?')) return
    await supabase.from('products').delete().eq('id', id)
    showToast('✓ Produk dihapus')
    await fetchProducts()
  }

  const filtered = products.filter(p =>
    !search || (p.name + p.brand + p.cat).toLowerCase().includes(search.toLowerCase())
  )

  if (!authed) return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl">
        <h1 className="text-xl font-extrabold text-gray-900 mb-1">Admin Panel</h1>
        <p className="text-sm text-gray-400 mb-6">Masukkan password untuk lanjut</p>
        <input
          type="password" value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="••••••••"
          className={`w-full border rounded-xl px-4 py-3 text-center text-sm tracking-widest mb-3 focus:outline-none ${pwErr ? 'border-red' : 'border-gray-200 focus:border-navy'}`}
        />
        {pwErr && <p className="text-red text-xs mb-3">Password salah. Coba lagi.</p>}
        <button onClick={login} className="w-full bg-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-dark transition-all">
          Masuk →
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-sand">
      {/* Admin nav */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-navy">ANUGERAH<span className="text-red">SPORTS</span></span>
            <span className="bg-red text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">Admin</span>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="text-xs font-semibold text-gray-400 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-all"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Tabs */}
        <div className="flex gap-2 bg-white border border-gray-100 rounded-xl p-1.5 w-fit mb-6">
          {[['list', `Daftar Produk (${products.length})`], ['form', editId ? 'Edit Produk' : 'Tambah Produk']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); if (key === 'list') { setForm(EMPTY); setEditId(null) } }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tab === key ? 'bg-navy text-white' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* LIST TAB */}
        {tab === 'list' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="text" value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cari nama / brand..."
                  className="w-full pl-8 pr-3 py-2 border border-gray-200 bg-white rounded-xl text-sm focus:outline-none focus:border-red"
                />
                <svg className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <button onClick={() => setTab('form')} className="bg-red text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-dark transition-all">
                + Tambah Produk
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-sand border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Foto</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Nama</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Brand</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Kategori</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Harga WA</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Seksi</th>
                      <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-gray-400">Belum ada produk</td></tr>
                    ) : filtered.map(p => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-sand transition-colors">
                        <td className="px-4 py-3">
                          <div className="w-10 h-10 rounded-lg bg-sand overflow-hidden flex items-center justify-center">
                            {p.img
                              ? <img src={p.img} alt="" className="w-full h-full object-contain p-1"/>
                              : <span className="text-lg">🏸</span>
                            }
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800 max-w-[180px] truncate">{p.name}</td>
                        <td className="px-4 py-3 text-red text-xs font-bold">{p.brand || '—'}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{p.cat || '—'}</td>
                        <td className="px-4 py-3 font-bold text-green-700 text-xs">
                          {p.wa_price ? 'Rp' + Number(p.wa_price).toLocaleString('id-ID') : (p.price ? 'Rp' + Number(p.price).toLocaleString('id-ID') : '—')}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.section === 'new' ? 'bg-blue-100 text-blue-700' : p.section === 'hot' ? 'bg-red/10 text-red' : p.section === 'excl' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                            {p.section === 'new' ? 'New' : p.section === 'hot' ? 'Hot' : p.section === 'excl' ? 'Excl' : 'Semua'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => startEdit(p)} className="text-xs font-semibold text-gray-500 bg-sand border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 mr-1.5 transition-all">
                            ✏️ Edit
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="text-xs font-semibold text-red bg-red/5 border border-red/20 px-2.5 py-1.5 rounded-lg hover:bg-red hover:text-white transition-all">
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FORM TAB */}
        {tab === 'form' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-extrabold text-gray-900 mb-6">{editId ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Nama Produk *</label>
                <input type="text" value={form.name} onChange={e => handleForm('name', e.target.value)}
                  placeholder="Raket Yonex Astrox 99 Play"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
              {/* Brand */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Brand *</label>
                <input type="text" value={form.brand} onChange={e => handleForm('brand', e.target.value)}
                  placeholder="Yonex"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Kategori *</label>
                <input type="text" value={form.cat} onChange={e => handleForm('cat', e.target.value)}
                  placeholder="Raket Badminton"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
              {/* Prices */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Harga Marketplace (Rp)</label>
                <input type="number" value={form.price} onChange={e => handleForm('price', e.target.value)}
                  placeholder="1499000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Harga WhatsApp (Rp) <span className="text-green-600 normal-case">— lebih murah</span>
                </label>
                <input type="number" value={form.wa_price} onChange={e => handleForm('wa_price', e.target.value)}
                  placeholder="1399000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Harga Coret (Rp) — opsional</label>
                <input type="number" value={form.sale_price} onChange={e => handleForm('sale_price', e.target.value)}
                  placeholder="1799000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
              {/* Section */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Tampilkan di</label>
                <select value={form.section} onChange={e => handleForm('section', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red bg-white">
                  <option value="all">Semua Produk</option>
                  <option value="new">New Arrival</option>
                  <option value="hot">Produk Terlaris</option>
                  <option value="excl">Exclusive Offer</option>
                </select>
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Deskripsi Produk</label>
                <textarea value={form.description} onChange={e => handleForm('description', e.target.value)}
                  placeholder="Spesifikasi, warna tersedia, ukuran, keunggulan produk..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red resize-none h-24"/>
              </div>
              {/* Image */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">URL Foto Produk</label>
                <input type="text" value={form.img} onChange={e => handleForm('img', e.target.value)}
                  placeholder="https://i.imgur.com/xxx.jpg"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
                <p className="text-xs text-gray-400 mt-1">Upload foto ke <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-red hover:underline">ImgBB.com</a> → klik kanan gambar → Copy Image Address</p>
                {form.img && (
                  <img src={form.img} alt="preview" className="mt-2 h-24 w-24 object-contain rounded-xl border border-gray-100 bg-sand p-1"/>
                )}
              </div>
              {/* Marketplace URLs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">URL Tokopedia</label>
                <input type="text" value={form.toko_url} onChange={e => handleForm('toko_url', e.target.value)}
                  placeholder="https://tokopedia.com/anugerahsportmlg/..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">URL Shopee</label>
                <input type="text" value={form.shopee_url} onChange={e => handleForm('shopee_url', e.target.value)}
                  placeholder="https://shopee.co.id/product/..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red"/>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={saveProduct}
                disabled={loading}
                className="bg-navy text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red transition-all disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : editId ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
              <button
                onClick={() => { setForm(EMPTY); setEditId(null); setTab('list') }}
                className="text-sm font-semibold text-gray-500 border border-gray-200 px-4 py-3 rounded-xl hover:border-gray-400 transition-all"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
