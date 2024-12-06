import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "@/components/ui/sonner"
import { SocKetProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <SocKetProvider>
    <App />
    <Toaster closeButton/>
  </SocKetProvider>,
)
