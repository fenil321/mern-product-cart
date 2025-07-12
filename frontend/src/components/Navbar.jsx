import React from 'react'
import { Button, Container, HStack, Flex, Text } from '@chakra-ui/react'
import {  ColorModeButton } from './ui/color-mode'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from 'react-icons/ci'

const Navbar = () => {
 
  return (
    <Container maxW="1140px" px={4} >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          color="#4682A9"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems="center">
          <Link to="/create">
            <Button variant="ghost">
              <CiSquarePlus fontSize={20}/>
              
            </Button>
          </Link>

          {/* ✅ Your custom dark/light toggle button */}
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar