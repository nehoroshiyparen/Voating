import Header from './components/Header/Header'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { WebSocketProvider } from './WebSocket/WebSocketContext';


export default function App() {
  return (
    <>
    <BrowserRouter>
      <MainApp/>
    </BrowserRouter>
    </>
  )
}

function MainApp() {

  return (
    <>
    <Header/>
    <WebSocketProvider>
      <AppRouter/>
    </WebSocketProvider>
    </>
  )
}

