import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Word from './pages/Word/Word';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/word/:param?" element={<Word />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
