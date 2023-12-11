
import { useContext } from "react";
import notificationContext from "../context/notificationContext";

const Notification = () => {

  const [notification, dispatch] = useContext(notificationContext)
  return(
    <div>
      {notification && <div className="notification">
        {notification}
      </div>}
    </div>
  )
}

export default Notification