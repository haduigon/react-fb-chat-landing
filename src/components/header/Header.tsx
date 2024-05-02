import "./Header.scss";
import { FaArrowLeft } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi2";
import { HiVideoCamera } from "react-icons/hi";
import { IoIosInformationCircle } from "react-icons/io";
import classNames from 'classnames';
import { StateContext } from "../../context/AppContext";
import { useContext } from "react";

export const Header = () => {
  const { state } = useContext(StateContext);

  return (
    <div className="header">
     <div>
        <FaArrowLeft color="#6495ED" size={24} />
      </div>
      <div style={{ marginLeft: 10 }}>
        <div className="custom-icon" style={{ position: 'relative' }}>
          <div className={classNames("red-circle-box", {
              "phantom": ! state.isOnline
          })}>
            <div className="red-circle" />
          </div>
        </div>
      </div>
      <div>
        BabyStar AI
      </div>
      <div>
        <HiPhone color="#6495ED" size={20} />
      </div>
      <div>
        <HiVideoCamera color="#6495ED" size={26} />
      </div>
      <div>
        <IoIosInformationCircle color="#6495ED" size={24} />
      </div>
    </div>
  )
}