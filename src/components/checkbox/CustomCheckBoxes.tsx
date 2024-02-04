import * as React from 'react';
import { Checkbox, useCheckboxState, Radio, Switch, useRadioState } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { useState } from 'react';
// import { GiSwordwoman, GiSwordman } from "react-icons/gi";
import './CustomCheckBoxes.scss';
import { useSearchParams } from 'react-router-dom';
import { CheckBoxContent } from '../../helpers/types';

type Props = {
    onChange: (event: string) => void,
    text?: string,
    text2?: string,
    text3?: string,
    icon1?: React.ReactNode,
    icon2?: React.ReactNode,
}

type CheckBoxProps = {
    choices: Array<CheckBoxContent>,
    onChange: (event: string) => void,
}

export const CheckboxDouble: React.FC<Props> = ({ onChange, text, icon1, icon2, text2, text3 }) => {

    const [radioState, _setRadioState] = useState('');
    const [searchParams, _setSearchParams] = useSearchParams();

    console.log(radioState);

    return (
        <div>
            <div className='center'>
                <div className='custom-font mb-10'>{text}</div>
               <div className='choose-box'>

                    <div className='check-box-row'>
                      {icon1}
                    
                    <Radio 
                      name="a" 
                      onChange={() => onChange(text2 ? text2: '')} className='custom-font'
                      >
                        {text2}
                    </Radio>
                    </div>

                    <div className='check-box-row'>
                    {icon2}
                    <Radio 
                      name="a" 
                      onChange={() => onChange(text3 ? text3: '')}
                      className='custom-font'
                    >
                        {text3}
                    </Radio>
                </div>

                </div>
               
            </div>
        </div>
    )
}
export const CheckboxCelebs: React.FC<Props> = ({ onChange, text, text2, text3 }) => {

    return (
        <div>
            <div className='center' style={{width: "300"}}>
                <div className='custom-font mb-10'>Made a choice )</div>
               <div className='choose-box'>

                    <div className='check-box-row' style={{width: "300px"}}>
                      
                    <Radio 
                      name="a" 
                       className='custom-font'
                       onChange={() => onChange('1')}
                      />
                    <div style={{width: "210px"}}>{text}</div>
                    </div>

                    <div className='check-box-row' style={{width: "300px"}}>
                    
                    <Radio 
                      name="a" 
                      className='custom-font'
                      onChange={() => onChange('2')}
                    />
                    <div style={{width: "210px"}}>{text2}</div>
                </div>

                    <div className='check-box-row' style={{width: "300px"}}>
                    
                    <Radio 
                      name="a" 
                      className='custom-font'
                      onChange={() => onChange('3')}
                    />
                    <div style={{width: "210px"}}>{text3}</div>
                </div>

                </div>
               
            </div>
        </div>
    )
}
