import React, { useState } from 'react';
import { InputGroup, InputLeftElement, Input, Flex, Icon, Box } from '@chakra-ui/react';
import { MdDateRange } from 'react-icons/md';
import VerbiflowDatePicker from './VerbiflowDatePicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = () => {
  // Helper function to subtract one month from a date
  const subtractOneMonth = (date: Date) => {
    const newDate = new Date(date.getTime()); // Create a new Date instance to avoid mutating the original date
    newDate.setMonth(date.getMonth() - 1);
    return newDate;
  };

  const [startDate, setStartDate] = useState(subtractOneMonth(new Date()));
  // Set the end date to the current date
  const [endDate, setEndDate] = useState(new Date());
  const [openStartCalandar, setOpenStartCalendar] = useState(false);
  const [openEndCalandar, setOpenEndCalandar] = useState(false);

  return (
    <Flex alignItems="center" justifyContent="center" background="#2D3748" borderRadius="md">
      <InputGroup size="sm" width="120px" position="relative">
        <InputLeftElement pointerEvents="none">
          <Icon as={MdDateRange} color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Start Date"
          isReadOnly
          onClick={() => setOpenStartCalendar(!openStartCalandar)}
          value={startDate ? startDate.toLocaleDateString() : ''}
          border="none"
          _focus={{ boxShadow: 'none' }}
          _hover={{ background: 'none' }}
          _placeholder={{ color: 'gray.300' }}
          color="white"
          fontSize="sm"
          height="30px"
        />

        <VerbiflowDatePicker
          dateToRender={startDate}
          startDate={startDate}
          setDateToRender={setStartDate}
          isLeft={false}
          isOpen={openStartCalandar}
          setIsOpen={setOpenStartCalendar}
          isStartDate={true}
          endDate={endDate}
        />
      </InputGroup>
      <Box color="white" px={2}>—</Box>
      <InputGroup size="sm" width="120px" position="relative">
        <Input
          type="text"
          placeholder="End Date"
          isReadOnly
          onClick={() => setOpenEndCalandar(!openEndCalandar)}
          value={endDate ? endDate.toLocaleDateString() : ''}
          border="none"
          _focus={{ boxShadow: 'none' }}
          _hover={{ background: 'none' }}
          _placeholder={{ color: 'gray.300' }}
          color="white"
          fontSize="sm"
          height="30px"
        />
        <VerbiflowDatePicker
          dateToRender={endDate}
          startDate={startDate}
          setDateToRender={setEndDate}
          isLeft={false}
          isOpen={openEndCalandar}
          setIsOpen={setOpenEndCalandar}
          isStartDate={false}
          endDate={endDate}
        />
      </InputGroup>
    </Flex>
  );
};

export default DateRangePicker;