import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position='top-center'
        duration={3000}
        richColors
        theme='light'
        toastOptions={{
          actionButtonStyle: {
            backgroundColor: 'var(--primary)',
          }
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
