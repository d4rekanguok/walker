type Choose = (length: number) => number
export const choose: Choose = length => Math.floor(Math.random() * length)

interface ChooseWithoutOptions {
  exceptions?: number[];
}
type ChooseWithout = (length: number, opts?: ChooseWithoutOptions) => number
export const chooseWithout: ChooseWithout = (length, opts = {}) => {
  const result = choose(length)
  const { exceptions } = opts
  if (!exceptions) return result
  return (exceptions.includes(result))
    ? chooseWithout(length, { exceptions })
    : result
}

type ChooseFrom = <T>(arr: T[]) => T
export const chooseFrom: ChooseFrom = arr => arr[choose(arr.length)]

type ChooseOf = <T>(obj: T) => keyof T
export const chooseOf: ChooseOf = obj => chooseFrom<any>(Object.keys(obj))