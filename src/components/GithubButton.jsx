import React from "react";
import styled from "@emotion/styled";

import {Link} from "./Link";
import gitHub from "../images/github.svg"

const StyledLink = styled(Link)`
  margin: 6px 0.5rem;
  height: 30px;
  min-height: 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1em;
  text-decoration: none;
  color: rgb(36, 42, 49);
  padding: 5px 16px;

  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(211, 220, 228);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease-out 0s;
  box-shadow: rgba(116, 129, 141, 0.1) 0 1px 1px 0;
  
  &:hover {
    background-color: rgb(245, 247, 249);
    color: rgb(36, 42, 49);
  }
  & > img {
    width: 15px;
    margin-right: 5px;
  }
  & > span {
    line-height: 1;
    font-size: 16px;  
  }
`

export  const GithubButton = ({children, ...props}) => {
  return <StyledLink
    target="_blank"
    rel="noopener"
    {...props}
  >
      <img src={gitHub} alt={"Github logo"} />
      <span>{children}</span>
  </StyledLink>
}