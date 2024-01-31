import { FbAll, FbAnimation, FbMessage } from './FbAnimation';
import { useEffect, useMemo, useState } from 'react';
import { NameInput } from "../input/NameInput";
import { useSearchParams, Navigate } from 'react-router-dom';
import { CheckboxDouble, CheckboxCelebs } from '../checkbox/CustomCheckBoxes';
import { SelectDateOfBirth } from '../select/SelectDateOfBirth';
import { SingleValue } from "react-select";
import { GiSwordwoman, GiSwordman } from "react-icons/gi";
import { Stripe } from '../payment/Stripe';
import { getHoroSign, client } from '../../helpers/utils';
import { intro1, intro2, intro3 } from '../../helpers/diallogText';

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
  const [step2, setStep2] = useState(false);
  const [radioState, setRadioState] = useState('');
  const [isLoading, setIsLoadong] = useState(false);
  const [celebs, setCelebs] = useState<string[]>([]);
  const [choosenCeleb, setChoosenCeleb] = useState('0');
  const [marriage, setMarriage] = useState(false);
  const [time1, setTime1] = useState(false);
  const [time2, setTime2] = useState(false);
  // const [time3, setTime3] = useState(false);


  const isBithdateSet = (day.length > 0) && (month.length > 0) && (year.length > 0);

  const [horoSign, setHoroSign] = useState('');

  useEffect(() => {
    if (isBithdateSet) {
      setIsLoadong(true);
      client.post('/chat', {
        prompt: `write me three female celebreties who were born exectly ${day} ${month} and have the children after 1991 year`
      }).then((response: any) => {
        console.log(response.data.message.split('\n\n'), 'resp data');
        setCelebs(response.data.message.split('\n\n'));
      }).finally(() => {
        setIsLoadong(false);
      })
    }
    if (day !== '' && month !== '') {
      setHoroSign(getHoroSign(month, +day))
    }
  }, [isBithdateSet]);

  // console.log(horoSign);
  

  useEffect(() => {
    params.delete('day');
    params.delete('month');
    params.delete('year');
    params.delete('name');
    setSearchParams(params);
    setTimeout(() => {
      setTime1(true);
    }, 8000)
    setTimeout(() => {
      setTime2(true);
    }, 16000)
    // setTimeout(() => {
    //   setShowMessage(true);
    // }, 4500);
  }, [])

  console.log(horoSign, 'horoSIgn');

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      params.delete('name');
    } else {
      params.set('name', event.target.value);
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
      <FbAll text={intro1} />

      {time1 &&
        <FbAll text={intro2} />
      }

      {time2 &&
        <FbAll
          text={intro3}
          child={<NameInput
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            inputErrorText='Input your name and'
            field='name'
            showEnter={step2}
          />}
        />
      }

      {step2 &&
        <FbAll
          text={`${inputName}, lorem ipsum dolor sit amet consectetur adipisicing elit. Officia reiciendis,`}
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
        />}

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
        // <Navigate to="/download" />
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

