import { FaEdit , FaTrash } from "react-icons/fa";
import { Box, Button, Heading, HStack,IconButton, Image, Text, Input, VStack, Dialog, Portal,DialogHeader,DialogBody,DialogContent,DialogTrigger,DialogCloseTrigger,CloseButton} from '@chakra-ui/react'
import React from 'react';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from "../store/product";
import { toaster } from '../components/ui/toaster';
import { useState } from 'react';




const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800")
    const [open, setOpen] = useState(false);
    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
  try {
    const result = await deleteProduct(pid);

    if (!result || typeof result !== 'object') {
      toaster.create({
        type: 'Error',
        title: 'Delete Failed',
        description: 'No response from deleteProduct.',
        closable: true,
      });
      return;
    }

    const { success, message } = result;

    if (!success) {
      toaster.create({
        type: 'Error',
        title: 'Failed to Delete product',
        description: message || 'Something went wrong.',
        closable: true,
      });
    } else {
      toaster.create({
        type: 'success',
        title: 'Product Deleted Successfully',
        description: 'Your product has been Deleted successfully.',
        duration: 3000,
        closable: true,
      });
    }
  } catch (err) {
    console.error("Delete error:", err);
    toaster.create({
      type: 'Error',
      title: 'Update Failed',
      description: err.message || 'Something went wrong.',
      closable: true,
    });
  }
};
   
    const handleUpdateProduct = async (pid, updatedProduct) => {
		try {
    
    const result = await updateProduct(pid, updatedProduct);
		setOpen(false);
		    if (!result || typeof result !== 'object') {
      toaster.create({
        type: 'Error',
        title: 'Delete Failed',
        description: 'No response from deleteProduct.',
        closable: true,
      });
      return;
    }

    const { success, message } = result;

    if (!success) {
      toaster.create({
        type: 'Error',
        title: 'Failed to Update product',
        description: message || 'Something went wrong.',
        closable: true,
      });
    } else {
      toaster.create({
        type: 'success',
        title: 'Product Updated Successfully',
        description: 'Your product has been Updated successfully.',
        duration: 3000,
        closable: true,
      });
    }
  } catch (err) {
    console.error("Updated error:", err);
    toaster.create({
      type: 'Error',
      title: 'Update Failed',
      description: err.message || 'Something went wrong.',
      closable: true,
    });
  }
	};
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform: "translateY(-5px)", shadow: "xl"}}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ₹{product.price}
            </Text>

            <HStack gap={2} >
                 <IconButton
                    onClick={() => setOpen(true)}
                    colorPalette="blue"
                    aria-label="Edit"
                    size="lg"
                    variant={"solid"}
                ><FaEdit /></IconButton>
                <IconButton
                    onClick={() => handleDeleteProduct(product._id)}
                    colorPalette="red"
                    aria-label="Delete"
                    variant={"solid"}
                    size='lg'
                ><FaTrash /></IconButton>


            </HStack>
        </Box>
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogTrigger /> {/* Required even if unused */}
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <DialogContent>
                <DialogHeader>
                Update Product
                <DialogCloseTrigger asChild>
                    <CloseButton position="absolute" right="4" top="4" />
                </DialogCloseTrigger>
                </DialogHeader>
                <DialogBody>
                <VStack spacing={4}>
                    <Input placeholder="Product Name" name="name" 
                    value={updatedProduct.name} 
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    />
                    <Input placeholder="Price" name="price" type="string"
                    value={updatedProduct.price}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    />
                    <Input placeholder="Image URL" name="image" 
                    value={updatedProduct.image}
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                    />
                </VStack>
                </DialogBody>
                <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" >Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
            </Dialog.Footer>
            </DialogContent>
            </Dialog.Positioner>
        </Portal>
        </Dialog.Root>

    </Box>
  )
}

export default ProductCard