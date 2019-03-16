import { string, number, object, oneOfType } from 'prop-types'

export const commonTypes = {
  element: string,
  events: object,
  display: string,
  wrap: string,
  position: string,
  spacing: oneOfType([string, number]),
  padding: oneOfType([string, number]),
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  maxWidth: oneOfType([string, number]),
  maxHeight: oneOfType([string, number]),
  justify: string,
  align: string,
  direction: string,
  background: string,
  transition: string,
  className: string,
  style: string,
  hover: string,
  before: string,
  after: string
}
