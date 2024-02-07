import React, { useState } from 'react';
import {
  Box,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Button,
  VStack,
  Checkbox,
  useDisclosure,
} from '@chakra-ui/react';
import { useFilters } from './context/FilterContext';
import { useVariantList } from '../hooks/useVariantList';
import { VariantName } from '@/lib/gqls';

const VariantFilter = ({menuText,eventSchemaId}: {menuText: string; eventSchemaId: number}) => {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState<Map<number, boolean>>(new Map<number, boolean>());
  const {addVariantFilter, filters, removeFilter} = useFilters();
  const { variantNames, loading, error } = useVariantList(1);
  

  // Dummy data for the list items
  const listItems = variantNames?.getVariants ? variantNames?.getVariants.map(variantNameObj => {
    return {name: variantNameObj.name, variantId: variantNameObj.variantId}
  }) : [];

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredItems = listItems.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  ); 


  // Function to handle checkbox change
  const handleCheckboxChange = async(item: VariantName) => {
    const previousValue = selectedItems.get(item.variantId) ?? false; 
    console.log("previousValue", previousValue);
    selectedItems.set(item.variantId, !previousValue);
    setSelectedItems(selectedItems);

    if (!previousValue) {
      // Add the filter for the checked item
      await addVariantFilter({ 
        variantName: item.name, 
        variantId: item.variantId
      },eventSchemaId); 
    } else {
      const index = filters.variantFilters.findIndex(variantFilter => variantFilter.variantId === item.variantId);
      if(index!== -1){ 
        await removeFilter("variantFilters",index,eventSchemaId);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();
  
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