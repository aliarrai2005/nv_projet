import Sidebar from '../components/Sidebar'
import SelectActivite2 from '../components/SelectActivite2'
import './SelectionTerrain.css'

function SelectionTerrain() {
  return (
    <div className="booking-wrapper">
      <Sidebar etapeActive={1} />
      <SelectActivite2 />
    </div>
  )
}

export default SelectionTerrain