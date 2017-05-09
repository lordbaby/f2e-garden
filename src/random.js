export function random (min, max) {
  if (!max) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}
