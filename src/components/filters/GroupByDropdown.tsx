import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import GroupBy from './GroupBy';

const GroupByDropdown = ({menuText, eventSchemaId}: {menuText: string; eventSchemaId: number;}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton as={Button} onClick={onOpen} 
        size="sm"
        width="120px" // Adjust width as needed
        height="30px" // Match the height of the date input
        fontSize="sm" // Match the font size
        color="white"
        border="none"
        background="#2D3748"
        _focus={{ boxShadow: 'none' }}
        _hover={{ background: '#2D3748' }} // Keep background color on hover
        _active={{ background: '#2D3748' }} // Keep background color when pressed
        _placeholder={{ color: 'gray.300' }}
      >
        {menuText}
      </MenuButton>
      <MenuList px={4} onClick={handleClick}  background="#2D3748" borderColor="rgb(255,255,255,0.16)" >
        <GroupBy eventSchemaId={eventSchemaId}  onClose={onClose}/>
      </MenuList>
    </Menu>
  );
};

export default GroupByDropdown;