import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Position } from '../../../src'

const fadeIn = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`

interface GridContainerProps {
  gridSize: number
}
export const GridContainer = styled('section')<GridContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  font-family: sans-serif;
  grid-template-columns: repeat(${props => props.gridSize}, 1fr);
`

interface CellProps extends Position {
  row: number
}
export const Cell = styled.div.attrs(({ row, begin, end }: CellProps) => ({
  style: {
    gridColumn: (begin + 1) + ' / ' + (end + 1),
    gridRow: (row + 1) + ' / ' + (row + 2)
  }
}))<CellProps>`
  padding: 2rem;
  box-sizing: border-box;
  background: hsl(${({ row }) => row * 10}, 80%, 60%);
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.25);
  animation: 0.3s ${fadeIn} ease both;
  animation-delay: ${({ row }) => (row + 1) / 15}s;
`