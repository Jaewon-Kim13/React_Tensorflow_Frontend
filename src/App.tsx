import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NeuralBuilder from "./pages/NeuralBuilder";
import Predict from "./pages/Predict";
import "./App.css";

function App() {
	//TODO: add navbar
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/neural">Build Model</Link>
					</li>
					<li>
						<Link to="/predict">Test Model</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/neural" element={<NeuralBuilder />} />
				<Route path="/home" element={<Home />} />
				<Route path="/predict" element={<Predict />} />
			</Routes>
		</>
	);
}
export default App;
