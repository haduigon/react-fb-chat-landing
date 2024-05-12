import * as React from 'react';
import { Radio } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import './CustomCheckBoxes.scss';
import { useSearchParams } from 'react-router-dom';
import { TFunction } from "i18next";

type Props = {
  onChange: (event: string, filed: string) => void,
  text?: string,
  text2?: string,
  text3?: string,
  icon1?: React.ReactNode,
  icon2?: React.ReactNode,
  field: string,
  t?: TFunction
}

export const CheckboxDouble: React.FC<Props> = ({ onChange, text, icon1, icon2, text2, text3, field, t }) => {

  const [searchParams, _setSearchParams] = useSearchParams();

  const data = searchParams.get(field);

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
