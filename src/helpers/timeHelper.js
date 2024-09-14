const getMinutes = (time) => {
  return Math.floor(time / 60)
}

const getSeconds = (time) => {
  return time % 60
}

export {getMinutes, getSeconds}