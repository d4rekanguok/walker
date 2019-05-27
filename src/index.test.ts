import { mockRandom, resetMockRandom } from 'jest-mock-random'
import Walk from './index'

describe('walk', () => {
  it('is works', () => {
    const walk = Walk({
      gridSize: 10
    })
    /**
       * 0.9 guarantee `begin` to be picked
       * 0.5 guarantee the random axis will be 5 with gridSize of 10
       */
    mockRandom([0.9, 0.5])

    const result = walk({
      begin: 0,
      end: 4,
    })

    expect(result).toEqual({
      begin: 0,
      end: 5
    })

    resetMockRandom()
  })
})
