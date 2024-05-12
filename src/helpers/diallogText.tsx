import { getHoroSign } from "./utils";

export const celebPrompt = (horoSign: string) => {
  return `Write me 3 well-known female and as younger as it possible selebs who was born between 1 april and 29 april and have children. Response should be strictly the next in json [{name: name, lifeDescritpion: life descripton data}, {name: name, lifeDescritpion: life descripton data}, {name: name, lifeDescritpion: life descripton data}]`;
};

export const intro =
  "Introducing BabyStar, an unparalleled version of AI meticulously crafted to unravel the hidden connections among seemingly unrelated factors, including birthdates, marriage, place of birth and the celestial positions of stars. Our mission is to provide a deeper understanding of a child's character and destiny. With insights gleaned from the analysis of billions of forecasts and the life paths of millions, we've collaborated with top astrologers worldwide, serving as our esteemed mentors. Our analyses often lead to unexpected and insightful conclusions. Don't miss the opportunity – try it now!";

export const firstQuestion =
  "Unlock the cosmic whispers: As we delve into the realms of personalized horoscope forecasts, reveal your name and let the stars craft a tale.";

export const secondQuestion =
  "to unveil the mysteries of your personalized horoscope forecast, whisper to the stars by selecting your date of birth. What celestial revelations await?";

export const thirdQuestion =
  "As we navigate the intricate realms of personalized horoscope forecasts, share the city of your birth, and let the stars paint a vivid portrait of the cosmic energies shaping your destiny. Where did the dance of your life begin?";

export const fourthQuestion = [
  "Illuminate your unique journey—clarify if you stand solitary in this celestial dance or if celestial companions accompany you.",
  "Are you entwined in the dance of married life / partnership?",
  "Do you revel in the art of solo living?",
];

export const fifthQuestion = [
  "Have you already welcomed children into your life's story?",
  "Already blessed with children",
  "Yet to embark on the journey of parenthood",
];

export const fifthQuestionWithPartner =
  "In the realm of personalised horoscope forecasts, illuminate the cosmic canvas by revealing the date of birth of your husband or partner. Unveil the celestial mysteries that shape your shared destiny.";

export const questionSixIfHasChild =
  "Please, provide the birthdate of your first child. This will enable us to tailor insightful celestial forecasts to your unique parenting experience.";

export const questionSeven = [
  "As you imagine your future child, considering the astrological mysteries, do you lean towards a preference for a son or a daughter?",
  "Yearning for a heavenly son",
  "Longing for a cosmic daughter",
];

export const questionEightFutureName =
  "Have you already woven dreams around the name of your future child? If so, whisper it into our celestial realm";

export const getFinalPrompt = (
  name: string,
  isMarried: string,
  day: string,
  month: string,
  year: string,
  partnerDay: string,
  partnerMonth: string,
  partnerYear: string,
  hasChild: string,
  futureChildSex: string,
  futureChildName: string,
  language: string,
) => {
  const blueprint = ` REDUCE YOUR ANSWER(COMPLETION) BELLOW 3500 TOKENS ! Imagine you are a astrological consultant. Your name is BabyStar AI. You make a very important horoscope forecast for this year. The main issue our forecast is: given all facts about me bellow to predict when I have a baby. Below are the facts you need to take into accpunt.
  Given context about me: I am a women. My name is: ${name}. I am: ${
    isMarried === "yes" ? "married" : "not married"
  }.
  I was born ${day} ${month} ${year}. My horoscope sign is: ${getHoroSign(
    month,
    +day
  )}. ${
    isMarried === "yes" &&
    "my partner has next horoscope sign:" +
      getHoroSign(partnerMonth, +partnerDay)
  }.
  He was born ${partnerDay} ${partnerMonth} ${partnerYear}. ${
    hasChild === "yes" && "I already have a child."
  }. I also want to have more child it should be a ${
    futureChildSex === "yes" ? "boy" : "girl"
  } and I want to give for this child next name: ${futureChildName}.
   So write foe me horoscope forecast for a year. Every new month should be on a separate paragraph.
   Describe all spheres of life but give main attention to the ftutre child. Summirize all given info and write me a nice happy horodcope forecast for a year, describe every month separetely, there should be 12 monthes: 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'.
  Imagine now is ${new Date().toDateString()}. REDUCE YOUR ANSWER(COMPLETION) BELLOW 3500 TOKENS ! Add at the and: You personal consultant, BabyStar AI. ${language !== 'en' && 'TRANSLATE WHOLE FORECAST ON ROMANIAN LANGUAGE'}`;
  return blueprint;
};
