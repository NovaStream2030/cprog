import React from "react"
import { styled } from "@linaria/react"

import { Link } from "../Link"
import { ArrowButton } from "../ArrowButton"

import config from "../../../config"

const ChapterHeading = styled(p => (
  <span {...p} className={"chapter-heading " + p.className} />
))`
  transition: color 0.2s linear;
  cursor: pointer;
`

const StyledDiv = styled.div`
  min-height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;

  font-size: 16px;
  line-height: 16px;

  background-color: transparent;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  & > .chapter-heading,
  & > span {
    flex: 1;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    & > span > a,
    & > .chapter-heading {
      color: var(--accentColor);
      & + button > svg {
        // arrow
        fill: var(--accentColor);
      }
    }
  }
`

export const TreeNodeTitle = React.forwardRef(
  (
    {
      title,
      isChapterHeading,
      isCollapsed,
      collapse,
      url,
      hasChildren,
      active,
    },
    ref
  ) => {
    return (
      <StyledDiv className="tree-node-title" ref={ref}>
        {title && !isChapterHeading && <Link to={url}>{title}</Link>}
        {isChapterHeading && (
          <ChapterHeading onClick={collapse} role="button">
            {title}
          </ChapterHeading>
        )}
        {title && hasChildren && !config.sidebar.frontLine ? (
          <ArrowButton
            onClick={collapse}
            aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
            title={isCollapsed ? "Развернуть" : "Свернуть"}
            data-is-active={active}
            data-is-collapsed={isCollapsed}
          />
        ) : null}
      </StyledDiv>
    )
  }
)
