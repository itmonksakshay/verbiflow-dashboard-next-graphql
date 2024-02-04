import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDateRange } from 'react-icons/md';
import { css } from '@emotion/react';

const DateFilter = ({ onApply }: {
  onApply: (start: string, end: string) => void
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [calanderKey, setCalanderKey] = useState(0);
  const wrapperRef = useRef(null); // Ref for the wrapper to detect clicks outside
  const [viewingMonth, setViewingMonth] = useState(new Date().getMonth());


  const formatDate = (date: Date) => {
    return date ? date.toLocaleDateString() : '';
  };

  // Function to handle date change
  const handleDateChange = ([start, end]: any) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onApply(formatDate(start), formatDate(end));
    }

  };

  const handleMonthChange = (date: Date) => {
    setViewingMonth(date.getMonth());
  };

  // There are no uses of this function
  // const renderDayContents = (day, date) => {
  //   const handleClick = (e) => {
  //     // Prevent navigation if the day is not in the viewing month
  //     if (date.getMonth() !== viewingMonth) {
  //       e.stopPropagation();
  //     } else {
  //       setStartDate(date); // Set the date as usual
  //     }
  //   };

  //   return <div onClick={handleClick}>{day}</div>;
  // };

  useEffect(() => {
    // Function to detect click outside
    const handleClickOutside = (event: any) => {
      // Assume date picker portal ID or class here to check if the click is inside the date picker
      const datePickerElement = document.querySelector('.react-datepicker');
      const clickedInsideDatePicker = datePickerElement && datePickerElement.contains(event.target);

      if (!clickedInsideDatePicker) {
        setCalanderKey(calanderKey + 1);
        setShowPicker(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <Box textAlign="center" mt="4" ref={wrapperRef}>
      <Button
        rightIcon={<MdDateRange />}
        onClick={() => setShowPicker(!showPicker)}
        mb="4"
        css={css`
          background-color: #2d3748;
          color: white;
          &:hover {
            background-color: #4a5568;
          }
        `}
      >
        {`${formatDate(startDate)} - ${formatDate(endDate) || 'End Date'}`}
      </Button>
      {showPicker && (
        <Box css={css`
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
            key={calanderKey}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            // onCalanderClose={() => console.log("hello")}
            onMonthChange={handleMonthChange}
            inline
            disabledKeyboardNavigation
          />
        </Box>
      )}
    </Box>
  );
};

export default DateFilter;