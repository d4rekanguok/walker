import { mockRandom, resetMockRandom } from 'jest-mock-random'
import Walker from './index'

describe('walk', () => {
  
  const walk = new Walker({
    gridSize: 10
  })

  it('walks once', () => {
    /**
       * 0.9 guarantee `begin` to be picked
       * 0.5 guarantee the random axis will be 5 with gridSize of 10
       */
    mockRandom([0.9, 0.5])

    const result = walk.walkOnce({
      begin: 0,
      end: 4,
    })

    expect(result).toEqual({
      begin: 0,
      end: 5
    })

    resetMockRandom()
  })

  it('walks an amount of step', () => {
    const result = walk.walk(10)
    expect(result).toHaveLength(10)
  })
})
