import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Neural from "./pages/Neural";
import Home from "./pages/Home";

function App() {
	const [count, setCount] = useState(0);

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
				</ul>
			</nav>
			<Routes>
				<Route path="/neural" element={<Neural />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
