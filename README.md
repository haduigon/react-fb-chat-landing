**React fb chat**

# _Description:_

Developed for mobile and tablets. A few pieces of code imitate a Facebook chat quiz with a ChatGPT request and payment request at the end. Message animation and message appearance may be used commonly or separately. You can customize everything: images, questions, text content, GPT prompts, etc. You can download pdf response. Project has simple Node js backend which is described in Reflection. You pass your own element as props. Feel free to use, improve, and discuss it

# [Demolink](https:) i do not have a stripe keys here, bellow you have a fully working link where you can toss me a panny :)

# _Status:_

In progress

Feel free to suggest any improvements.

[![GitHub license](https://img.shields.io/github/license/haduigon/fb_horo_chat_landing)](https://github.com/haduigon/fb_horo_chat_landing/blob/master/LICENSE)

[![GitHub stars](https://img.shields.io/github/stars/haduigon/fb_horo_chat_landing)](https://github.com/haduigon/fb_horo_chat_landing/stargazers)

[![GitHub issues](https://img.shields.io/github/issues/haduigon/fb_horo_chat_landing)](https://github.com/haduigon/fb_horo_chat_landing/issues)

[![GitHub forks](https://img.shields.io/github/forks/haduigon/fb_horo_chat_landing)](https://github.com/haduigon/fb_horo_chat_landing/network)

# _Screenshots are bellow:_

<details>
<img width="1792" alt="Screenshot_FB_CHAT4" src="https://github.com/haduigon/fb_horo_chat_landing/assets/20277989/93d7e933-1aca-4042-8e63-c15ff333efbd">
<img width="1792" alt="Screenshot_FB_CHAT3" src="https://github.com/haduigon/fb_horo_chat_landing/assets/20277989/b724cab7-ae06-421a-a1a7-53125bdea1f4">
<img width="1792" alt="Screenshot_FB_CHAT2" src="https://github.com/haduigon/fb_horo_chat_landing/assets/20277989/d78d533e-354b-4ee9-a5fc-86c194af5da3">
<img width="1792" alt="Screenshot_FB_CHAT" src="https://github.com/haduigon/fb_horo_chat_landing/assets/20277989/7f2a9749-aa76-4814-85e9-c6c18a8273d8">
</details>

# Technologies list:

[![React](https://img.shields.io/badge/React-18.3.1-green)](https://react.dev/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-green)](https://www.typescriptlang.org/)

[![React-router-dom](https://img.shields.io/badge/React%20Router%20Dom-6.23.1-yellow)](https://reactrouter.com/en/main)

[![React Context](https://img.shields.io/badge/React%20Context-0.0.3-blue)](https://reactjs.org/docs/context.html)

[![Axios](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![Bulma](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![pretty-checkbox-react](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![i18next](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![@stripe/react-stripe-js](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![react-ga4](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![react-facebook-pixel](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![classnames](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![react-select](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![react-icons](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)

[![js-file-download](https://img.shields.io/badge/Axios-18.3.1-orange)](https://axios.com)


# React phone catalog features:

FEATURES

# _Usage as always is very simple:_

_npm i_

_npm start_

Pass component as a child and use different languages.

    <FbAll
      text={`${inputName}, ${i18n.t('secondQuestion')}`}
      child={<SelectDateOfBirth onChange={handleSelectParam} />}
    />

# Reflection

This is a simple, fully completed commercial project. It has been a great experience for me and an amazing team effort. I have utilized many new technologies and a few libraries for selct, input, etc. Successfully resolving several cumbersome issues. Additionally, I implemented a multi-language landing page using i18next. As a backend I wrote a simple script which get a request from client with a prompt, send it to openai api, get the response, create pdf file with content, save it and if you pay returns you a link for download. Probably, I will upload it little bit later. Project was deployed by my own on VPS Debian, using SSL. Feel free to improve my code and let me know about it %)
