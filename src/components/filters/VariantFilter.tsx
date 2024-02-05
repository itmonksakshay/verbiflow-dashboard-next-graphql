import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  VStack,
  Checkbox,
  useDisclosure,
} from '@chakra-ui/react';
import { useFilters } from './context/FilterContext';
import { useVariantList } from '../hooks/useVariantList';

const VariantFilter = ({menuText}) => {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState({});
  const {addVariantFilter, filters, removeFilter} = useFilters();
  const { variantNames, loading, error } = useVariantList(1);
  

  // Dummy data for the list items
  const listItems = variantNames?.getVariants ? variantNames?.getVariants.map(variantNameObj => {
    return {name: variantNameObj.name, variantId: variantNameObj.variantId}
  }) : [];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredItems = listItems.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );


 


  // Function to handle checkbox change
  const handleCheckboxChange = (item) => {
    setSelectedItems({
      ...selectedItems,
      [item.variantId]: !selectedItems[item.variantId],
    });

    if (!selectedItems[item.variantId]) {
      // Add the filter for the checked item
      addVariantFilter({ 
        variantName: item.name, 
        variantId: item.variantId
      }); 
    } else {
      const index = filters.variantFilters.findIndex(variantFilter => variantFilter.variantId === item.variantId);
      if(index!== -1){ 
        removeFilter("variantFilters",index);
      }
    }
  };

  const handleClick = (e) => e.stopPropagation();
  if(loading){ 
    return <></>
  }
  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton as={Button} onClick={onOpen} 
        size="sm"
        width="120px" // Adjust width as needed
        height="30px" // Match the height of the date input
        fontSize="sm" // Match the font size
        color="white"
        border="none"
        background="#2D3748"
        _focus={{ boxShadow: 'none' }}
        _hover={{ background: '#2D3748' }} // Keep background color on hover
        _active={{ background: '#2D3748' }} // Keep background color when pressed
        _placeholder={{ color: 'gray.300' }}
      >
        {menuText}
      </MenuButton>
      <MenuList px={4} onClick={handleClick} >
        <Box mb={4}>
          <Input
            placeholder="Search"
            value={searchValue}
            fontSize="sm" // Match the font size
            onChange={handleSearchChange}
            autoFocus
          />
        </Box>
        <VStack align="stretch">
          {filteredItems.map((item) => (
              <Box key={item.variantId} p={1} fontSize={"sm"} >
                <Checkbox isChecked={filters.variantFilters.some(filter => filter.variantId === item.variantId)}
                  fontSize="sm" // Ensure this matches the MenuButton font size
                  onChange={() => handleCheckboxChange(item)}>
                  {item.name}
                </Checkbox>
              </Box>
            ))}
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default VariantFilter;