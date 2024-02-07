import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import FilterInputDropdown from './formElements/FilterInputDropdown';
import FilterInput from '../filters/FilterInput';
import { computeMetadataLogic } from '../filters/utils/metadataFilterUtils';
import { useFilters } from '../filters/context/FilterContext';
import { useEventSchema } from '../hooks/useEventSchema';
import { PropertyValue, operatorInternal } from '../filters/context/utils';

const initialOperatorOptions: operatorInternal[] = ['=', '>', '<', '<=', '>='];
const initialPropertyOptions = [PropertyValue.VALUE_OF, PropertyValue.LENGTH]

const MetadataFilterForm = ({eventSchemaId}: {eventSchemaId: number}) => {
  const { eventSchema, loading, error } = useEventSchema(eventSchemaId);

  const metadatas = useMemo(() => {
    return eventSchema?.getEventSchema?.eventMetadata ?? [];
  }, [eventSchema]); 

  const { addMetadataFilter } = useFilters();

  const [propertyValue, setPropertyValue] = useState<PropertyValue>(PropertyValue.VALUE_OF);
  const [metadataOptions, setMetadataOptions] = useState<string[]>([]);

  const [operatorOptions, setOperatorOptions] = useState(initialOperatorOptions);
  const [propertyOptions, setPropertyOptions] = useState(initialPropertyOptions);
  const [metadataValue, setMetadataValue] = useState('');
  const [hideProperty, setHideProperty] = useState(true);
  const [operator, setOperator] = useState<operatorInternal | null>(null);
  const [valueToCompare, setValueToCompare] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (eventSchema?.getEventSchema?.eventMetadata) {
      const initialMetadataOptions = eventSchema.getEventSchema.eventMetadata.map(metadata => metadata.metadataName);
      setMetadataOptions(initialMetadataOptions);
    }
  }, [eventSchema]); // Depend on eventSchema so this runs whenever eventSchema changes



  function metadataSetter(value: string){ 
      setMetadataValue(value);
      setOperator(null); 
      setPropertyValue(PropertyValue.VALUE_OF);
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

    if (!propertyOptions.includes(propertyValue)) {
      setPropertyValue(PropertyValue.VALUE_OF);
      setValueToCompare("");
    }

    if (!operator || !operatorOptions.includes(operator)) {
      setOperator(null);
      setValueToCompare("");
    }

    setPropertyOptions(propertyOptions);
    setOperatorOptions(operatorOptions);
    setHideProperty(hideProperty);
    
  }, [metadataValue, propertyValue,operator, hideProperty, metadatas]); // Include propertyValue in dependency array to re-evaluate when it changes

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
      if(!selectedMetadata){ 
        throw new Error("unknown error");
      }
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
          setValue={(value: string)=> setPropertyValue(value as PropertyValue)}
          isHidden={hideProperty}
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
          value={operator ?? ""}
          setValue={(value: string)=> setOperator(value as operatorInternal)}
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
        color={'whiteAlpha.900'}
        bg={'whiteAlpha.200'}
      > Add Filter </Button>
    </VStack>
  );
};

export default MetadataFilterForm;