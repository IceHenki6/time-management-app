import { useState } from "react"

const useSelector = (incrementUnit, initialValue, minValue, maxValue) => {
  const [value, setValue] = useState(initialValue)

  const increase = () => {
    if (value < maxValue) {
      setValue(value + incrementUnit)
    }
  }

  const decrease = () => {
    if(value > minValue){
      setValue(value - incrementUnit)
    }
  }

  return {
    value,
    increase,
    decrease
  }
}

export default useSelector