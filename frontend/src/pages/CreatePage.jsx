import { Container, Heading, VStack, Box, Button, Status } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useColorMode, useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { toaster } from '../components/ui/toaster';

const CreatePage = () => {
  const [newProduct,setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

   const {createProduct} = useProductStore()
  const handleAddProduct = async () =>{
    const {success,message} = await createProduct(newProduct)
      if (!success) {
          toaster.create({
            type: 'Error',
            title: 'Failed to create product',
            description: message || 'Something went wrong.',
            closable: true,
        });
        return;
      }
      else{
        toaster.create({
          type: 'success',
          title: 'Product Added Successfully',
          description: 'Your product has been added successfully.',
          duration: 3000,
          closable: true,
        });
      }
      setNewProduct({name:"", price: "", image: ""});
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack 
      spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
          </Heading>

          <Box w={'full'} bg={useColorModeValue("white","gray.800")}
          p={6} rounded={"lg"} shadow={"md"}>

            <VStack spacing={4}>
              <input 
              placeholder='Product Name' 
              name='name' 
              value={newProduct.name} 
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
              />

              <input 
              placeholder='Price' 
              name='price' 
              value={newProduct.price} 
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
              />

              <input 
              placeholder='Image URL' 
              name='image' 
              value={newProduct.image} 
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
              />

              <Button bg='#4682A9' onClick={handleAddProduct} w='full'>Add Product</Button>
            </VStack>

          </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage