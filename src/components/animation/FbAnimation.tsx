import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import "./FbAnimation.scss";
import { StateContext } from "../../context/AppContext";
import { ACTIONS } from "../../helpers/enums";
import classNames from 'classnames';
import { Stripe } from "../payment/Stripe";
import {
  useSearchParams
} from "react-router-dom";
import i18n from '../../helpers/i18n';

type Props = {
  text: string | ReactNode,
  child?: ReactNode,
  cover?: boolean,
}

export const FbAnimation: React.FC = () => {
  const myRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div>
      <div className='message-block' ref={myRef}>
        <div className='custom-icon' />
        <div id="wave">
          <span className="srtextarea"></span>
          <span className="srfriendzone custom-font">
            {i18n.t('BabyStar AI is typing')}
          </span>
          <span className="dot one"></span>
          <span className="dot two"></span>
          <span className="dot three"></span>
          <p className="">
          </p>
        </div>
      </div>
    </div>
  )
}

export const FbMessage: React.FC<Props> = ({ text, child }) => {
  const myRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div ref={myRef}>
      <div className='message-block'>
        <div className='custom-icon mt100'></div>
        <div id="wave" style={{ marginTop: 10 }}>
          <span className="srtextarea"></span>
          <span className="srfriendzone custom-font ">
            <span className="" style={{ maxHeight: 500 }}>
              {text}
            </span>
          </span>
          <p className="" />
        </div>
      </div>
      <div style={{ marginLeft: '65px' }}>{child}</div>
    </div>
  )
}

export const FbAll: React.FC<Props> = ({ text, child, cover }) => {

  const [showTyping, setShowTyping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showChild, setShowChild] = useState(false);
  const myRef = useRef<null | HTMLDivElement>(null);
  const myFinalRef = useRef<null | HTMLDivElement>(null);
  const { dispatch } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
    if (myFinalRef.current) {
      setTimeout(() => {
        myFinalRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 5200);
    }
  }, [myFinalRef, cover]);

  useEffect(() => {
    setTimeout(() => {
      setShowTyping(true);
    }, 1000)
    setTimeout(() => {
      setShowTyping(false);
    }, 4000)
    setTimeout(() => {
      setShowMessage(true);
    }, 4500);
    if (child) {
      setTimeout(() => {
        setShowChild(true);
      }, 4750);
    }

    if (myRef.current) {
      setTimeout(() => {
        myRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 4850);
    }

    setTimeout(() => {
      dispatch({ type: ACTIONS.SET_ONLINE, payload: false })
    }, 6000);
    setTimeout(() => {
      dispatch({ type: ACTIONS.SET_ONLINE, payload: true })
    }, 8000);
  }, []);
  const time = new Date();

  const customTime = `${time.getHours()} : ${time.getMinutes()}`;

  // const navigate = useNavigate();
  // const goToDownload = () => navigate({
  //   pathname: "/download",
  //   search: `?name=${name}`
  // })

  return (
    <div ref={myFinalRef}>
      {showMessage && <div className="message-time">{customTime}</div>}
      <div className='message-block'>
        <div>
          {showTyping && <FbAnimation />} {showMessage &&
            <div className={classNames({
              "cover-box": cover,
            })}>
              <FbMessage text={text} />
              <div className={classNames({
                "cover": cover,
              })} />
              <div className={classNames({
                "redirect": cover,
              })}>
                {/* {cover && (<div onClick={goToDownload}>Redirect</div>)} */}
                {cover && (<Stripe />)}
              </div>
            </div>
          }
          <div style={{ marginLeft: '65px' }} className="mb-10" ref={!cover ? myRef : null}>
            {showChild && child}
          </div>
        </div>
      </div>
    </div>
  )
}
