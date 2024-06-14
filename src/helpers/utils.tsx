import axios from 'axios';
import React, { useEffect } from 'react';
import ReactPixel, { AdvancedMatching } from 'react-facebook-pixel';
import { CityType } from './types';

export function getHoroSign(month: string, day: number) {

  let horoSign = "";

  if (month === 'December') {

    if (day < 22)
      horoSign = "Sagittarius";
    else
      horoSign = "Capricorn";
  }

  else if (month === 'January') {
    if (day < 20)
      horoSign = "Capricorn";
    else
      horoSign = "Aquarius";
  }

  else if (month === 'February') {
    if (day < 19)
      horoSign = "Aquarius";
    else
      horoSign = "Pisces";
  }

  else if (month === 'March') {
    if (day < 21)
      horoSign = "Pisces";
    else
      horoSign = "Aries";
  }
  else if (month === 'April') {
    if (day < 20)
      horoSign = "Aries";
    else
      horoSign = "Taurus";
  }

  else if (month === 'May') {
    if (day < 21)
      horoSign = "Taurus";
    else
      horoSign = "Gemini";
  }

  else if (month === 'June') {
    if (day < 21)
      horoSign = "Gemini";
    else
      horoSign = "Cancer";
  }

  else if (month === 'July') {
    if (day < 23)
      horoSign = "Cancer";
    else
      horoSign = "Leo";
  }

  else if (month === 'August') {
    if (day < 23)
      horoSign = "Leo";
    else
      horoSign = "Virgo";
  }

  else if (month === 'September') {
    if (day < 23)
      horoSign = "Virgo";
    else
      horoSign = "Libra";
  }

  else if (month === 'October') {
    if (day < 23)
      horoSign = "Libra";
    else
      horoSign = "Scorpio";
  }

  else if (month === 'November') {
    if (day < 22)
      horoSign = "Scorpio";
    else
      horoSign = "Sagittarius";
  }

  return horoSign;
}

const apiUrl = 'https://ro.sms.destiny4you.com';

export const client = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
})

type Props = {
  pixelId: string,
}

export const Tracker: React.FC<Props> = React.memo((({ pixelId }) => {
  
  useEffect(() => {
    const advancedMatching = { em: 'some@email.com' };
    const options = {
      autoConfig: true, 
      debug: true,
    };
    ReactPixel.init("530232662524472", advancedMatching as AdvancedMatching, options);
   
    ReactPixel.pageView();
    
  }, [])

  return (
    <></>
  )
}))

export function compare(a: CityType, b: CityType) {
  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
    return -1;
  }
  if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
    return 1;
  }
  return 0;
}

export function bSearch(array: CityType[], search: string) {
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
