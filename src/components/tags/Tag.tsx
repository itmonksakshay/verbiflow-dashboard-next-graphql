
"use client";
import React from 'react';
import { Tag, TagLabel, TagCloseButton, Wrap, WrapItem, GridItem, Grid, Text} from '@chakra-ui/react';
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
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem>
        <Text mb={2} fontSize="sm" fontWeight="bold" color="gray.500" hidden={uniqueMetadataFilters.length === 0 }>Metadata Filters</Text>
        <Wrap>
          { uniqueMetadataFilters.map((filter, index) => (
            <WrapItem key={index}>
              <MetadataFilterTag name={filter.metadataName} metadataId={filter.metadataId} ></MetadataFilterTag>
            </WrapItem>
          ))}
        </Wrap>
      </GridItem>
      <GridItem>
        <Text mb={2} fontSize="sm" fontWeight="bold" color="gray.500" hidden={filters.variantFilters.length === 0 }>Variant Filters</Text>
        <Wrap>
        {filters.variantFilters.map((filter, index) => (
            <WrapItem key={index}>
              <Tag size="md" borderRadius="full" variant="solid" colorScheme="orange" m="1">
                <TagLabel>{`${filter.variantName}`}</TagLabel>
                <TagCloseButton onClick={() => removeFilter("variantFilters",index)} />
              </Tag>
            </WrapItem>
          ))}
          </Wrap>
        </GridItem> 
        <GridItem> 
          <Text mb={2} fontSize="sm" fontWeight="bold" color="gray.500" hidden={filters.groupBy.length === 0 }>GroupBy Filters</Text>
          <Wrap>
            {filters.groupBy.map((filter, index) => (
              <WrapItem key={index}>
                <Tag size="md" borderRadius="full" variant="solid" colorScheme="green" m="1">
                  <TagLabel>{`${filter.metadataName}`}</TagLabel>
                  <TagCloseButton onClick={() => removeFilter("groupBy",index)} />
                </Tag>
              </WrapItem>
            
            ))}
          </Wrap>
        </GridItem>
    </Grid>
  );
};

export default /* use client */  TagsDisplay;