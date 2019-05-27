import { chooseOf, chooseWithout } from './helpers'

export interface WalkerOptions {
  gridSize: number;
}

export interface Position {
  begin: number;
  end: number;
}

export type Walk = (previous: Position) => Position
export type WalkFactory = (opts: WalkerOptions) => Walk

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
