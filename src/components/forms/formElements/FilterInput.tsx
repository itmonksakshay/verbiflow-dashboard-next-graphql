import React, { SetStateAction, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const FilterInput = ({ label, value, setValue }: {
  label: string,
  value: string,
  setValue: React.Dispatch<SetStateAction<string>>
}) => {

  const handleChange = (event: any) => {
    // Extract the value from the event object
    setValue(event.target.value);
    // Close the menu here if needed or manage the state to close it
  };


  return (
    <FormControl>
      <FormLabel fontSize="sm" color="gray.400">{label}</FormLabel>
      <Input
        placeholder={label}
        value={value}
        _placeholder={{ color: 'gray.300' }}
        _hover={{ bg: 'gray.700' }}
        _focus={{ outline: 'none', bg: 'gray.700' }}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default FilterInput;