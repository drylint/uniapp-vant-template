export const debounce = (fn, ms = 1000) => {
  let timer = null
  return function (...rest) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, rest)
    }, ms)
  }
}
