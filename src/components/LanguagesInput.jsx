import React from "react";

const LanguagesInput = React.forwardRef(({ languages }, ref) => {
  return (
    <select name='lang' id='lang' ref={ref}>
      {languages.map((language) => (
        <option key={language.id} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
});

export default LanguagesInput;
