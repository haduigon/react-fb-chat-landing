import './CommonInputStyles.scss';
import { useSearchParams } from 'react-router-dom';
import { City } from 'country-state-city';
import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useEffect } from 'react';
import { CityType } from '../../helpers/types';
import ReactGA from 'react-ga4';

ReactGA.initialize("G-W995KS9W3X");

type Props = {
  onChange: (event: string, field: string) => void,
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, filedName?: string) => void,
  onClick: (filedName?: string) => void,
  inputErrorText: string,
  field?: string,
  showEnter: boolean,
}

function compare(a: CityType, b: CityType) {
  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  }
  if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
    return 1;
  }
  return 0;
}

function bSearch(array: CityType[], search: string) {
  let start = 0
  let end = array.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (array[mid].name.substring(0, search.length).toLocaleLowerCase() === (search.toLocaleLowerCase())) {

      return mid;
    }
    else if (array[mid].name.substring(0, search.length).toLocaleLowerCase() < search.toLocaleLowerCase()) {

      start = mid + 1;
    }
    else {

      end = mid - 1;
    }
  }

  return -1;
}

export const CityInput: React.FC<Props> = ({
  onChange,
  onKeyDown,
  onClick,
  inputErrorText,
  showEnter,
}) => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [hints, setHints] = useState<Array<any>>([]);
  const city2: string = searchParams.get('city') || '';
  const [showHint, setShowHint] = useState(true);
  const myRef = useRef<null | HTMLInputElement>(null);
  const hintsRef = useRef<null | HTMLDivElement>(null);
  
  useEffect(() => {
    const cities: any = [...City.getAllCities()];

    cities.sort(compare as any);

    let foundCity: Array<any> = [];

    if (city2.length >= 3) {
      let res = 0;
      while (res !== -1) {
        res = bSearch(cities, city2)

        if (res !== -1) {
          foundCity.push(cities[res]);
          cities.splice(res, 1);
        }
      }
    }

    setHints(foundCity);
  }, [city2]);

  useEffect(() => {
    if (myRef.current) {
      setTimeout(() => {
        myRef.current?.focus();
      }, 800)
    }
  }, [myRef]);

  function handleInput(event: string) {
    setSearch(event);
    setInputValue(event);
    setShowHint(true);
  }

  function handleClick(value: string) {
    onChange(value, 'city');
    setInputValue(value);
    setShowHint(false);
    onClick('city');
  }

  function customOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    onKeyDown(event, 'city');
    setShowHint(false);
  }
  const setSearch = useCallback(debounce((city: string) => onChange(city, 'city'), 1000), []);

  return (

    <div className='input-container'>
      <div className='input-box'>
        {((inputValue.length >= 3) && (showHint)) &&
          <div className='drop'>
            {hints.map(city => {
              const key = city.name;
              return (
                <div
                  key={key}
                  style={{ cursor: 'pointer' }}
                  onClick={(event) => handleClick(city.name)}
                  className="drop-text"
                >
                  {city.name} {city.countryCode}
                </div>
              )
            })}
            <div ref={hintsRef} />
          </div>
        }
        <input
          value={inputValue}
          className="input is-link custom-font input-box"
          type="text"
          placeholder="London"
          onChange={(event) => handleInput(event.target.value)}
          ref={myRef}
          onKeyDown={(event) => customOnKeyDown(event)}
        />
      </div>
      <div className="center-div">
        {inputValue.trim().length === 0 && <div style={{ color: '#8A2BE2' }}>
          {inputErrorText} </div>}
        <div style={{ color: '#8A2BE2' }}>&nbsp;{!showEnter && 'press Enter'}
        </div>
      </div>
    </div>
  )
}
