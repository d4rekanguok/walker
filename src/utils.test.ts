import { mockRandomForEach } from 'jest-mock-random'
import { chooseWithout } from './utils'

describe('chooseWithout', () => {
  mockRandomForEach([0.9, 0.2])

  it('doesn\'t return exception', () => {
    const exceptions = [9]
    const result = chooseWithout(10, {
      exceptions
    })
    expect(result).toBe(2)
  })
})