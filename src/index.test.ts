import { mockRandom, resetMockRandom } from 'jest-mock-random'
import Walker from './index'

describe('walk', () => {
  const walker = new Walker({
    gridSize: 10
  })

  it('walks once', () => {
    /**
       * 0.9 guarantee `begin` to be picked
       * 0.5 guarantee the random axis will be 5 with gridSize of 10
       */
    mockRandom([0.9, 0.5])
    const result = walker.walkOnce({
      begin: 0,
      end: 4,
    })
    expect(result).toEqual({
      begin: 0,
      end: 5
    })
    resetMockRandom()
  })

  it('walks an amount of steps', () => {
    const result = walker.walk(10)
    expect(result).toHaveLength(10)
  })

  it('walks continuously', () => {
    const fromPos = {
      begin: 2,
      end: 5
    }
    const [ result ] = walker.walk(1, { fromPos })
    expect(
      result.end === fromPos.end ||
      result.begin === fromPos.begin
    ).toBeTruthy()
  })
})

describe('walk with maxBlockSize', () => {
  const gridSize = 10
  // returns [1..10]
  const possibleBlockSize = Array(gridSize).fill(0).map((_, i) => i + 1)

  it('respects maxBlockSize', () => {
    possibleBlockSize.forEach(maxBlockSize => {
      const walker = new Walker({
        gridSize,
        maxBlockSize,
      })
      const result = walker.walk(10)
      result.map(({ begin, end }) => {
        const blockSize = Math.abs(begin - end)
        expect(blockSize).toBeLessThanOrEqual(maxBlockSize)
      })
    })
  })
})