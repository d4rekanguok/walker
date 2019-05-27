import { choose, chooseOf, chooseWithout } from './utils'

interface WalkerOptions {
  gridSize: number;
}

export interface Position {
  begin: number;
  end: number;
}

type WalkOnce = (previous: Position) => Position
type Walk = (amount: number) => Position[]
type MakePosition = () => Position

class Walker {
  public lines: number
  public constructor (opts: WalkerOptions) {
    this.lines = Math.max(opts.gridSize, 3) + 1
  }

  public makePosition: MakePosition = () => {
    const { lines } = this
    const begin = choose(lines)
    const end = chooseWithout(lines, {
      exceptions: [ begin ]
    })
    return { begin, end }
  }
  
  public walkOnce: WalkOnce = previous => {
    const { lines } = this
    const random = chooseOf(previous)
    const randomValue = chooseWithout(lines, {
      exceptions: Object.values(previous)
    })

    return {
      ...previous,
      [random]: randomValue
    }
  }

  public walk: Walk = amount => {
    const { walkOnce, makePosition } = this
    const initialValue = [makePosition()]
    return Array(amount - 1)
      .fill(0)
      .reduce(acc => [walkOnce(acc[0]), ...acc], initialValue)
  }
}

export default Walker
