function shuffle(array) {
  const arr = array
  const tmp = []
  while (arr.length > 0) {
    const random = Math.floor(Math.random() * arr.length)
    tmp.push(arr[random])
    arr.splice(random, 1)
  }
  return tmp
}

export default shuffle
