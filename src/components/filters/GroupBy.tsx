import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react';
import FilterInputDropdown from './FilterInputDropdown';
import { useFilters } from './context/FilterContext';
import { useEventSchema } from '../hooks/useEventSchema';
import { MetadataType } from '@/lib/gqls';

const initialPropertyOptions = ['Value of', 'Length of']


const GroupBy = ({eventSchemaId}) => {
  const { eventSchema, loading, error } = useEventSchema(eventSchemaId);
  const [propertyValue, setPropertyValue] = useState('Value of');
  const [metadataValue, setMetadataValue] = useState('');

  const [propertyOptions, setPropertyOptions] = useState(initialPropertyOptions);

  const metadatas = useMemo(() => {
    console.log("ff",eventSchema)
    return eventSchema?.getEventSchema?.eventMetadata ?? [];
  }, [eventSchema]); // Dependency array to only recalculate if eventSchema changes
  console.log("group by ", metadatas)

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
      const selectedMetadata = metadatas.find(metadata => metadata.metadataName === metadataValue);
      
      // Process the data
      console.log(propertyValue, metadataValue);

      if(!addGroupByFilter({ 
        metadataName: selectedMetadata?.metadataName, 
        metadataId: selectedMetadata?.metadataId, 
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

    const selectedMetadata = metadatas.find(metadata => metadata.metadataName === metadataValue);
    if(selectedMetadata?.metadataType === MetadataType.STRING){ 
      setHideProperty(false); 
      setPropertyOptions(["Value of", "Length of"]); 
    } else{ 
      setHideProperty(true); 
      setPropertyValue("Value of"); 
      setPropertyOptions(["Value of"]);
    }
  }, [metadataValue, propertyValue, hideProperty, metadatas]); // Include propertyValue in dependency array to re-evaluate when it changes



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
          options={metadatas.map(metadata => metadata.metadataName)}
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