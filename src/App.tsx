import { Link, Route, Routes } from "react-router-dom";
import Neural from "./pages/Neural";
import Home from "./pages/Home";
import NumberNetwork from "./pages/NumberNetwork";

function App() {
	//TODO: add navbar
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/neural">Neural Network</Link>
					</li>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/number-reconizer">Number Reconizer</Link>
					</li>
				</ul>
			</nav>
			<Routes>
				<Route path="/neural" element={<Neural />} />
				<Route path="/home" element={<Home />} />
				<Route path="/number-reconizer" element={<NumberNetwork />} />
			</Routes>
		</>
	);
}
export default App;
