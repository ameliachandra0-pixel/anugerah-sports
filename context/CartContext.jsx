import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('as_cart')
      if (saved) setCart(JSON.parse(saved))
    } catch (e) {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('as_cart', JSON.stringify(cart)) } catch (e) {}
  }, [cart])

  function addItem(product, qty = 1, note = '') {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.note === note)
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.note === note ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        brand: product.brand || '',
        price: product.price,
        wa_price: product.wa_price,
        sale_price: product.sale_price,
        img: product.img || '',
        slug: product.slug || '',
        toko_url: product.toko_url || '',
        shopee_url: product.shopee_url || '',
        desty_url: product.desty_url || '',
        qty,
        note,
      }]
    })
  }

  function removeItem(id, note) {
    setCart(prev => prev.filter(i => !(i.id === id && i.note === note)))
  }

  function updateQty(id, note, qty) {
    if (qty < 1) return removeItem(id, note)
    setCart(prev => prev.map(i =>
      i.id === id && i.note === note ? { ...i, qty } : i
    ))
  }

  function clearCart() { setCart([]) }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => {
    const p = i.wa_price || i.sale_price || i.price || 0
    return s + p * i.qty
  }, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }
