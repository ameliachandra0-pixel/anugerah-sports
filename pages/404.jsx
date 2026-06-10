import Link from 'next/link'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Halaman Tidak Ditemukan" description="Halaman yang kamu cari tidak ada." url="/404"/>
      <div className="min-h-screen bg-sand flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {/* Big 404 */}
          <div className="text-[120px] font-extrabold text-gray-100 leading-none select-none">404</div>

          <div className="text-5xl mb-4 -mt-6">🏸</div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Halaman yang kamu cari tidak ada atau sudah dipindahkan.
            Yuk kembali ke halaman utama atau cari produk yang kamu inginkan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-navy text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-red transition-all hover:-translate-y-0.5"
            >
              ← Kembali ke Beranda
            </Link>
            <Link
              href="/catalog"
              className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm hover:border-navy hover:text-navy transition-all"
            >
              Lihat Semua Produk
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400 mb-3">Atau hubungi kami langsung</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '6285755000069'}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.986l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.045-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.86 9.86 0 012.106 12C2.106 6.561 6.561 2.106 12 2.106c5.438 0 9.894 4.455 9.894 9.894 0 5.438-4.456 9.894-9.894 9.894z"/></svg>
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
