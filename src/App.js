import Home from './components/Home';
import Status from './components/Status'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/status/:id' element={<Status/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
