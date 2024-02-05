import React, { ChangeEvent, useState } from "react";
import { useFilters } from "../filters/context/FilterContext";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
  IconButton,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Box,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { isEqual } from "lodash";

const FilterTagRow = ({
  filter,
  onRemove,
}: {
  filter: {
    propertyValue?: string;
    operator?: string;
    valueToCompare?: string;
  };
  onRemove: () => void;
}) => {
  const theme = useTheme();

  return (
    <HStack
      spacing={4}
      p={2}
      align="center"
      justify="space-between" // Space out the items
      borderWidth="1px"
      borderRadius="lg"
      borderColor={theme.colors.gray[200]}
      bg={theme.colors.gray[100]}
    >
      <HStack spacing={4}>
        <Text fontSize="sm" color="black" textAlign="center">
          {filter?.propertyValue?.replace("of", "")}
        </Text>
        <Text fontSize="sm" color="red" textAlign="center">
          {filter.operator}
        </Text>
        <Box bg={theme.colors.green[100]} px={2} borderRadius="md">
          <Text fontSize="sm" color="black" textAlign="center">
            {filter.valueToCompare}
          </Text>
        </Box>
      </HStack>
      <IconButton
        aria-label="Delete filter"
        icon={<DeleteIcon />}
        onClick={onRemove}
        size="sm"
        variant="ghost"
        color="black" // Set the color to black
      />
    </HStack>
  );
};

const TagListModal = ({ isOpen, onClose, metadataId, metadataName, eventSchemaId }) => {
  const [search, setSearch] = useState('');
  const { filters, removeFilter } = useFilters();
  const tags = filters.metadataFilter.filter((metadataFilter) => {
    return metadataFilter.metadataId === metadataId;
  });

  // Filter tags based on search input
  const filteredTags = tags.filter((tag) => {
    let tagName = `${tag.propertyValue.replace(" of", "")} ${tag.operator} ${
      tag.valueToCompare
    }`.toLowerCase();
    const searchSplit = search.toLowerCase().split(" ");
    const hasNonExistingWord = searchSplit.some((searchTerm) => {
      const hasTerm = !tagName.includes(searchTerm);
      tagName = tagName.replace(searchTerm, "");
      return hasTerm;
    });
    return !hasNonExistingWord;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${metadataName} Filters`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Filter search"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            mb={4}
          />
          <VStack align="stretch" spacing={2}>
            {filteredTags.map((filter, index) => (
              <FilterTagRow
                key={index}
                filter={filter}
                onRemove={() => { 
                  filters.metadataFilter.forEach((filterToCompare, filterToCompareIndex) => { 
                    if(isEqual(filterToCompare, filter)){ 
                      removeFilter("metadataFilter",filterToCompareIndex,eventSchemaId)
                    }
                  );
                }}
              />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TagListModal;
