import { Box } from "@chakra-ui/react";
import { useColorModeValue } from './components/ui/color-mode'
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import React from "react";
import { Toaster, toaster } from "./components/ui/toaster"


function App() {
      const bg = useColorModeValue("gray.100", "gray.900")

  return (
    <>
        <Box minH={"100vh"} bg={bg}>
          {/* Navbar */}
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
          <Toaster /> 
        </Box>
    </>
  )
}

export default App
