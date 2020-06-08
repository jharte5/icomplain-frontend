import React from 'react';
import ChipInputGroup from './ChipInputGroup';
import InputGroup from './InputGroup';
import DatePicker from 'react-datepicker';

function MultiInputGroup(props) {
  let multiInputField = null;

  switch (props.type) {
    case 'text':
      const { expenseName } = props;
      multiInputField = (
        <InputGroup
          name={expenseName.name}
          placeholder={expenseName.placeholder}
          onChange={expenseName.handleOnChange.inputOnChange}
          value={expenseName.value}
          error={expenseName.error}
          type={expenseName.type}
        />
      );
      break;
    case 'number':
      const { expenseAmount } = props;
      multiInputField = (
        <InputGroup
          name={expenseAmount.name}
          placeholder={expenseAmount.placeholder}
          onChange={expenseAmount.handleOnChange.inputOnChange}
          value={expenseAmount.value}
          error={expenseAmount.error}
          type={expenseAmount.type}
        />
      );
      break;
    case 'dateInput':
      const { dateInput } = props;

      multiInputField = (
        <DatePicker
          className="expenses--input-date"
          selected={dateInput.startDate}
          onChange={dateInput.handleOnChange.handleOnDateChange}
        />
      );
      break;
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
