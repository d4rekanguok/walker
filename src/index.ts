import { chooseOf, chooseWithout } from './helpers'

interface WalkerOptions {
  gridSize: number;
}

interface Position {
  begin: number;
  end: number;
}

type Walk = (previous: Position) => Position
type WalkFactory = (opts: WalkerOptions) => Walk

const makeWalk: WalkFactory = ({ gridSize }) => {
  return (previous) => {
    const random = chooseOf(previous)
    const randomValue = chooseWithout(gridSize, {
      exceptions: Object.values(previous)
    })

    return {
      ...previous,
      [random]: randomValue
    }
  }
}

export default makeWalk
