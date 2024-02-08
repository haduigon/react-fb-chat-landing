import * as React from 'react';
import { Radio } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { useState } from 'react';
// import { GiSwordwoman, GiSwordman } from "react-icons/gi";
import './CustomCheckBoxes.scss';
import { useSearchParams } from 'react-router-dom';
// import { CheckBoxContent } from '../../helpers/types';

type Props = {
  onChange: (event: string, filed: string) => void,
  text?: string,
  text2?: string,
  text3?: string,
  icon1?: React.ReactNode,
  icon2?: React.ReactNode,
  field: string
}

// type CheckBoxProps = {
//     choices: Array<CheckBoxContent>,
//     onChange: (event: string) => void,
// }

export const CheckboxDouble: React.FC<Props> = ({ onChange, text, icon1, icon2, text2, text3, field }) => {

  const [radioState, _setRadioState] = useState('');
  const [searchParams, _setSearchParams] = useSearchParams();

  const data = searchParams.get(field);
  console.log(data, field, 'data');
  // const radio = useRadioState();

  return (
    <div>
      <div className='center'>
        <div className='custom-font mb-10'>{text}</div>
        <div className='choose-box'>

            <label className="radio-box" style={{color: `${data === 'no' ? "lightgrey": "black"}`}}>
              <Radio
                name={field}
                onChange={() => onChange((text2 ? 'yes' : ''), field)}
                color='primary'
              />
              <div style={{marginRight: 10}}>
                {icon1}
              </div>

              <div style={{width: 180}}>{text2}</div>
            </label>
            <label className="radio-box" style={{color: `${data === 'yes' ? "lightgrey": "black"}`}}>
              <Radio
                name={field}
                onChange={() => onChange((text3 ? 'no' : ''), field)}
                color='danger'
              />
              <div style={{marginRight: 10}}>
                {icon2}
              </div>

              <div style={{width: 180}}>{text3}</div>
            </label>

        </div>

      </div>
    </div>
  )
}
export const CheckboxCelebs: React.FC<Props> = ({ onChange, text, text2, text3 }) => {

  return (
    <div>
      <div className='center' style={{ width: "300" }}>
        <div className='custom-font mb-10'>Made a choice )</div>
        <div className='choose-box'>

          <div className='check-box-row' style={{ width: "300px" }}>

            <Radio
              name="a"
              className='custom-font'
              // onChange={() => onChange('1')}
            />
            <div style={{ width: "210px" }}>{text}</div>
          </div>

          <div className='check-box-row' style={{ width: "300px" }}>

            <Radio
              name="a"
              className='custom-font'
              // onChange={() => onChange('2')}
            />
            <div style={{ width: "210px" }}>{text2}</div>
          </div>

          <div className='check-box-row' style={{ width: "300px" }}>

            <Radio
              name="a"
              className='custom-font'
              // onChange={() => onChange('3')}
            />
            <div style={{ width: "210px" }}>{text3}</div>
          </div>

        </div>

      </div>
    </div>
  )
}
