import { useState, useEffect } from 'react'

export default function WAButton() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const WA = process.env.NEXT_PUBLIC_WA_NUMBER || '6285755000069'

  // Show button after scrolling 200px
  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 200) }
    window.addEventListener('scroll', onScroll)
    // Show by default after 3 seconds even without scrolling
    const t = setTimeout(() => setVisible(true), 3000)
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t) }
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-white border border-gray-100 shadow-lg rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 whitespace-nowrap">
          💬 Chat dengan kami!
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45"/>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${WA}?text=${encodeURIComponent('Halo Anugerah Sports! 👋 Saya ingin bertanya tentang produk.')}`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95"
        aria-label="Chat via WhatsApp"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.986l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.045-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.86 9.86 0 012.106 12C2.106 6.561 6.561 2.106 12 2.106c5.438 0 9.894 4.455 9.894 9.894 0 5.438-4.456 9.894-9.894 9.894z"/>
        </svg>
        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-green-400 animate-ping opacity-20"/>
      </a>
    </div>
  )
}
