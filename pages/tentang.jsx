export default function Tentang() {
  const WA = process.env.NEXT_PUBLIC_WA_NUMBER || '6285755000069'
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-navy py-16 px-6 text-center">
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-white/40 mb-3">Est. 1974</p>
        <h1 className="text-4xl font-extrabold text-white mb-3">Tentang Anugerah Sports</h1>
        <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed">
          Lebih dari 50 tahun melayani atlet dan pecinta olahraga di Malang dan seluruh Indonesia.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden aspect-video bg-sand">
            <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80" alt="Anugerah Sports" className="w-full h-full object-cover"/>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-2">Sejarah Kami</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Terpercaya Sejak 1974</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              Anugerah Sports adalah toko peralatan olahraga yang telah berdiri sejak <strong className="text-gray-800">tahun 1974</strong> di Malang, Jawa Timur. Selama lebih dari 50 tahun kami telah melayani ribuan atlet dan pecinta olahraga dengan produk 100% original.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Berlokasi di Jl. Ade Irma Suryani No.3, Klojen, Malang — kami adalah authorized distributor resmi Yonex, Victor, Li-Ning, dan brand terkemuka lainnya.
            </p>
            <blockquote className="text-sm font-bold italic text-gray-800 border-l-4 border-red pl-4 leading-snug">
              "Toko Olahraga terpercaya sejak tahun 1974 — ORIGINAL ONLY"
            </blockquote>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[['50+','Tahun Berdiri'],['4.5★','Google Rating'],['77rb+','Produk Terjual'],['660+','Ulasan Pelanggan']].map(([n, l]) => (
            <div key={l} className="bg-sand border border-gray-100 rounded-2xl p-6 text-center">
              <p className="text-3xl font-extrabold text-gray-900">{n}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mt-1">{l}</p>
            </div>
          ))}
        </div>

        {/* Contact & Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-2">Hubungi Kami</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Informasi Kontak</h2>
            <div className="flex flex-col gap-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📍</span>
                <div>
                  <p className="font-bold text-gray-800 mb-0.5">Alamat</p>
                  <p>Jl. Ade Irma Suryani No.3, Sukoharjo,<br/>Kec. Klojen, Kota Malang 65116</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📞</span>
                <div>
                  <p className="font-bold text-gray-800 mb-0.5">Telepon</p>
                  <a href="tel:+62341326217" className="hover:text-red">(0341) 326217</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">💬</span>
                <div>
                  <p className="font-bold text-gray-800 mb-0.5">WhatsApp</p>
                  <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" className="hover:text-red">+62 857-5500-0069</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">🕐</span>
                <div>
                  <p className="font-bold text-gray-800 mb-0.5">Jam Operasional</p>
                  <p>Senin–Sabtu: 10.00–20.00 WIB<br/>Minggu: 10.00–17.00 WIB</p>
                </div>
              </div>
            </div>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-bold mt-6 transition-all hover:-translate-y-0.5"
            >
              💬 Chat via WhatsApp
            </a>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-red mb-2">Lokasi</p>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Temukan Toko Kami</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-100 h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246!2d112.6162!3d-7.9832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62819cf664277%3A0x36611e202402610c!2sANUGERAH%20SPORTS!5e0!3m2!1sid!2sid!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Lokasi Anugerah Sports"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
