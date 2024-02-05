import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import FilterInputDropdown from './FilterInputDropdown';
import FilterInput from './FilterInput';
import { computeMetadataLogic } from './utils/metadataFilterUtils';
import { useFilters } from './context/FilterContext';
import { useEventSchema } from '../hooks/useEventSchema';

const initialOperatorOptions = ['=', '>', '<', '<=', '>='];
const initialPropertyOptions = ['Value of', 'Length of']

const MetadataFilterForm = ({eventSchemaId}) => {
  const { eventSchema, loading, error } = useEventSchema(eventSchemaId);

  const metadatas = useMemo(() => {
    return eventSchema?.getEventSchema?.eventMetadata ?? [];
  }, [eventSchema]); 

  const initialMetadataOptions =  eventSchema?.getEventSchema.eventMetadata.map(metadata=> metadata.metadataName)
  const { addMetadataFilter, dataToRender } = useFilters();

  const [propertyValue, setPropertyValue] = useState('Value of');
  const [metadataOptions, setMetadataOptions] = useState<string[]>([]);

  const [operatorOptions, setOperatorOptions] = useState(initialOperatorOptions);
  const [propertyOptions, setPropertyOptions] = useState(initialPropertyOptions);
  const [metadataValue, setMetadataValue] = useState('');
  const [hideProperty, setHideProperty] = useState(true);
  const [operator, setOperator] = useState('');
  const [valueToCompare, setValueToCompare] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (eventSchema?.getEventSchema?.eventMetadata) {
      const initialMetadataOptions = eventSchema.getEventSchema.eventMetadata.map(metadata => metadata.metadataName);
      setMetadataOptions(initialMetadataOptions);
    }
  }, [eventSchema]); // Depend on eventSchema so this runs whenever eventSchema changes



  function metadataSetter(value){ 
      setMetadataValue(value);
      setOperator(''); 
      setPropertyValue('Value of');
  }

  useEffect(() => {
    // Determine available properties and operators based on metadata type and property value
    const { propertyOptions, operatorOptions, hideProperty } = computeMetadataLogic(
      metadatas, 
      metadataValue, 
      propertyValue, 
      initialOperatorOptions, 
      initialPropertyOptions
    );

    if(!propertyOptions.includes(propertyValue)){ 
      setPropertyValue("Value of"); 
      setValueToCompare("");
    } 

    if(!operatorOptions.includes(operator)){ 
      setOperator(""); 
      setValueToCompare("");
    }

    setPropertyOptions(propertyOptions);
    setOperatorOptions(operatorOptions);
    setHideProperty(hideProperty);
    
  }, [metadataValue, propertyValue,operator, hideProperty, metadatas]); // Include propertyValue in dependency array to re-evaluate when it changes

  useEffect(() =>{
    console.log(dataToRender);
  }, 
  [dataToRender])

  const handleSubmit = async() => {
    // Perform validation or any other operation before sending data
    if (!propertyValue || !metadataValue || !operator || !valueToCompare) {
      toast({
        title: 'Error',
        description: 'All fields must have an input',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Process the data
      console.log(propertyValue, metadataValue);
      const selectedMetadata = metadatas.find(metadata => metadata.metadataName === metadataValue);
      const metadataAdded = await addMetadataFilter({
                                    metadataName: selectedMetadata?.metadataName,
                                    metadataId: selectedMetadata?.metadataId,
                                    operator: operator,
                                    valueToCompare: valueToCompare,
                                    propertyValue: propertyValue,
                                  },eventSchemaId)
      
      if(!metadataAdded){ 
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
  if(loading){ 
    return <></>
  }
  return (
    <VStack spacing={4} align="stretch">
      <Box display="flex" justifyContent="space-between" gap="2">
        <FilterInputDropdown
          value={propertyValue}
          setValue={setPropertyValue}
          isHidden={ hideProperty }
          label="Property"
          options={propertyOptions}
        />
        <FilterInputDropdown
          value={metadataValue}
          setValue={metadataSetter}
          label="Metadata Name"
          options={metadataOptions}
        />
        <FilterInputDropdown
          value={operator}
          setValue={setOperator}
          label="Operator"
          options={operatorOptions}
        />
        <FilterInput
           value={valueToCompare}
           setValue={setValueToCompare}
           label="Value"
          />
      </Box>
      <Button
        _placeholder={{ color: 'gray.300' }}
        _hover={{ bg: 'gray.700' }}
        _focus={{ outline: 'none', bg: 'gray.700' }}
        onClick={handleSubmit}
        width="40%"
        alignSelf={"center"}
      > Add Filter </Button>
    </VStack>
  );
};

export default MetadataFilterForm;