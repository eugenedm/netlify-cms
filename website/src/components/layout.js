import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import { ThemeProvider } from 'emotion-theming';
import Header from './header';
import Footer from './footer';
import GlobalStyles from '../global-styles';
import theme from '../theme';

const LAYOUT_QUERY = graphql`
  query layoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    footer: file(relativePath: { regex: "/global/" }) {
      childDataYaml {
        footer {
          buttons {
            url
            name
          }
        }
      }
    }
  }
`;

export function LayoutTemplate({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

function Layout({ hasPageHero, children }) {
  return (
    <StaticQuery query={LAYOUT_QUERY}>
      {data => {
        const { title, description } = data.site.siteMetadata;

        return (
          <LayoutTemplate
            title={title}
            description={description}
            hasPageHero={hasPageHero}
            footerButtons={data.footer.childDataYaml.footer.buttons}
          >
            <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
              <meta name="description" content={description} />
 

             <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              />


              <link
                href="https://fonts.googleapis.com/css2?family=PT+Serif&display=swap"
                rel="stylesheet"
              />


            <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600;900&display=swap"
            rel="stylesheet"
            />



            </Helmet>
            <Header hasHeroBelow={hasPageHero} />
            {children}
            <Footer buttons={data.footer.childDataYaml.footer.buttons} />
          </LayoutTemplate>
        );
      }}
    </StaticQuery>
  );
}

export default Layout;
