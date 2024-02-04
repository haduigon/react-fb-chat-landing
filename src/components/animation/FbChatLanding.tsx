import { FbAll, FbAnimation, FbMessage } from './FbAnimation';
import { useCallback, useEffect, useState } from 'react';
import { NameInput } from "../input/NameInput";
import { useSearchParams } from 'react-router-dom';
import { CheckboxDouble, CheckboxCelebs } from '../checkbox/CustomCheckBoxes';
import { SelectDateOfBirth } from '../select/SelectDateOfBirth';
import { SingleValue } from "react-select";
import { GiSwordwoman, GiSwordman } from "react-icons/gi";
import { Stripe } from '../payment/Stripe';
import { getHoroSign, client } from '../../helpers/utils';
import { celebPrompt, intro, firstQuestion, secondQuestion } from '../../helpers/diallogText';
import { City }  from 'country-state-city';
import { CityInput } from '../input/CityInput';
import debounce from 'lodash.debounce';

type SelectOption = {
  value: string | number | null,
  label: string | number
}

export const FbChatLanding: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const inputName: string = searchParams.get('name') || '';
  const day: string = searchParams.get('day') || '';
  const month: string = searchParams.get('month') || '';
  const year: string = searchParams.get('year') || '';
  const city2: string = searchParams.get('city') || '';
  const [step2, setStep2] = useState(false);
  const [radioState, _setRadioState] = useState('');
  const [isLoading, setIsLoadong] = useState(false);
  const [celebs, setCelebs] = useState<string[]>([]);
  const [choosenCeleb, setChoosenCeleb] = useState('0');
  const [marriage, setMarriage] = useState(false);
  const [time, setTime] = useState(false);
  const [horoSign, setHoroSign] = useState('');
  const isBithdateSet = (day.length > 0) && (month.length > 0) && (year.length > 0);

  useEffect(() => {
    if (isBithdateSet) {
      setIsLoadong(true);
      client.post('/chat', {
        prompt: celebPrompt(horoSign)
      }).then((response: any) => {
        console.log(response.data, 'resp data');
        setCelebs(response.data.message.split('\n\n'));
      }).finally(() => {
        setIsLoadong(false);
      })
    }
    if (day !== '' && month !== '') {
      setHoroSign(getHoroSign(month, +day))
    }
  }, [isBithdateSet]);

  useEffect(() => {
    params.delete('day');
    params.delete('month');
    params.delete('year');
    params.delete('name');
    params.delete('city');
    setSearchParams(params);
    setTimeout(() => {
      setTime(true);
    }, 8000)
  }, [])

  function handleInput(value: string, fieldName: string) {
    if (!value) {
      params.delete(fieldName);
    } else {
      params.set(fieldName, value);
    }

    setSearchParams(params);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

    if (event.key === 'Enter' && inputName.replace(/\s/g, '').length > 0) {
      setStep2(true);
    }
  }

  function handleSelectParam(value: SingleValue<SelectOption>, param: string) {

    if (value?.value === param) {
      params.delete(param)
    } else {
      params.set(param, String(value?.value));
    }

    setSearchParams(params);

  }

  if (celebs.length) {
    const defice = celebs[1].indexOf('-');
    const celebName = celebs[1].slice(3, defice);
  }

  return (
    <div>
      <FbAll text={intro} />

      {time &&
        <FbAll
          text={firstQuestion}
          child={<NameInput
            onChange={(event) => handleInput(event.target.value, 'name')}
            onKeyDown={handleKeyDown}
            inputErrorText='Input your name and'
            field='name'
            showEnter={step2}
          />}
        />
      }

      {/* {inputName.length > 1 && <Navigate to="/download"/>} */}
      {/* {city2.length > 0 && (
        <div>
          {foundCity.map(city => {
            return (
              <div>{city.name}</div>
            )
          })}
        </div>
      )} */}
      {step2 && 
        <FbAll
        text={secondQuestion}
        child={<CityInput
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          inputErrorText='Input your city of birth and'
          field='city'
          showEnter={step2}
        />}
      />
      }

      {/* {step2 &&
        <FbAll
          text={`${inputName}, ${secondQuestion}`}
          child={
            <CheckboxDouble
              onChange={setRadioState}
              text={`${inputName}, select your sex`}
              text2="Female"
              text3="Male"
              icon1={<GiSwordwoman className='size-25' />}
              icon2={<GiSwordman className='size-25' />}
            />
          }
        />} */}

      {radioState.length > 0 && (
        <FbAll
          text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia reiciendis, '
          child={<SelectDateOfBirth onChange={handleSelectParam} />}
        />
      )}

      {isLoading && (
        <FbAnimation />
      )}
      {celebs.length > 0 && (
        <FbMessage
          text="This day were born next wemen, please choose whom do you assosiate yourself with more"
          child={
            <CheckboxCelebs
              text2={celebs[2]}
              text3={celebs[3]}
              text={celebs[1]}
              onChange={setChoosenCeleb}
            />
          }
        />
      )}

      {choosenCeleb !== '0' && (
        <FbAll
          text='Are you married?'
          child={
            <CheckboxDouble
              text='please, choose'
              onChange={() => setMarriage(true)}
              text2='yes'
              text3='no'
            />
          }
        />
      )}

      {marriage && (
        <FbAll
          text='Buy forecast and unveil the future'
          child={
            <Stripe />
          }
        />
      )}
    </div>
  )
}

