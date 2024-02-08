
export const celebPrompt = (horoSign: string) => {
  return `Write me 3 well-known female and as younger as it possible selebs who was born between 1 april and 29 april and have children. Response should be strictly the next in json [{name: name, lifeDescritpion: life descripton data}, {name: name, lifeDescritpion: life descripton data}, {name: name, lifeDescritpion: life descripton data}]`
}

export const intro = "Introducing BabyStar, an unparalleled version of AI meticulously crafted to unravel the hidden connections among seemingly unrelated factors, including birthdates, marriage, place of birth and the celestial positions of stars. Our mission is to provide a deeper understanding of a child's character and destiny. With insights gleaned from the analysis of billions of forecasts and the life paths of millions, we've collaborated with top astrologers worldwide, serving as our esteemed mentors. Our analyses often lead to unexpected and insightful conclusions. Don't miss the opportunity – try it now!"

export const firstQuestion = 'Unlock the cosmic whispers: As we delve into the realms of personalized horoscope forecasts, reveal your name and let the stars craft a tale.'
export const secondQuestion = 'to unveil the mysteries of your personalized horoscope forecast, whisper to the stars by selecting your date of birth. What celestial revelations await?'
export const thirdQuestion = 'As we navigate the intricate realms of personalized horoscope forecasts, share the city of your birth, and let the stars paint a vivid portrait of the cosmic energies shaping your destiny. Where did the dance of your life begin?'
export const fourthQuestion = ['Illuminate your unique journey—clarify if you stand solitary in this celestial dance or if celestial companions accompany you.','Are you entwined in the dance of married life / partnership?', 'Do you revel in the art of solo living?']
export const fifthQuestion = ["Have you already welcomed children into your life's story?", "Already blessed with children", "Yet to embark on the journey of parenthood"]
export const fifthQuestionWithPartner = "In the realm of personalised horoscope forecasts, illuminate the cosmic canvas by revealing the date of birth of your husband or partner. Unveil the celestial mysteries that shape your shared destiny.";
export const questionSixIfHasChild = 'Please, provide the birthdate of your first child. This will enable us to tailor insightful celestial forecasts to your unique parenting experience.'
export const questionSeven = ["As you imagine your future child, considering the astrological mysteries, do you lean towards a preference for a son or a daughter?", "Yearning for a heavenly son", "Longing for a cosmic daughter"]
export const finalPrompt = (horoSign: string) => {
  return '';
}
