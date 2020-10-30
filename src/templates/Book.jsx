import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from "@emotion/styled"

import { Layout } from "../components/Layout"
import { Link } from "../components/Link"
import { NextPrevious } from "../components/NextPrevious"
import config from "../../config"

const forcedNavOrder = config.sidebar.forcedNavOrder

export const pageQuery = graphql`
  query BookQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        metaDescription
        metaTitle
        title
      }
      html
      fields {
        slug
        title
      }
      parent {
        ... on File {
          relativePath
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        docsLocation
      }
    }
  }
`

const BookTemplate = props => {
  if (!props.data) {
    return null
  }
  const {
    allMarkdownRemark,
    markdownRemark,
    site: {
      siteMetadata: { docsLocation },
    },
  } = props.data

  const gitHub = require("../components/images/github.svg")

  const navItems = allMarkdownRemark.edges
    .map(({ node }) => node.fields.slug)
    .filter(slug => slug !== "/")
    .sort()
    .reduce(
      (acc, cur) => {
        if (forcedNavOrder.find(url => url === cur)) {
          return { ...acc, [cur]: [cur] }
        }

        let prefix = cur.split("/")[1]

        if (config.gatsby && config.gatsby.trailingSlash) {
          prefix = prefix + "/"
        }

        if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
          return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] }
        } else {
          return { ...acc, items: [...acc.items, cur] }
        }
      },
      { items: [] }
    )

  const nav = forcedNavOrder
    .reduce((acc, cur) => {
      return acc.concat(navItems[cur])
    }, [])
    .concat(navItems.items)
    .map(slug => {
      if (slug) {
        const { node } = allMarkdownRemark.edges.find(
          ({ node }) => node.fields.slug === slug
        )

        return { title: node.fields.title, url: node.fields.slug }
      }
      return null
    })

  // meta tags
  const metaTitle = markdownRemark.frontmatter.metaTitle

  const metaDescription = markdownRemark.frontmatter.metaDescription

  let canonicalUrl = config.gatsby.siteUrl

  canonicalUrl =
    config.gatsby.pathPrefix !== "/"
      ? canonicalUrl + config.gatsby.pathPrefix
      : canonicalUrl
  canonicalUrl = canonicalUrl + markdownRemark.fields.slug

  return (
    <Layout {...props}>
      <Helmet>
        {metaTitle ? <title>{metaTitle}</title> : null}
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : null}
        {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta property="og:description" content={metaDescription} />
        ) : null}
        {metaTitle ? (
          <meta property="twitter:title" content={metaTitle} />
        ) : null}
        {metaDescription ? (
          <meta property="twitter:description" content={metaDescription} />
        ) : null}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className={"titleWrapper"}>
        <StyledHeading>{markdownRemark.fields.title}</StyledHeading>
        <Edit className={"mobileView"}>
          {docsLocation && (
            <Link
              className={"gitBtn"}
              target="_blank"
              to={`${docsLocation}/${markdownRemark.parent.relativePath}`}
            >
              <img src={gitHub} alt={"Github logo"} /> Edit on GitHub
            </Link>
          )}
        </Edit>
      </div>

      <StyledMainWrapper>
        {/* <MDXRenderer>{markdownRemark.excerpt}</MDXRenderer> */}
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}></div>
      </StyledMainWrapper>

      <div className={"addPaddTopBottom"}>
        <NextPrevious mdx={markdownRemark} nav={nav} />
      </div>
    </Layout>
  )
}

export default BookTemplate

export const StyledHeading = styled("h1")`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid ${props => props.theme.colors.accent};
  padding: 0 16px;
  flex: 1;
  margin-top: 0;
  padding-top: 0;
  color: ${props => props.theme.colors.heading};
`

export const Edit = styled("div")`
  padding: 1rem 1.5rem;
  text-align: right;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1em;
    text-decoration: none;
    color: #555;
    border: 1px solid rgb(211, 220, 228);
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s ease-out 0s;
    text-decoration: none;
    color: rgb(36, 42, 49);
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(116, 129, 141, 0.1) 0px 1px 1px 0px;
    height: 30px;
    padding: 5px 16px;
    &:hover {
      background-color: rgb(245, 247, 249);
    }
  }
`

export const StyledMainWrapper = styled.div`
  max-width: 750px;
  color: ${props => props.theme.colors.text};

  ul,
  ol {
    -webkit-padding-start: 40px;
    -moz-padding-start: 40px;
    -o-padding-start: 40px;
    margin: 24px 0px;
    padding: 0px 0px 0px 2em;

    li {
      font-size: 16px;
      line-height: 1.8;
      font-weight: 400;
    }
  }

  a {
    transition: color 0.15s;
    color: ${props => props.theme.colors.link};
  }

  code {
    border: 1px solid #ede7f3;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9375em;

    background: ${props => props.theme.colors.background};
  }

  @media (max-width: 767px) {
    padding: 0 15px;
  }
`
