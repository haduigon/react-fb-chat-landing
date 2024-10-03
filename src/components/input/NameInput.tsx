import { useContext, useEffect, useRef } from 'react';
import './CommonInputStyles.scss';
import i18n from '../../helpers/i18n';
import React from 'react';
import { QuizContext } from '../../context/AppContext';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, filedName: string) => void,
  inputErrorText?: string | undefined,
  field?: string | undefined,
  showEnter?: boolean | undefined,
  placeholder?: string | undefined
}

let count = 0;

export const NameInput: React.FC<Props> = React.memo(({
  onChange,
  onKeyDown,
  inputErrorText,
  field,
  showEnter,
  placeholder="Lilu Dallas",
}) => {
  const { state: quizState } = useContext(QuizContext);

  const inputValue: string = quizState.name || '';
  const myRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.focus();
    }
  }, [myRef]);

  console.log('name input render', count++);
  
  return (

    <div className='input-container'>
      <div className='input-box'>
        <input
          // value={inputValue}
          className="input is-link custom-font input-box"
          type="text"
          placeholder={placeholder}
          onChange={(event) => onChange(event)}
          ref={myRef}
          onKeyDown={(event) => onKeyDown(event, field as any)}
        />
      </div>
      <div className="center-div">
        {inputValue.trim().length === 0 && <div style={{ color: '#8A2BE2' }}>
          {inputErrorText} </div>}
        <div style={{ color: '#8A2BE2' }}>&nbsp;{!showEnter && i18n.t('press Enter')}
        </div>
      </div>
    </div>
  )
})
