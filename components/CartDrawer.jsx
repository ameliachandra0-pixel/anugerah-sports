import { useCart } from '../context/CartContext'

const WA = process.env.NEXT_PUBLIC_WA_NUMBER || '6285755000069'

function fmt(n) {
  if (!n) return 'Tanya Harga'
  return 'Rp' + Number(n).toLocaleString('id-ID')
}

export default function CartDrawer() {
  const { cart, removeItem, updateQty, totalItems, totalPrice, isOpen, setIsOpen } = useCart()

  function checkoutWA() {
    if (!cart.length) return
    let msg = 'Halo Anugerah Sports! 👋\n\nSaya ingin memesan:\n\n'
    cart.forEach((item, i) => {
      const p = item.wa_price || item.sale_price || item.price
      const priceStr = p ? 'Rp' + Number(p).toLocaleString('id-ID') : 'tanya harga'
      msg += `${i + 1}. *${item.name}*\n`
      if (item.brand) msg += `   Brand: ${item.brand}\n`
      msg += `   Harga: ${priceStr}\n   Jumlah: ${item.qty} pcs\n`
      if (item.note) msg += `   Catatan: ${item.note}\n`
      msg += '\n'
    })
    if (totalPrice) msg += `*Total Estimasi: Rp${Number(totalPrice).toLocaleString('id-ID')}*\n\n`
    msg += 'Mohon konfirmasi stok & ongkos kirim. Terima kasih! 🙏'
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}/>
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-extrabold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Keranjang ({totalItems})
          </h2>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-sand flex items-center justify-center text-gray-400 hover:bg-gray-100">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p className="font-bold text-gray-600">Keranjang kosong</p>
              <p className="text-sm text-center">Tambahkan produk untuk mulai belanja</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map((item) => {
                const p = item.wa_price || item.sale_price || item.price
                return (
                  <div key={`${item.id}-${item.note}`} className="flex gap-3 p-3 border border-gray-100 rounded-xl">
                    <div className="w-16 h-16 rounded-lg bg-sand flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.img
                        ? <img src={item.img} alt={item.name} className="w-full h-full object-contain p-1"/>
                        : <span className="text-2xl">🏸</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.brand}</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm font-extrabold text-red">{fmt(p)}</p>
                      {item.note && <p className="text-[11px] text-gray-400 mt-0.5">📝 {item.note}</p>}
                      {/* Qty */}
                      <div className="flex items-center mt-1.5 border border-gray-200 rounded-lg overflow-hidden w-fit">
                        <button onClick={() => updateQty(item.id, item.note, item.qty - 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-sand text-sm">−</button>
                        <span className="w-8 h-7 flex items-center justify-center text-sm font-bold border-x border-gray-200">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.note, item.qty + 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-sand text-sm">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id, item.note)} className="text-gray-300 hover:text-red text-sm self-start mt-1">🗑</button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">Total</span>
              <span className="text-lg font-extrabold text-red">Rp{Number(totalPrice).toLocaleString('id-ID')}</span>
            </div>
            <button
              onClick={checkoutWA}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.986l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.045-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.86 9.86 0 012.106 12C2.106 6.561 6.561 2.106 12 2.106c5.438 0 9.894 4.455 9.894 9.894 0 5.438-4.456 9.894-9.894 9.894z"/></svg>
              Checkout via WhatsApp
            </button>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <a href="https://www.tokopedia.com/anugerahsportmlg" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-sm font-bold text-gray-600 hover:bg-sand transition-all">
                Tokopedia
              </a>
              <a href="https://shopee.co.id/anugerahsports" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2.5 text-sm font-bold text-gray-600 hover:bg-sand transition-all">
                Shopee
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
