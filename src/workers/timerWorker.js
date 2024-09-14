let intervalId = null

self.onmessage = function (e) {
  const { time } = e.data

  let timeRemaining = time;

  if (intervalId) {
    clearInterval(intervalId)
  }

  intervalId = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining -= 1  
      postMessage(timeRemaining)
    } else {
      clearInterval(intervalId)
      postMessage(0) 
    }
  }, 1000)
};