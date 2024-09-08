import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NeuralBuilder from "./pages/NeuralBuilder";
import Predict from "./pages/Predict";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { hash } from "bcryptjs";
const saltRounds = 10;

function App() {
	const [clickedLogin, setClickedLogin] = useState<boolean>(false);

	const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [sessionKey, setSessionKey] = useState<number>();

	const createAccount = async () => {
		const username = (document.getElementById("user") as HTMLInputElement).value;
		const password = (document.getElementById("pass") as HTMLInputElement).value;
		const data = { username: username, passwordHash: null };
		hash(password, saltRounds, function (err: any, hash: any) {
			data.passwordHash = hash;
		});

		axios
			.post("http://localhost:8804/create-user", data)
			.then((response) => {
				setSessionKey(response.data.sessionKey);
				setUsername(username);
				setIsLoggedin(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const login = async () => {
		const username = (document.getElementById("user") as HTMLInputElement).value;
		const password = (document.getElementById("pass") as HTMLInputElement).value;
		let passwordHash;
		hash(password, saltRounds, function (err: any, hash: any) {
			passwordHash = hash;
		});

		axios
			.get(`http://localhost:8804/login/:${username}/:${passwordHash}`)
			.then((response) => {
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
						<div>If you already have an account press login</div>
						<input type="text" maxLength={20} minLength={8} placeholder="username" id="user" />
						<input type="text" maxLength={20} minLength={8} placeholder="password" id="pass" />
						<button onClick={() => 0}>login</button>
						<button onClick={() => 0}>create account</button>
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
