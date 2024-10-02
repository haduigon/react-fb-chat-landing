import "./Header.scss";
import { FaArrowLeft } from "react-icons/fa6";
import { HiPhone } from "react-icons/hi2";
import { HiVideoCamera } from "react-icons/hi";
import { IoIosInformationCircle } from "react-icons/io";
import classNames from 'classnames';
import { StateContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { FacebookPixel2 } from "../FacebookPixel/FacebookPixel";
import { useGetContextState } from "../../helpers/utils";
import React from "react";

let count = 0;

export const Header = () => {
  const [test, setTest] = useState<boolean>();
  // const { isOnline } = useContext(StateContext).state;


  useEffect(() => {
    // const { isOnline } = useContext(StateContext).state;
    // setTest(isOnline);
  }, [])

  // console.log(test, 'testtest');
  // const ddd = useGetContextState();
  // console.log(ddd, 'dddd in header');

  console.log('header render', count++);
  return (
    <div className="header">
      <FacebookPixel2 />
      <div>
        <FaArrowLeft color="#6495ED" size={24} />
      </div>
      <div style={{ marginLeft: 10 }}>
        <div className="custom-icon" style={{ position: 'relative' }}>
          <div className={classNames("red-circle-box", {
            // "phantom": ! state.isOnline
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
};