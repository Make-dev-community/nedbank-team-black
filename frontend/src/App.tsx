import './App.css';
import { AmountInputForm } from './components/AmountInput';
import { FinalizePayment } from './components/FinalizePayment';

import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Box margin={15} marginTop={150}>
          <div className="App">
            <Routes>
              <Route path="/payments" element={<AmountInputForm />} />
              <Route path="/" element={<FinalizePayment />} />
              {/* <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
          </div>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
