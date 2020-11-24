import React from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"

import config from "../../config.js"
import { mdxComponents } from "./mdxComponents"
import { Footer } from "./Footer.jsx"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"
import { Header } from "./Header.jsx"

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};

  .sideBarUL li a {
    color: ${({ theme }) => theme.colors.text};
  }

  .sideBarUL .item > a:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: #fff !important;
  }

  @media (max-width: 1023px) {
    .rightSidebar {
      display: none;
    }
  }
`

const Content = styled("main")`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 100%;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 70px);
  table tr {
    background: ${({ theme }) => theme.colors.background};
  }
`

const MaxWidth = styled("div")`
  flex: 1;
  @media only screen and (min-width: 1279px) {
    width: 100%;
    max-width: 900px;
    position: relative;
  }
`

const LeftSideBarWidth = styled("div")`
  max-width: 390px;
  min-width: 300px;
  flex: 1 1 300px;
`

const RightSideBarWidth = styled("div")`
  width: 224px;
  flex: 0.2 1 auto;
`

export const Layout = ({ children, location }) => {
  return (
    <MDXProvider components={mdxComponents}>
      <Header location={location} />

      <Wrapper>
        <LeftSideBarWidth className={"hiddenMobile"}>
          <Sidebar location={location} />
        </LeftSideBarWidth>

        {config.sidebar.title ? (
          <div
            className={"sidebarTitle sideBarShow"}
            dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
          />
        ) : null}

        <Content>
          <MaxWidth>{children}</MaxWidth>
          <MaxWidth>
            <Footer />
          </MaxWidth>
        </Content>

        <RightSideBarWidth className={"hiddenMobile rightSidebar"}>
          <RightSidebar location={location} />
        </RightSideBarWidth>
      </Wrapper>
    </MDXProvider>
  )
}
