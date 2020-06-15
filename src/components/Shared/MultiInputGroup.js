import React from 'react';
import ChipInputGroup from './ChipInputGroup';
import InputGroup from './InputGroup';
// import DatePicker from 'react-datepicker';

function MultiInputGroup(props) {
  let multiInputField = null;

  switch (props.type) {
    case 'text':
      const { blogTitle } = props;
      multiInputField = (
        <InputGroup
          name={blogTitle.name}
          placeholder={blogTitle.placeholder}
          onChange={blogTitle.handleOnChange.inputOnChange}
          value={blogTitle.value}
          error={blogTitle.error}
          type={blogTitle.type}
        />
      );
      break;
    case 'complain':
      const { blogArticle } = props;
      multiInputField = (
        <InputGroup
          name={blogArticle.name}
          placeholder={blogArticle.placeholder}
          onChange={blogArticle.handleOnChange.inputOnChange}
          value={blogArticle.value}
          error={blogArticle.error}
          type={blogArticle.type}
        />
      );
      break;
    // case 'dateInput':
    //   const { dateInput } = props;

      // multiInputField = (
        // <DatePicker
        //   className="expenses--input-date"
        //   selected={dateInput.startDate}
        //   onChange={dateInput.handleOnChange.handleOnDateChange}
        // />
      // );
      // break;
    case 'chipInput':
      const { chipInput } = props;

      multiInputField = (
        <ChipInputGroup
          className="chipInput"
          value={chipInput.valueArray}
          onChange={chipInput.handleOnChange}
          placeholder={chipInput.placeholder}
        />
      );

      break;
    default:
      return null;
  }

  return <>{multiInputField}</>;
}

export default MultiInputGroup;
