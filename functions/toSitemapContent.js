const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="UTF-8"?>
                          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const dataTransform = data.reduce((result, item) => {
   return result + `<url>
      ${result.length == 0 ? '<loc>https://spoketa.cz/</loc>' : ''}
      <loc>https://spoketa.cz${item}</loc>
   </url>`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</urlset>`

  return xmlStringFeed
}

export default toXml;
