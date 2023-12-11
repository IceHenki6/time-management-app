import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='toggleable'>
      <div style={hideWhenVisible}>
        <button className='button' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div className='toggleable-children' style={showWhenVisible}>
        {props.children}
        <button className='button cancel-btn' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable