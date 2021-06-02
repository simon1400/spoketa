const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="UTF-8"?>
                          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                          <url>
                             <loc>https://spoketa.cz/</loc>
                          </url>
                        `

  const dataTransform = data.reduce((result, item) => {
   return result + `<url>
      <loc>https://spoketa.cz${item}</loc>
   </url>`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</urlset>`

  return xmlStringFeed
}

export default toXml;
