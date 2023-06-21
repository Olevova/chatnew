import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import {Chat} from './components/pages/Chat'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat' element={<Chat />} />
   </Routes>
  );
}

export default App;
