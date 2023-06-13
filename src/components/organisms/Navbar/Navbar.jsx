import React from "react"
import { styled } from "@linaria/react"

import config from "../../../../config"
import { useNavigationTree } from "../../../hooks/useNavigationTree"

import { PwaWidget } from "../PwaWidget"
import { Divider } from "./Divider"
import { TreeNode } from "./TreeNode"
import { ExternalLink } from "./ExternalLink"

const StyledSidebar = styled.aside`
  width: 100%;
  height: calc(100vh - 70px);
  contain: content;
  overflow-y: auto;
  overflow-y: overlay;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  padding-top: 6px;
  padding-right: 12px;
  padding-left: 12px;

  scrollbar-width: auto;
  scrollbar-color: var(--accentColor) transparent;

  &::-webkit-scrollbar {
    width: 8px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--accentColor);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--accentHoverColor);
  }
  @media (max-width: 767px) {
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
    }
  }

  .sidebarTitle {
    background-color: #f8f8f8;
    padding: 18px 16px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #001934;
    display: flex;
    align-items: center;

    & a {
      color: #001934;
    }
  }
`

const SidebarUl = styled.ul`
  padding-inline-start: 0;

  & > li {
    border: none;
  }
  & li a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    border-style: solid none solid solid;
    border-width: 1px 0 1px 1px;
    border-color: transparent;
  }
  & .item > a {
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }
`

export const Navbar = ({ location, ...props }) => {
  const treeData = useNavigationTree()

  return (
    <StyledSidebar {...props}>
      {config.sidebar.title && (
        <div
          className={"sidebarTitle hiddenMobile"}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      )}

      <nav>
        <SidebarUl>
          {treeData.items.map(item => (
            <TreeNode
              key={item.url}
              className="firstLevel"
              notCollapsedDepth={config.sidebar.notCollapsedDepth || 1}
              location={location}
              {...item}
            />
          ))}
        </SidebarUl>
      </nav>

      {config.sidebar.links && config.sidebar.links.length ? <Divider /> : null}

      <ul className="external-links">
        {config.sidebar.links.map((link, key) => {
          if (link.link && link.text) {
            return <ExternalLink key={key} link={link.link} label={link.text} />
          }
          return null
        })}
      </ul>

      {config.pwa.enabled && <PwaWidget />}
    </StyledSidebar>
  )
}
