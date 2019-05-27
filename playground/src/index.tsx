import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import Walker, { Position } from '../../src'

interface GridContainerProps {
  gridSize: number
}
const GridContainer = styled('section')<GridContainerProps>`
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
const Cell = styled.div.attrs(({ row, begin, end }: CellProps) => ({
  style: {
    gridColumn: (begin + 1) + ' / ' + (end + 1),
    gridRow: (row + 1) + ' / ' + (row + 2)
  }
}))<CellProps>`
  padding: 1rem;
  box-sizing: border-box;
  background: tomato;
  color: white;
  opacity: ${({ row }) => 1 / (row + 1)};
`

const App = () => {
  const [ gridSize, setGridSize ] = useState(4)
  const [ positions, setPositions ] = useState<Position[]>([])
  const [ key, setKey ] = useState(0)
  useEffect(() => {
    const walker = new Walker({ gridSize })
    setPositions(walker.walk(10))
  }, [gridSize, key])

  return (
    <>
    <input 
      type="number" 
      onChange={e => setGridSize(+e.target.value)} 
      value={gridSize}
      min={3}
    />
    <button onClick={() => setKey(key + 1)} >Reload</button>
    <GridContainer gridSize={gridSize} key={`${gridSize}-${key}`}>
      { positions.map((pos, i) => <Cell key={i} row={i} {...pos}>{i}</Cell>) }
    </GridContainer>
    </>
  )
}

const $root = document.querySelector('#app')
render(<App />, $root)