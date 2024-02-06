import { FbAll, FbAnimation, FbMessage } from './FbAnimation';
import { useCallback, useEffect, useState } from 'react';
import { NameInput } from "../input/NameInput";
import { useSearchParams } from 'react-router-dom';
import { CheckboxDouble, CheckboxCelebs } from '../checkbox/CustomCheckBoxes';
import { SelectDateOfBirth } from '../select/SelectDateOfBirth';
import { SingleValue } from "react-select";
// import { GiSwordwoman, GiSwordman } from "react-icons/gi";
// import { Stripe } from '../payment/Stripe';
import { getHoroSign, client } from '../../helpers/utils';
import { intro, firstQuestion, secondQuestion, thirdQuestion, fourthQuestion } from '../../helpers/diallogText';
import { CityInput } from '../input/CityInput';
import { BiMaleFemale } from "react-icons/bi";
import { FaFemale } from "react-icons/fa";

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
  const [question2, setQuestion2] = useState(false);
  const [question3, setQuestion3] = useState(false);
  const [question4, setQuestion4] = useState(false);
  const [question5, setQuestion5] = useState(false);
  const [radioState, _setRadioState] = useState('');
  const [isLoading, setIsLoadong] = useState(false);
  // const [celebs, setCelebs] = useState<string[]>([]);
  // const [choosenCeleb, setChoosenCeleb] = useState('0');
  const [marriage, setMarriage] = useState(false);
  const [question1, setQuestion1] = useState(false);
  const [horoSign, setHoroSign] = useState('');
  const isBithdateSet = (day.length > 0) && (month.length > 0) && (year.length > 0);

  useEffect(() => {
    // if (isBithdateSet) {
    //   setIsLoadong(true);
    //   client.post('/chat', {
    //     prompt: celebPrompt(horoSign)
    //   }).then((response: any) => {
    //     console.log(response.data, 'resp data');
    //     setCelebs(response.data.message.split('\n\n'));
    //   }).finally(() => {
    //     setIsLoadong(false);
    //   })
    // }
    if (day !== '' && month !== '' && year !== '') {
      setHoroSign(getHoroSign(month, +day));
      setQuestion3(true);
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
      setQuestion1(true);
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, filedName?: string) {
    switch (filedName) {
      case 'name':
        if (event.key === 'Enter' && inputName.replace(/\s/g, '').length > 0) {
          setQuestion2(true);
        }
        break;
      case 'city':
        if (event.key === 'Enter' && inputName.replace(/\s/g, '').length > 0) {
          setQuestion4(true);
        }
    }
  }

  function handleClick(filedName?: string) {
    setQuestion4(true);
  }

  function handleSelectParam(value: SingleValue<SelectOption>, param: string) {

    if (value?.value === param) {
      params.delete(param)
    } else {
      params.set(param, String(value?.value));
    }

    setSearchParams(params);
  }

  function handleChange(hasPartner?: string) {
    setQuestion5(true)
  }
  console.log(question4, 'question4');

  return (
    <div>
      {/* <BiMaleFemale size={4}/> */}
      <FbAll text={intro} />
      <FbAll
          text={fourthQuestion[0]}
          child={
            <CheckboxDouble
              onChange={handleChange}
              text2={fourthQuestion[1]}
              text3={fourthQuestion[2]}
              icon1={<BiMaleFemale size={30} />}
              icon2={<FaFemale size={30} />}
            />
          }
        />

      {question1 &&
        <FbAll
          text={firstQuestion}
          child={<NameInput
            onChange={(event) => handleInput(event.target.value, 'name')}
            onKeyDown={handleKeyDown}
            inputErrorText='Input your name and'
            field='name'
            showEnter={question2}
          />}
        />
      }

      {/* {inputName.length > 1 && <Navigate to="/download"/>} */}

      {/* {question2 && 
        <FbAll
        text={secondQuestion}
        child={<CityInput
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          inputErrorText='Input your city of birth and'
          showEnter={question2}
        />}
      />
      } */}

      {question2 &&
        <FbAll
          text={`${inputName}, ${secondQuestion}`}
          child={<SelectDateOfBirth onChange={handleSelectParam} />}
        />
      }

      {question3 &&
        <FbAll
          text={thirdQuestion}
          child={<CityInput
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            inputErrorText='Input your city and'
            showEnter={question4}
          />}
        />
      }


      {question4 &&
        <FbAll
          text={fourthQuestion[0]}
          child={
            <CheckboxDouble
              onChange={handleChange}
              text2={fourthQuestion[1]}
              text3={fourthQuestion[2]}
            />
          }
        />}

      {isLoading && (
        <FbAnimation />
      )}

    </div>
  )
}

