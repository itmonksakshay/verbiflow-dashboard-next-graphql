
"use client";
import React from 'react';
import { Flex, IconButton} from '@chakra-ui/react';
import { useFilters } from '../filters/context/FilterContext';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const CollapseButton: React.FC<> = ({isTagsVisible, setIsTagsVisible}) => {
  const {filters} = useFilters(); 
  return (
    <>
      <Flex justifyContent="flex-end">
          <IconButton
                  hidden={!(filters.metadataFilter.length > 0  || filters.variantFilters.length > 0  || filters.groupBy.length > 0) }
                  aria-label={isTagsVisible ? 'Collapse Tags' : 'Expand Tags'}
                  icon={isTagsVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  onClick={() => setIsTagsVisible(!isTagsVisible)}
                  variant="ghost"
                  size="sm"
                  alignSelf="center" // Aligns the button vertically
                  marginLeft="4" // Ensures there is space between the button and the collapsed content
          />
      </Flex>
    </>
  );
};

export default /* use client */  CollapseButton;