module.exports = {
  siteMetadata: {
    title: 'Developer Portal',
    githubBase: 'https://github.com/openpaymentseurope/docs/tree/master/contents'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // this makes all json files that has been mounted with the gatsby-source-filesystem
    // available in GraphQL with the allJson query
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `Json`, // a fixed string
      },
    },
    // mounts static files like images and jsons in the GraphQL world
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
        name: `menuItems`,
        path: `${__dirname}/src/menuItems`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `apispecs`,
        path: `${__dirname}/src/apispecs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-markdown',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/logo-small.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: 'post-toc-anchor',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-110256897-2" with your own Tracking ID
        trackingId: "UA-110256897-2",
      },
    },
  ],
  pathPrefix: '/',
}
