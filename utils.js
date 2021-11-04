export function submit(values) {
  console.log('Submitting', values)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return Math.random() < 0.4 || values.one === 'error' ? reject() : resolve()
    }, 1000)
  })
}
