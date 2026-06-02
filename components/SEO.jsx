import Head from 'next/head'

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  const siteName = 'Anugerah Sports Malang'
  const defaultDesc = 'Toko peralatan olahraga terpercaya sejak 1974 di Malang. Authorized distributor Yonex, Victor, Li-Ning. Produk 100% original.'
  const defaultImg = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&q=80'
  const baseUrl = 'https://anugerah-sports.vercel.app'

  const fullTitle = title ? `${title} — ${siteName}` : siteName
  const fullDesc = description || defaultDesc
  const fullImg = image || defaultImg
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl

  return (
    <Head>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc}/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>

      {/* Open Graph — for WhatsApp, Facebook previews */}
      <meta property="og:type" content={type}/>
      <meta property="og:site_name" content={siteName}/>
      <meta property="og:title" content={fullTitle}/>
      <meta property="og:description" content={fullDesc}/>
      <meta property="og:image" content={fullImg}/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta property="og:url" content={fullUrl}/>
      <meta property="og:locale" content="id_ID"/>

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={fullTitle}/>
      <meta name="twitter:description" content={fullDesc}/>
      <meta name="twitter:image" content={fullImg}/>

      {/* Extra SEO */}
      <meta name="robots" content="index, follow"/>
      <meta name="author" content={siteName}/>
      <meta name="keywords" content="toko olahraga malang, raket badminton malang, yonex malang, victor malang, li-ning malang, anugerah sports"/>
      <link rel="canonical" href={fullUrl}/>
    </Head>
  )
}
