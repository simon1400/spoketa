require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../lib/sanity").default;
const toSitemapContent = require('./toSitemapContent').default
fs = require('fs');

async function generateFeed() {
  try{

    const projects = await sanityClient.fetch(`*[_type == "project"]{
      "slug": slug.current,
      "components": *[_type in ["project", "product"] && _id in ^.components[].link._ref].slug.current
    }`)

    const links = []

    var link = ''
    projects.map(item => {
      link = '/'+item.slug
      links.push(link)
      if(item.components.length){
        item.components.map(comItem => {
          link = '/'+item.slug+'/'+comItem
          links.push(link)
        })
      }
    })

    const sitemapContent = toSitemapContent(links)

    var pathSitemap = './public/sitemap.xml'

    fs.writeFile(pathSitemap, sitemapContent, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathSitemap}`);
    });

  }catch(e){
    console.log(e);
  }
}

generateFeed();
