const path = require('path') 

const clean = (str) => { 
  /* Preprocess site text before it is indexed. 
     We only want just the text without any special
     characters or presentational markup
   */ 

   // Remove markup, import statements and html markup
  str = str.replace(/import(.*)\n/g, "");
  str = str.replace(/(<([^>]+)>)/ig,"").replace(/\n/ig,"");
  str = str.replace(/---(.*)---/, "");

  // Remove markdown markup
  str = str.replace(/[#>*/\\]+/g,"");

  return str;
}

module.exports = {
  siteMetadata: {
    title: 'Organic Moringa Standard (COMS)',
    description:
      'This website outlines the set of methodologies for an organic moringa standard to allow moringa farmers or businesses to apply for an organic seal that certifies their moringa as "organic". This would be proved by documenting the process involved, following the processes in the moringa guide and submitting the product for testing. For the time being, the website is targeted towards farmers and businesses in the Carribean community.',
    author: 'COMS developer team',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: { default: path.resolve('./src/components/layout.js') },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },    
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'organic-moringa-standard',
        short_name: 'coms',
        start_url: '/',
        background_color: '#53AB34',
        theme_color: '#53AB34',
        display: 'minimal-ui',
        icon: 'src/images/icons/moringa-icon.png', // This path is relative to the root of the site.
      },      
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,        
      }
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -200
      }
    },
    'gatsby-plugin-styled-components',
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`id`,`title`,`tagline`,`content`],
        resolvers: {
          Mdx: {
            id: node => node.id,
            title: node => node.frontmatter.title,
            tagline: node => node.frontmatter.tagline,
            content: node => clean(node.internal.content),            
          },
        },
      },
    }    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
