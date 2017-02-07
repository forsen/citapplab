
export const verify = () => {
  console.log(fetch('http://google.no')
    .then((result) => result.json())
    .then((result) => console.log(result)))
  return fetch !== undefined
}

