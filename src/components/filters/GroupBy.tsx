import React, { useEffect, useState, useMemo, Dispatch, SetStateAction } from 'react';
import {
  Box,
  Button,
  VStack,
  useToast
} from '@chakra-ui/react';
import FilterInputDropdown from '../forms/formElements/FilterInputDropdown';
import { useFilters } from './context/FilterContext';
import { useEventSchema } from '../hooks/useEventSchema';
import { MetadataType } from '@/lib/gqls';
import { GroupByPropertiesInternal } from './context/utils';

const initialPropertyOptions: GroupByPropertiesInternal[] = [GroupByPropertiesInternal.VALUE_OF, GroupByPropertiesInternal.LENGTH]


const GroupBy = ({eventSchemaId, onClose}: {eventSchemaId: number; onClose: () => void}) => {
  const { eventSchema, loading, error } = useEventSchema(eventSchemaId);
  const [propertyValue, setPropertyValue] = useState<GroupByPropertiesInternal>(GroupByPropertiesInternal.VALUE_OF);
  const [metadataValue, setMetadataValue] = useState('');

  const [propertyOptions, setPropertyOptions] = useState(initialPropertyOptions);
  const { addGroupByFilter, filters } = useFilters();

  const metadatas = useMemo(() => {
    const filterMetadataNames = new Set(filters.groupBy.map(filter => filter.metadataName));
    return eventSchema?.getEventSchema?.eventMetadata?.filter(metadata => !filterMetadataNames.has(metadata.metadataName)) ?? [];
  },[eventSchema,filters])

  const [hideProperty, setHideProperty] = useState(true);
  
 
  const handleUpdate = (updateVal: string) => { 
    setPropertyValue(updateVal as GroupByPropertiesInternal);
  }
  const toast = useToast();
  const handleSubmit = async () => {
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
      if(!selectedMetadata){ 
        throw new Error("unknown error");
      }
      const groupByAdded = await addGroupByFilter({ 
        metadataName: selectedMetadata?.metadataName, 
        metadataId: selectedMetadata?.metadataId, 
        propertyValue: propertyValue
      }, eventSchemaId)
      
      // Process the data
      if(!groupByAdded){ 
        toast({
          title: 'Error',
          description: 'Filter already exists',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      
      setPropertyValue(GroupByPropertiesInternal.VALUE_OF); 
      setMetadataValue('');
      onClose();
    }
  };
  useEffect(() => {
    const selectedMetadata = metadatas.find(metadata => metadata.metadataName === metadataValue);
    if(selectedMetadata?.metadataType === MetadataType.STRING){ 
      setHideProperty(false); 
      setPropertyOptions([GroupByPropertiesInternal.VALUE_OF, GroupByPropertiesInternal.LENGTH]); 

    } else{ 
      setHideProperty(true); 
      setPropertyValue(GroupByPropertiesInternal.VALUE_OF); 
      setPropertyOptions([GroupByPropertiesInternal.VALUE_OF]);
    }
  }, [metadataValue, propertyValue, hideProperty, metadatas]); // Include propertyValue in dependency array to re-evaluate when it changes


  if(loading){ 
    return <></>
  }
  return (
    <VStack spacing={4} align="stretch">
      <Box display="flex" justifyContent="space-between" gap="2">
        <FilterInputDropdown
          value={propertyValue}
          setValue={handleUpdate }
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
        color={'whiteAlpha.900'}
        bg={'whiteAlpha.200'}
        onClick={handleSubmit}
      > Group </Button>
    </VStack>
  );
};

export default GroupBy;