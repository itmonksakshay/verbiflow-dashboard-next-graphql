import React, { useState, useEffect} from 'react';
import { Flex,Box } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { css } from '@emotion/react';


const VerbiflowDatePicker = ({ isLeft, isOpen, setIsOpen, setDateToRender, dateToRender, startDate, isStartDate, endDate}) => {
  const today = new Date();

  console.log("minDate", startDate, "maxDate", today)
  // Close the picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.react-datepicker-wrapper') && !event.target.closest('.react-datepicker')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen,setIsOpen]);

  return (
    <Flex direction="column" position="relative" >
      {isOpen && (

        <Box position="absolute" top="100%" zIndex="10" right={isLeft ? '0' : '-150px'}  marginTop={"5px"} css={css`
        .react-datepicker {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #2d3748;
          color: white;
          border: none;
          border-radius: 0.4rem;
        }
        .react-datepicker__triangle {
          display: none;
        }
        .react-datepicker__header {
          background-color: #2d3748;
          border-bottom: none;
        }
        .react-datepicker__navigation {
          color: white;
        }
        .react-datepicker__navigation-icon::before {
          border-color: white;
        }
        .react-datepicker__day-name, .react-datepicker__day {
          color: white;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--in-range,
        .react-datepicker__day--in-selecting-range {
          background-color: #3182ce;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: #4a5568;
        }
        `}>
          <DatePicker
            minDate={isStartDate ?  null: startDate}
            maxDate={isStartDate? endDate : today}
            selected={dateToRender}
            onChange={(date) => {
              setDateToRender(date);
              setIsOpen(false);
            }}

            max
            inline
          />
        </Box>
      )}
    </Flex>
  );
};
export default VerbiflowDatePicker;

