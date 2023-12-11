
const Tasklist = ({task}) => {
  return(
    <tr>
      <td>{task.name}</td>
      <td>{task.duration}</td>
      <td>{task.date}</td>
    </tr>
  )
}

export default Tasklist