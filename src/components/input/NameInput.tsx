import { useEffect, useRef } from 'react';
import './NameInput.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  inputErrorText: string,
  field: string,
  showEnter: boolean,
}

export const NameInput: React.FC<Props> = ({
  onChange,
  onKeyDown,
  inputErrorText,
  field,
  showEnter,
}) => {
  const [searchParams] = useSearchParams();
  const inputValue: string = searchParams.get(field) || '';
  const myRef = useRef<null | HTMLInputElement>(null);



  useEffect(() => {
    if (myRef.current) {
      myRef.current.focus();
    }
  }, [myRef])

  return (

    <div className='input-container'>
      <div className='input-box'>
        <input
          value={inputValue}
          className="input is-link custom-font input-box"
          type="text"
          placeholder="Lilu Dallas"
          onChange={(event) => onChange(event)}
          ref={myRef}
          onKeyDown={(event) => onKeyDown(event)}
        />
      </div>
      <div className="center-div">
        {inputValue.trim().length === 0 && <div style={{ color: 'lightgrey' }}>
          {inputErrorText} </div>}
        <div style={{ color: 'lightgrey' }}>&nbsp;{!showEnter && 'press Enter'}
        </div>
      </div>
    </div>
  )
}
