export function submit(values) {
  console.log('Submitting', values)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return Math.random() < 0.4 || values.one === 'error' ? reject() : resolve()
    }, 1000)
  })
}

export function validate(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return /^[a-zA-Z]+$/.test(value) ? resolve() : reject()
    }, 1000)
  })
}
