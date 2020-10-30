import React from "react"
import { Link as GatsbyLink } from "gatsby"
import isAbsoluteUrl from "is-absolute-url"

export const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <a href={to} {...props}>
      {props.children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props} />
  )
