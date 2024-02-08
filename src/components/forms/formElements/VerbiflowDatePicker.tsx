import React, { useState, useEffect, SetStateAction } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { css } from '@emotion/react';
import { useFilters } from '@/components/filters/context/FilterContext';


const VerbiflowDatePicker = ({ isLeft, isOpen, setIsOpen, setDateToRender, dateToRender, startDate, isStartDate, endDate }: {
  isLeft: boolean,
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
  setDateToRender: React.Dispatch<SetStateAction<Date>>,
  dateToRender: Date,
  startDate: Date,
  isStartDate: boolean,
  endDate: Date
}) => {
  const today = new Date();
  const {addTimestampFilter} = useFilters();
    
  // Close the picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent|any) => {
      if (!event.target?.closest('.react-datepicker-wrapper') && !event.target?.closest('.react-datepicker')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const maxDate = isStartDate ? endDate : today
  const minDate = isStartDate ? null : startDate
  const addGreyedOutClass = (date: Date) => {
    return date > maxDate || date < (minDate ?? 0) ? 'greyed-out' : '';
  };


  return (
    <Flex direction="column" position="relative" >
      {isOpen && (

        <Box position="absolute" top="100%" zIndex="10" right={isLeft ? '0' : '-150px'} marginTop={"5px"} css={css`
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
          background-image: linear-gradient(to right, rgb(215, 174, 251,0.25), rgb(255, 175, 204,0.5));
          border-bottom: none;
        }
        .react-datepicker__current-month { 
          color:rgb(116, 72, 212) !important
        }
        .react-datepicker__navigation {
          color: rgb(116, 72, 212) !important;
        }
        .react-datepicker__navigation--previous,
        .react-datepicker__navigation--next {
        
          border-color: blue !important;
        }
        .react-datepicker__navigation-icon::before,
        .react-datepicker__navigation--next::before {
          border-color: rgb(116, 72, 212); !important /* Replace with the specific shade of purple you want */
        }
        .react-datepicker__day {
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
        .react-datepicker .react-datepicker__day--outside-month.greyed-out {
          color: rgba(255, 255, 255, 0.16) !important; /* This styles days in the next and previous months */
          }
          
          .react-datepicker .react-datepicker__day.greyed-out, 
          .react-datepicker .react-datepicker__day-name.greyed-out {
              color: rgba(255, 255, 255, 0.16) !important; /* This styles current month days and day names */
          }
        `}>
          <DatePicker
            minDate={isStartDate ? null : startDate}
            maxDate={maxDate}
            selected={dateToRender}
            dayClassName={addGreyedOutClass}
            onChange={async (date: Date | null) => {
              console.log("date change")
              if (date) {
                if(isStartDate){ 
                  await addTimestampFilter({
                    startDate: Math.floor(date.getTime()/1000), 
                    endDate: Math.floor(endDate.getTime()/1000)
                  })
                } else { 

                  await addTimestampFilter({ 
                    startDate: Math.floor(startDate.getTime()/1000), 
                    endDate: Math.floor(date.getTime()/1000)
                  })
                }
                setDateToRender(date);
              }
              setIsOpen(false);
            }}
            // I added here max time, please check
            maxTime={today}
            inline
          />
        </Box>
      )}
    </Flex>
  );
};
export default VerbiflowDatePicker;

