"use client";
import React from "react";
import { Tag, TagLabel, useDisclosure } from "@chakra-ui/react";
import { useFilters } from "../filters/context/FilterContext";
import TagListModal from "./TagModal";

const MetadataFilterTag: React.FC<{name: string; metadataId: number; eventSchemaId: number}> = ({name, metadataId, eventSchemaId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook to manage modal state
  const { filters } = useFilters();

  const count = filters.metadataFilter.filter(
    (filter) => filter.metadataId === metadataId
  ).length;

  return (
    <>
      <Tag size="lg"  variant="solid" colorScheme="blue" onClick={onOpen} cursor="pointer">
        <TagLabel>{`${name} Filter (${count})`}</TagLabel>
      </Tag>
      <TagListModal isOpen={isOpen} onClose={onClose} metadataId={metadataId} metadataName={name} eventSchemaId={eventSchemaId}  />
    </>
  );
};

export default /* use client */ MetadataFilterTag;
