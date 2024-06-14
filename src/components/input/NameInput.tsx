import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './CommonInputStyles.scss';
import i18n from '../../helpers/i18n';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, filedName: string) => void,
  inputErrorText: string,
  field: string,
  showEnter: boolean,
  placeholder?: string
}

export const NameInput: React.FC<Props> = ({
  onChange,
  onKeyDown,
  inputErrorText,
  field,
  showEnter,
  placeholder="Lilu Dallas",
}) => {
  const [searchParams] = useSearchParams();
  const inputValue: string = searchParams.get(field) || '';
  const myRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (myRef.current) {
      myRef.current.focus();
    }
  }, [myRef]);

  return (

    <div className='input-container'>
      <div className='input-box'>
        <input
          value={inputValue}
          className="input is-link custom-font input-box"
          type="text"
          placeholder={placeholder}
          onChange={(event) => onChange(event)}
          ref={myRef}
          onKeyDown={(event) => onKeyDown(event, field)}
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
}
