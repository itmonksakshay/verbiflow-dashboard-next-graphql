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

const VariantFilter = ({menuText}) => {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState({});
  const {addVariantFilter, filters, removeFilter} = useFilters();

  // Dummy data for the list items
  const listItems = [
    'Variant 1',
    'Variant 2',
    'Variant 3'
  ];

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredItems = listItems.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  );


  useEffect(() => {
    // Create a new selectedItems object based on the current filters
    const newSelectedItems = { ...selectedItems };
    Object.keys(selectedItems).forEach((item) => {
      // If the item is not found in the filters.variantFilters, set it to false
      if (!filters.variantFilters.some(filter => filter.variantName === item)) {
        newSelectedItems[item] = false;
      }
    });
    setSelectedItems(newSelectedItems);
  }, [filters.variantFilters]);


  // Function to handle checkbox change
  const handleCheckboxChange = (item) => {
    setSelectedItems({
      ...selectedItems,
      [item]: !selectedItems[item],
    });

    if (!selectedItems[item]) {
      // Add the filter for the checked item
      addVariantFilter({ 
        variantName: item
      }); // You might need to adjust this call based on the expected parameter
    } else {
      const index = filters.variantFilters.findIndex(variantFilter => variantFilter.variantName === item);
      if(index!== -1){ 
        removeFilter("variantFilters",index);
      }
    }
  };

  const handleClick = (e) => e.stopPropagation();

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
              <Box key={item} p={1} fontSize={"sm"} >
                <Checkbox isChecked={selectedItems[item] } 
                  fontSize="sm" // Ensure this matches the MenuButton font size
                  onChange={() => handleCheckboxChange(item)}>
                  {item}
                </Checkbox>
              </Box>
            ))}
        </VStack>
      </MenuList>
    </Menu>
  );
};

export default VariantFilter;