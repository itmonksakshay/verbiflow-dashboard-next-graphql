
"use client";
import React from 'react';
import { Tag, TagLabel, TagCloseButton, Wrap, WrapItem} from '@chakra-ui/react';
import { useFilters } from '../filters/context/FilterContext';
import MetadataFilterTag from './MetadataFilterTag';


const TagsDisplay: React.FC<{}> = () => {
  const { filters, removeFilter } = useFilters();
  
  const uniqueMetadataIds = new Set(filters.metadataFilter.map(filter => filter.metadataId));
  
  const uniqueMetadataFilters = filters.metadataFilter.filter((filter, index, self) => 
    index === self.findIndex((t) => (
      t.metadataId === filter.metadataId
    ))
  );

  /* 
  <Tag size="lg"  variant="solid" colorScheme="blue">
            <TagLabel>{`${filter.metadataName} (${filter.valueToCompare.length})`}</TagLabel>
            <TagCloseButton onClick={() => removeFilter( "metadataFilter",index)} />
  </Tag>
  */
  return (
    <Wrap>

      { uniqueMetadataFilters.map((filter, index) => (
        <WrapItem key={index}>
          <MetadataFilterTag name={filter.metadataName} metadataId={filter.metadataId} ></MetadataFilterTag>
        </WrapItem>
      ))}

    {filters.variantFilters.map((filter, index) => (
        <WrapItem key={index}>
          <Tag size="md" borderRadius="full" variant="solid" colorScheme="orange" m="1">
            <TagLabel>{`${filter.variantName}`}</TagLabel>
            <TagCloseButton onClick={() => removeFilter("variantFilters",index)} />
          </Tag>
        </WrapItem>
      ))}
      {filters.groupBy.map((filter, index) => (
        <WrapItem key={index}>
          <Tag size="md" borderRadius="full" variant="solid" colorScheme="green" m="1">
            <TagLabel>{`${filter.metadataName}`}</TagLabel>
            <TagCloseButton onClick={() => removeFilter("groupBy",index)} />
          </Tag>
        </WrapItem>
      ))}

      
    </Wrap>
  );
};

export default /* use client */  TagsDisplay;