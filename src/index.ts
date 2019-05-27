import { choose, chooseOf, chooseWithout } from './utils'

interface WalkerOptions {
  gridSize: number;
}

interface Position {
  begin: number;
  end: number;
}

type WalkOnce = (previous: Position) => Position
type Walk = (amount: number) => Position[]
type MakePosition = () => Position

class Walker {
  public gridSize: number
  public constructor (opts: WalkerOptions) {
    this.gridSize = opts.gridSize || 4
  }
  public walkOnce: WalkOnce = previous => {
    const { gridSize } = this
    const random = chooseOf(previous)
    const randomValue = chooseWithout(gridSize, {
      exceptions: Object.values(previous)
    })

    return {
      ...previous,
      [random]: randomValue
    }
  }
  
  public makePosition: MakePosition = () => {
    const { gridSize } = this
    const begin = choose(gridSize)
    const end = chooseWithout(gridSize, {
      exceptions: [ begin ]
    })
    return { begin, end }
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
