import React, { useEffect, useRef, useState } from "react";
import LanguagesInput from "./LanguagesInput";
import axios from "axios";

const Translator = () => {
  const [languages, setLanguages] = useState([]);
  const [result, setResult] = useState("");
  const sourceLanguage = useRef("");
  const targetLanguage = useRef("");
  const userText = useRef("");

  useEffect(() => {
    const getLanguages = async () => {
      const options = {
        method: "GET",
        url: "https://text-translator2.p.rapidapi.com/getLanguages",
        headers: {
          "x-rapidapi-key":
            "3ca895565emshe3431b6ea04373ep1d4dbbjsncb4ccf32ba06",
          "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setLanguages(response.data.data.languages);
      } catch (error) {
        console.error(error);
      }
    };

    getLanguages();
  }, []);

  const handleTranslation = async () => {
    const data = new FormData();
    data.append("source_language", sourceLanguage.current.value);
    data.append("target_language", targetLanguage.current.value);
    data.append("text", userText.current.value);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": "3ca895565emshe3431b6ea04373ep1d4dbbjsncb4ccf32ba06",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      setResult(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReverse = () => {
    const temp = sourceLanguage.current.value;
    sourceLanguage.current.value = targetLanguage.current.value;
    targetLanguage.current.value = temp;
  };

  return (
    <>
      <h2>Translator</h2>
      <textarea
        name='user-inp'
        id='user-inp'
        cols='27'
        rows='7'
        placeholder='//Enter text to translate'
        ref={userText}
      ></textarea>
      <div className='lang-inps'>
        <LanguagesInput languages={languages} ref={sourceLanguage} />
        <button className='reverse' onClick={handleReverse}>
          <i className='fa-solid fa-arrow-right-arrow-left'></i>
        </button>
        <LanguagesInput languages={languages} ref={targetLanguage} />
      </div>
      <div className='result'>
        <p>{result}</p>
      </div>
      <button onClick={handleTranslation}>Translate</button>
    </>
  );
};

export default Translator;
