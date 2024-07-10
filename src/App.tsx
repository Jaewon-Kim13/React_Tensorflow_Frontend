import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NeuralBuilder from "./pages/NeuralBuilder";

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
						<Link to="/neural">Home</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/neural" element={<NeuralBuilder />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</>
	);
}
export default App;
