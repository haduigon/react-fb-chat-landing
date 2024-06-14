import { FbAll, FbAnimation } from "./FbAnimation";
import { useContext, useEffect, useState } from "react";
import { NameInput } from "../input/NameInput";
import { useSearchParams } from "react-router-dom";
import { CheckboxDouble } from "../checkbox/CustomCheckBoxes";
import { SelectDateOfBirth } from "../select/SelectDateOfBirth";
import { SingleValue } from "react-select";
import { client } from "../../helpers/utils";
import { getFinalPrompt } from "../../helpers/diallogText";
import { CityInput } from "../input/CityInput";
import { BiMaleFemale } from "react-icons/bi";
import { FaFemale } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { GrRestroomWomen } from "react-icons/gr";
import { TbMoodBoy } from "react-icons/tb";
import { CgGirl } from "react-icons/cg";
import { StateContext } from "../../context/AppContext";
import { ACTIONS } from "../../helpers/enums";
import ReactPixel, { AdvancedMatching } from "react-facebook-pixel";
import ReactGA from "react-ga4";
import i18n from "../../helpers/i18n";
import LanguageDetector from "i18next-browser-languagedetector";

type SelectOption = {
  value: string | number | null;
  label: string | number;
  name: string;
};

export const FbChatLanding: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const inputName: string = searchParams.get("name") || "";
  const day: string = searchParams.get("day") || "";
  const month: string = searchParams.get("month") || "";
  const year: string = searchParams.get("year") || "";
  const isMarried: string = searchParams.get("isMarried") || "";
  const partnerDay: string = searchParams.get("dayPartner") || "";
  const partnerMonth: string = searchParams.get("monthPartner") || "";
  const partnerYear: string = searchParams.get("yearPartner") || "";
  const childDay: string = searchParams.get("dayChild") || "";
  const childMonth: string = searchParams.get("monthChild") || "";
  const childYear: string = searchParams.get("yearChild") || "";
  const hasChildren: string = searchParams.get("hasChildren") || "";
  const pixelId: string = searchParams.get("pixelId") || "";
  const futureChild: string = searchParams.get("futureChild") || "";
  const futureChildName: string = searchParams.get("futureChildName") || "";

  const [question2, setQuestion2] = useState(false);
  const [question4, setQuestion4] = useState(false);
  const [question5, setQuestion5] = useState(false);
  const [question6, setQuestion6] = useState(false);
  const [question7, setQuestion7] = useState(false);
  const [isLoading, setIsLoadong] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState(false);
  const [responseData, setResponseData] = useState("");
  const [question1, setQuestion1] = useState(false);
  const isBithdateSet = day.length > 0 && month.length > 0 && year.length > 0;
  const isPartnerBithdateSet =
    partnerDay.length > 0 && partnerMonth.length > 0 && partnerYear.length > 0;
  const isChildBithdateSet =
    childDay.length > 0 && childMonth.length > 0 && childYear.length > 0;
  const { state, dispatch } = useContext(StateContext);

  const fourthQuestion: Array<string> = i18n.t("fourthQuestion", {
    returnObjects: true,
  });
  const fifthQuestion: Array<string> = i18n.t("fifthQuestion", {
    returnObjects: true,
  });
  const questionSeven: Array<string> = i18n.t("questionSeven", {
    returnObjects: true,
  });

  useEffect(() => {
    params.delete("day");
    params.delete("month");
    params.delete("year");
    params.delete("name");
    params.delete("city");
    params.delete("isMarried");
    params.delete("hasChildren");
    params.delete("dayPartner");
    params.delete("monthPartner");
    params.delete("yearPartner");
    params.delete("dayChild");
    params.delete("monthChild");
    params.delete("yearChild");
    params.delete("futureChild");
    params.delete("futureChildName");
    setSearchParams(params);
    setTimeout(() => {
      setQuestion1(true);
    }, 8000);
    ReactGA.initialize("G-W995KS9W3X");
    ReactGA.send({
      hitType: "pageview",
      page: "https://ro.destiny4you.com/#/",
      title: "ro.destiny4you.com/#/",
    });
  }, []);

  useEffect(() => {
    const advancedMatching = { em: "some@email.com" };
    const options = {
      autoConfig: true,
      debug: true,
    };
    ReactPixel.init(pixelId, advancedMatching as AdvancedMatching, options);
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    if (isBithdateSet) {
      ReactGA.event({
        category: "select",
        action: "select date of birth done",
        label: "date of birth",
        value: 1,
        nonInteraction: false,
      });
    }
  }, [isBithdateSet]);

  let currentLang = new LanguageDetector().detect() as string;

  useEffect(() => {
    if (finalPrompt) {
      setIsLoadong(true);
      client
        .post("chat", {
          prompt: getFinalPrompt(
            inputName,
            isMarried,
            day,
            month,
            year,
            partnerDay,
            partnerMonth,
            partnerYear,
            hasChildren,
            futureChild,
            futureChildName,
            currentLang
          ),
          clientDetails: inputName,
        })
        .then((response: any) => {
          setResponseData(response.data.message);
          dispatch({
            type: ACTIONS.SET_FORECAST,
            payload: response.data.message,
          });
          localStorage.setItem("report", response.data.message);
        })
        .finally(() => setIsLoadong(false));
    }
  }, [finalPrompt]);

  function handleInput(value: string, fieldName: string) {
    if (!value) {
      params.delete(fieldName);
    } else {
      params.set(fieldName, value);
    }

    setSearchParams(params);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    filedName?: string
  ) {
    switch (filedName) {
      case "name":
        if (event.key === "Enter" && inputName.replace(/\s/g, "").length > 0) {
          setQuestion2(true);
          dispatch({ type: ACTIONS.SET_ONLINE, payload: !state.isOnline });
          ReactGA.event({
            category: "Input",
            action: "input name done",
            label: "name",
            value: 1,
            nonInteraction: false,
          });
        }
        break;
      case "city":
        if (event.key === "Enter" && inputName.replace(/\s/g, "").length > 0) {
          setQuestion4(true);
          ReactGA.event({
            category: "Input",
            action: "input city done",
            label: "city",
            value: 2,
            nonInteraction: false,
          });
        }
        break;
      case "futureChildName":
        if (event.key === "Enter" && inputName.replace(/\s/g, "").length > 0) {
          setFinalPrompt(true);
          ReactGA.event({
            category: "Input",
            action: "input futureChildName done",
            label: "futureChildName",
            value: 3,
            nonInteraction: false,
          });
        }
        break;
    }
  }

  function handleClick() {
    setQuestion4(true);
  }

  function handleSelectParam(value: SingleValue<SelectOption>, param: string) {
    if (value?.value === param) {
      params.delete(param);
    } else {
      params.set(param, String(value?.value));
      ReactGA.event({
        category: `${param}`,
        action: `${param} : ${value}`,
        label: `${param}`,
      });
    }

    setSearchParams(params);
  }

  function handleChange(data: string, fieldName: string) {
    ReactGA.event({
      category: `${fieldName}`,
      action: `${fieldName} : ${data}`,
      label: `${fieldName}`,
    });

    if (fieldName === "isMarried") {
      setQuestion5(true);
    }
    if (fieldName === "hasChildren") {
      setQuestion6(true);
    }
    if (fieldName === "futureChild") {
      setQuestion7(true);
    }
    handleInput(data, fieldName);
  }

  return (
    <div>
      <FbAll text={i18n.t('intro')} />
     
      {question1 &&
        <FbAll
          text={i18n.t('firstQuestion')}
          child={<NameInput
            onChange={(event) => handleInput(event.target.value, 'name')}
            onKeyDown={handleKeyDown}
            inputErrorText={i18n.t('Input your name and')}
            field='name'
            showEnter={question2}
          />}
        />
      }

      {question2 &&
        <FbAll
          text={`${inputName}, ${i18n.t('secondQuestion')}`}
          child={<SelectDateOfBirth onChange={handleSelectParam} />}
        />
      }

      {isBithdateSet && (
        <FbAll
          text={i18n.t("thirdQuestion")}
          child={
            <CityInput
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onClick={handleClick}
              inputErrorText={i18n.t("Input your city and")}
              showEnter={question4}
            />
          }
        />
      )}

      {question4 && (
        <FbAll
          text={fourthQuestion[0]}
          child={
            <CheckboxDouble
              onChange={(event) => handleChange(event, "isMarried")}
              text2={fourthQuestion[1]}
              text3={fourthQuestion[2]}
              icon1={<BiMaleFemale size={30} />}
              icon2={<FaFemale size={30} />}
              field="isMarried"
            />
          }
        />
      )}

      {question5 && isMarried === "no" && (
        <FbAll
          text={fifthQuestion[0]}
          child={
            <CheckboxDouble
              onChange={(event) => handleChange(event, "hasChildren")}
              text2={fifthQuestion[1]}
              text3={fifthQuestion[2]}
              icon1={<FaChildren size={30} />}
              icon2={<GrRestroomWomen size={30} />}
              field="hasChildren"
            />
          }
        />
      )}

      {question5 && isMarried === "yes" && (
        <FbAll
          text={i18n.t("fifthQuestionWithPartner")}
          child={
            <SelectDateOfBirth
              onChange={(event: SingleValue<SelectOption>) =>
                handleSelectParam(event, `${event?.name}Partner`)
              }
            />
          }
        />
      )}

      {isPartnerBithdateSet && (
        <FbAll
          text={fifthQuestion[0]}
          child={
            <CheckboxDouble
              onChange={(event) => handleChange(event, "hasChildren")}
              text2={fifthQuestion[1]}
              text3={fifthQuestion[2]}
              icon1={<FaChildren size={30} />}
              icon2={<GrRestroomWomen size={30} />}
              field="hasChildren"
            />
          }
        />
      )}

      {question6 && hasChildren === "yes" && (
        <FbAll
          text={i18n.t("questionSixIfHasChild")}
          child={
            <SelectDateOfBirth
              onChange={(event: SingleValue<SelectOption>) =>
                handleSelectParam(event, `${event?.name}Child`)
              }
            />
          }
        />
      )}

      {question6 && hasChildren === "no" && (
        <FbAll
          text={questionSeven[0]}
          child={
            <CheckboxDouble
              text2={questionSeven[1]}
              icon1={<TbMoodBoy />}
              text3={questionSeven[2]}
              icon2={<CgGirl />}
              onChange={(event) => handleChange(event, "futureChild")}
              field="futureChild"
            />
          }
        />
      )}

      {isChildBithdateSet && (
        <FbAll
          text={questionSeven[0]}
          child={
            <CheckboxDouble
              text2={questionSeven[1]}
              icon1={<TbMoodBoy />}
              text3={questionSeven[2]}
              icon2={<CgGirl />}
              onChange={(event) => handleChange(event, "futureChild")}
              field="futureChild"
            />
          }
        />
      )}

      {question7 && (
        <FbAll
          text={i18n.t("questionEightFutureName")}
          child={
            <NameInput
              onChange={(event) =>
                handleInput(event.target.value, "futureChildName")
              }
              onKeyDown={handleKeyDown}
              inputErrorText={i18n.t("Input child name and")}
              field="futureChildName"
              showEnter={finalPrompt}
              placeholder="Michelle"
            />
          }
        />
      )}

      {isLoading && <FbAnimation />}

      {responseData.length > 0 && (
        <>
          <FbAll text={responseData} cover={true} />
          <div></div>
        </>
      )}
    </div>
  );
};
