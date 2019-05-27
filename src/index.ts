import { choose, chooseOf, chooseWithout } from './utils'

interface WalkerOptions {
  gridSize: number;
  maxBlockSize?: number;
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
  public maxBlockSize: number
  public constructor (opts: WalkerOptions) {
    const gridSize = Math.max(opts.gridSize, 3)
    this.lines = gridSize + 1
    this.maxBlockSize = opts.maxBlockSize
      ? Math.max(1, Math.min(gridSize, opts.maxBlockSize))
      : gridSize
  }
  
  public walkOnce: WalkOnce = previous => {
    const { lines, maxBlockSize } = this
    const prev = previous || {
      begin: 0,
      end: choose(maxBlockSize + 1),
    }
    const random = chooseOf(prev)
    const randomValue = chooseWithout(lines, {
      exceptions: Object.values(prev)
    })

    const next = {
      ...prev,
      [random]: randomValue
    }

    return (Math.abs(next.begin - next.end) > maxBlockSize)
      ? this.walkOnce(prev)
      : next
  }

  public walk: Walk = amount => {
    const { walkOnce } = this
    return Array(amount)
      .fill(0)
      .reduce(acc => [walkOnce(acc[0]), ...acc], [])
  }
}

export default Walker
