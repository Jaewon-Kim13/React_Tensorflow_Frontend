import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NeuralBuilder from "./pages/NeuralBuilder";
import Predict from "./pages/Predict";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
	const [clickedLogin, setClickedLogin] = useState<boolean>(false);

	const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [sessionKey, setSessionKey] = useState<number>();

	const createAccount = async () => {
		const username = (document.getElementById("user") as HTMLInputElement).value;
		const password = (document.getElementById("pass") as HTMLInputElement).value;

		console.log(`Create: Username:${username} \nPassword:${password}`);

		const data = { username: username, password: password };

		axios
			.post("http://localhost:8804/create-user", data)
			.then((response) => {
				setSessionKey(response.data.sessionKey);
				setUsername(username);
				setIsLoggedin(true);

				console.log("New Session Key: " + response.data.sessionKey);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const login = async () => {
		const username = (document.getElementById("user") as HTMLInputElement).value;
		const password = (document.getElementById("pass") as HTMLInputElement).value;

		axios
			.get(`http://localhost:8804/login/${username}/${password}`)
			.then((response) => {
				console.log("Login session Key: " + response.data.sessionKey);
				setSessionKey(response.data.sessionKey);
				setUsername(username);
				setIsLoggedin(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/neural" state={{ isLoggedin: isLoggedin, username: username, sessionKey: sessionKey }}>
							Build Model
						</Link>
					</li>
					<li>
						<Link to="/predict" state={{ isLoggedin: isLoggedin, username: username, sessionKey: sessionKey }}>
							Test Model
						</Link>
					</li>
					<li>
						<button onClick={() => setClickedLogin(!clickedLogin)}>Login</button>
					</li>
				</ul>
			</nav>

			{clickedLogin && (
				<>
					<div className="login-box">
						<div>{`TESTUSER TESTPASSWORD Session Key: ${sessionKey}`}</div>
						<input type="text" maxLength={20} minLength={5} placeholder="username" id="user" />
						<input type="text" maxLength={20} minLength={5} placeholder="password" id="pass" />
						<button onClick={() => login()}>login</button>
						<button onClick={() => createAccount()}>create account</button>
					</div>
				</>
			)}

			<Routes>
				<Route path="/neural" element={<NeuralBuilder />} />
				<Route path="/home" element={<Home />} />
				<Route path="/predict" element={<Predict />} />
			</Routes>
		</>
	);
}
export default App;
