import './App.css';
import { AmountInputForm } from './components/AmountInput';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/payments" element={<AmountInputForm />} />
            <Route
              path="/getOAuthCode"
              element={<div>Payment successful</div>}
            />
            {/* <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </div>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
