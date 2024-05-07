import { read } from "fs"
import { readData } from "../lib/firebase/firestore"

const Dashboard = () => {

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => readData()}>Read</button>
    </div>
  )
}

export default Dashboard