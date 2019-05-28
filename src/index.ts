import { choose, chooseOf, chooseWithout } from './utils'

export interface Position {
  begin: number;
  end: number;
}

export interface WalkerOpts {
  gridSize: number;
  maxBlockSize?: number;
}

export interface WalkOpts {
  fromPos?: Position;
}

type WalkOnce = (fromPos: Position) => Position
type Walk = (amount: number, opts?: WalkOpts) => Position[]

class Walker {
  public lines: number
  public maxBlockSize: number
  public constructor (opts: WalkerOpts) {
    const gridSize = Math.max(opts.gridSize, 3)
    this.lines = gridSize + 1
    this.maxBlockSize = opts.maxBlockSize
      ? Math.max(1, Math.min(gridSize, opts.maxBlockSize))
      : gridSize
  }
  
  public walkOnce: WalkOnce = fromPos => {
    const { lines, maxBlockSize } = this
    const random = chooseOf(fromPos)
    const randomValue = chooseWithout(lines, {
      exceptions: Object.values(fromPos)
    })

    const next = {
      ...fromPos,
      [random]: randomValue
    }

    return (Math.abs(next.begin - next.end) > maxBlockSize)
      ? this.walkOnce(fromPos)
      : next
  }

  public walk: Walk = (amount, opts) => {
    const { walkOnce, maxBlockSize } = this

    const first = opts && opts.fromPos || {
      begin: 0,
      end: choose(maxBlockSize + 1),
    }
    
    return Array(amount)
      .fill(0)
      .reduce(acc => [walkOnce(acc[0]), ...acc], [ first ])
      .reverse()
      .slice(1)
  }
}

export default Walker
