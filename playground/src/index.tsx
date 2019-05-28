import * as React from 'react'
import { useEffect, useState } from 'react'
import { render } from 'react-dom'
import Walker, { Position } from '../../src'

import { InputGroup, Form, Button } from './components/input'
import { GridContainer, Cell } from './components/walker'
import { Header } from './components/header'
import { GlobalStyle } from './components/global-style'

const App = () => {
  const [ gridSize, setGridSize ] = useState(4)
  const [ positions, setPositions ] = useState<Position[]>([])
  const [ maxBlockSize, setMaxBlockSize ] = useState(3)
  const [ key, setKey ] = useState(0)
  const [ amount, setAmount ] = useState(10)

  useEffect(() => {
    const walker = new Walker({
      gridSize,
      maxBlockSize,
    })
    setPositions(walker.walk(amount))
  }, [gridSize, key, maxBlockSize, amount])

  const setProps = setter => (e: React.ChangeEvent<HTMLInputElement>) => setter(+e.target.value)
  
  return (
    <>
      <GlobalStyle />
      <Form>
        <Header name="Walker" href="https://github.com/d4rekanguok/walker" />
        <InputGroup
          id="gridSize"
          label="Grid size"
          type="number"
          min={3}
          value={gridSize}
          onChange={setProps(setGridSize)}
        />
        <InputGroup
          id="maxBlockSize"
          label="Max block size"
          type="number"
          min={1}
          max={gridSize}
          value={maxBlockSize}
          onChange={setProps(setMaxBlockSize)}
        />
        <InputGroup
          id="amount"
          label="Block amount"
          type="number"
          min={5}
          value={amount}
          onChange={setProps(setAmount)}
        />
        <Button onClick={(e) => {
          e.preventDefault()
          setKey(key + 1)
        }}>Reload</Button>
      </Form>
      <GridContainer gridSize={gridSize} key={`${gridSize}-${maxBlockSize}-${key}`}>
        { positions.map((pos, i) => <Cell key={i} row={i} {...pos}>{i + 1}</Cell>) }
      </GridContainer>
    </>
  )
}

const $root = document.querySelector('#app')
render(<App />, $root)