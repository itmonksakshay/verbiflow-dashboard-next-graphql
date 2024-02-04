import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react';
import FilterInputDropdown from './FilterInputDropdown';
import { useFilters } from './context/FilterContext';


const initialPropertyOptions = ['Value of', 'Length of']
const metadatasAvailable  = [ 
  { 
    name: "Metadata 1", 
    type: "STRING", 
    id: 1 
  }, 
  { 
    name: "Metadata 2", 
    type: "NUMBER", 
    id: 2 
  }, 
  { 
    name: "Metadata 3", 
    type: "COLOR", 
    id: 3
  }
]

const GroupBy = () => {
  const [propertyValue, setPropertyValue] = useState('Value of');
  const [metadataValue, setMetadataValue] = useState('');
  const [propertyOptions, setPropertyOptions] = useState(initialPropertyOptions);
  const initialMetadataOptions = metadatasAvailable.map(metadata => metadata.name);

  const [hideProperty, setHideProperty] = useState(true);
  const { addGroupByFilter, filters } = useFilters();


  const toast = useToast();
  const handleSubmit = () => {
    // Perform validation or any other operation before sending data
    if (!propertyValue || !metadataValue) {
      toast({
        title: 'Error',
        description: 'Please select both Property and Metadata Name.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      const selectedMetadata = metadatasAvailable.find(metadata => metadata.name === metadataValue);
      
      // Process the data
      console.log(propertyValue, metadataValue);

      if(!addGroupByFilter({ 
        metadataName: selectedMetadata?.name, 
        metadataId: selectedMetadata?.id, 
        propertyValue: propertyValue
      })){ 
        toast({
          title: 'Error',
          description: 'Filter already exists',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  useEffect(() => {
    const selectedMetadata = metadatasAvailable.find(metadata => metadata.name === metadataValue);
    if(selectedMetadata?.type === "STRING"){ 
      setHideProperty(false); 
    } else{ 
      setHideProperty(true); 
      setPropertyValue("Value of")
    }
  }, [metadataValue, propertyValue, hideProperty]); // Include propertyValue in dependency array to re-evaluate when it changes



  return (
    <VStack spacing={4} align="stretch">
      <Box display="flex" justifyContent="space-between" gap="2">
        <FilterInputDropdown
          value={propertyValue}
          setValue={setPropertyValue}
          label="Property"
          options={propertyOptions}
          isHidden={ hideProperty}
        />
        <FilterInputDropdown
          value={metadataValue}
          setValue={setMetadataValue}
          label="Metadata Name"
          options={initialMetadataOptions}
        />
      </Box>
      <Button
        _placeholder={{ color: 'gray.300' }}
        _hover={{ bg: 'gray.700' }}
        _focus={{ outline: 'none', bg: 'gray.700' }}
        onClick={handleSubmit}
      > Group </Button>
    </VStack>
  );
};

export default GroupBy;