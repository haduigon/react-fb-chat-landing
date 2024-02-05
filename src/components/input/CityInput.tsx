import './NameInput.scss';
import { useSearchParams } from 'react-router-dom';
import { City } from 'country-state-city';
import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';

type Props = {
  onChange: (event: string, field: string) => void,
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  inputErrorText: string,
  field?: string,
  showEnter: boolean,
}

export const CityInput: React.FC<Props> = ({
  onChange,
  onKeyDown,
  inputErrorText,
  showEnter,
}) => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const cities = City.getAllCities();
  const [hints, setHints] = useState<Array<any>>([]);
  const city2: string = searchParams.get('city') || '';
  const [showHint, setShowHint] = useState(true);
  const myRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    let foundCity: Array<any> = [];

    if (city2.length > 0) {
      foundCity = cities.filter(city => city.name.includes(inputValue))
    }

    setHints(foundCity);
  }, [city2])

  useEffect(() => {
    if (myRef.current) {
      myRef.current.focus();
    }
  }, [myRef])
 
  function handleInput(event: string) {
    setSearch(event);
    setInputValue(event);
    setShowHint(true);
  }

  function handleClick(value: string) {
    onChange(value, 'city');
    setInputValue(value);
    setShowHint(false);
  }
  const setSearch = useCallback(debounce((city: string) => onChange(city, 'city'), 1000), []);

  return (

    <div className='input-container'>
      <div className='input-box'>
        {((inputValue.length > 0) && (showHint)) &&
          <div>
            {hints.map(city => {
              return (
                <div
                  style={{cursor: 'pointer'}}
                  onClick={() => handleClick(city.name)}
                >
                  {city.name} {city.countryCode}
                </div>
              )
            })}
          </div>
        }
        <input
          value={inputValue}
          className="input is-link custom-font input-box"
          type="text"
          placeholder="London"
          onChange={(event) => handleInput(event.target.value)}
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
