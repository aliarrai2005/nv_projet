import Sidebar from '../components/Sidebar'
import DateHeure from '../components/DateHeure'
import '../components/SelectActivite.css'

function PageDateHeure() {
  return (
    <div className="booking-wrapper">
      <Sidebar etapeActive={2} />
      <DateHeure />
    </div>
  )
}

export default PageDateHeure