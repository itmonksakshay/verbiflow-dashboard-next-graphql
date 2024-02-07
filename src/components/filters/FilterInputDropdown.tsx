import React, { SetStateAction, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuList,
  MenuItem,
  InputRightElement,
  MenuButton,
  InputGroup,
} from '@chakra-ui/react';


const FilterInputDropdown = ({ label, options, value, setValue, isHidden = false }: {
  label: string,
  value: string,
  isHidden?: boolean,
  // setValue: React.Dispatch<SetStateAction<string>>,
  setValue: (val: string) => void,
  options: Array<string>

}) => {

  const handleChange = (option: string) => {
    console.log("setting value", option)
    setValue(option);
    // Close the menu here if needed or manage the state to close it
  };

  return (
    <FormControl hidden={isHidden}>
      <FormLabel fontSize="sm" color="gray.400" >{label}</FormLabel>
      <Menu>
        {/* The MenuButton is responsible for opening/closing the MenuList */}
        <MenuButton as={InputGroup} cursor="pointer" >
          <Input
            placeholder={label}
            value={value}
            readOnly
            _placeholder={{ color: 'gray.300' }}
            width={"150px"}
          />
          <InputRightElement
            pointerEvents="none"
          />
        </MenuButton>
        <MenuList>
          {options.map((option) => (
            <MenuItem key={option} onClick={() => handleChange(option)} _focus={{ background: undefined }} backgroundColor={value === option ? 'gray.600' : undefined}>
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  );
};

export default FilterInputDropdown;