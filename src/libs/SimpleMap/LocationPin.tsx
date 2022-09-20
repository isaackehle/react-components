import { FaMapPin } from "react-icons/fa";

export default function LocationPin({ text = "", lat = 0, lng = 0 }) {
  return (
    <div className="pin">
      <FaMapPin className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );
}
