/**
 * Typesafe Object.keys
 */
export function keys<O>(o: O): (keyof O)[] {
  return Object.keys(o) as (keyof O)[]
}
