import Link from 'next/link'

const socials = [
  { label: 'Shopee', href: 'https://shopee.co.id/anugerahsports', icon: <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M24.5 10.5h-2a6.5 6.5 0 0 0-13 0h-2A3.5 3.5 0 0 0 4 14v11a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 28 25V14a3.5 3.5 0 0 0-3.5-3.5ZM16 5a4.5 4.5 0 0 1 4.5 4.5h-9A4.5 4.5 0 0 1 16 5Zm3 14.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg> },
  { label: 'Tokopedia', href: 'https://www.tokopedia.com/anugerahsportmlg', icon: <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3 3 10v12l13 7 13-7V10L16 3Zm0 3.3 9.5 5.2-9.5 5.2-9.5-5.2L16 6.3ZM5 12.3l9 4.9V27L5 22V12.3Zm11 14.6V17.2l9-4.9V22L16 26.9Z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/anugerahsports/', icon: <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M10.2 3h11.6A7.2 7.2 0 0 1 29 10.2v11.6A7.2 7.2 0 0 1 21.8 29H10.2A7.2 7.2 0 0 1 3 21.8V10.2A7.2 7.2 0 0 1 10.2 3Zm-.2 3a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4H10Zm6 3a6 6 0 1 1 0 12A6 6 0 0 1 16 9Zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm6.5-2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/></svg> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@kokoraketanugerahsports', icon: <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M21 3h4a7 7 0 0 0 7 7v4a11 11 0 0 1-6-1.8V22a9 9 0 1 1-9-9h1v4h-1a5 5 0 1 0 5 5V3Z"/></svg> },
]

const payments = ['Transfer Bank','BCA','Mandiri','BNI','BRI','OVO','GoPay','DANA']

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-100">
        {/* Brand */}
        <div>
          <img src="https://i.ibb.co.com/v63RzMR0/Logo-singa.png" alt="Anugerah Sports" className="h-10 w-auto object-contain mb-3"/>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Authorized Distributor perlengkapan dan pakaian olahraga antara lain merek Victor, Li-Ning, Yonex, dan lain-lainnya. Terpercaya sejak 1974.
          </p>
          <p className="text-xs font-bold text-gray-700 mb-2">Temukan kami di</p>
          <div className="flex gap-2 flex-wrap">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                className="w-9 h-9 rounded-lg bg-sand border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red hover:border-red hover:text-white hover:-translate-y-0.5 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="text-sm font-extrabold text-gray-900 mb-4">Tautan</p>
          <div className="flex flex-col gap-2">
            {[['/',  'Beranda'],['/catalog','Produk'],['/tentang','Tentang Kami']].map(([href, label]) => (
              <Link key={href} href={href} className="text-sm text-gray-500 hover:text-red transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-extrabold text-gray-900 mb-4">Kontak</p>
          <div className="flex flex-col gap-3 text-sm text-gray-500">
            <span>(0341) 326217</span>
            <a href="https://wa.me/6285755000069" target="_blank" rel="noreferrer" className="hover:text-red">+62 857-5500-0069</a>
            <span className="leading-relaxed">Jl. Ade Irma Suryani No.3, Sukoharjo, Kec. Klojen, Kota Malang 65116</span>
            <span>Senin–Sabtu: 10.00–20.00<br/>Minggu: 10.00–17.00 WIB</span>
          </div>
        </div>

        {/* Map */}
        <div>
          <p className="text-sm font-extrabold text-gray-900 mb-4">Lokasi Toko</p>
          <div className="rounded-xl overflow-hidden border border-gray-100 h-40">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246!2d112.6162!3d-7.9832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62819cf664277%3A0x36611e202402610c!2sANUGERAH%20SPORTS!5e0!3m2!1sid!2sid!4v1"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Lokasi Anugerah Sports"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-gray-400">© 2025 Anugerah Sports Malang. All rights reserved.</p>
        <div className="flex flex-wrap gap-2">
          {payments.map(p => (
            <span key={p} className="bg-sand border border-gray-200 rounded text-[10px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wide">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
