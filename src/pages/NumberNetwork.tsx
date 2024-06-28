import React, { useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import { Layer, InputLayer } from "../scripts/Interfaces";

function NumberNetwork() {
	//Grid state info
	const [grid, setGrid] = useState<number[][]>();
	const rows = 20;

	//Neural Netwok
	const [layers, setLayers] = useState<Layer[]>();
	const [inputLayer, setInputLayer] = useState<InputLayer>();
	const [outputLayer, setOutputLayer] = useState<Layer>();
	const [activation, setActivation] = useState();
	const [lambda, setLambda] = useState();

	//update the page when layers/input layer changes
	useEffect(() => {}, [layers, inputLayer]);

	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<div className="parameter-container">Parameters</div>
					<div className="network-container">Network</div>
				</div>
				<div className="input-visual-container">
					<div className="input-container"></div>
					<div className="visual-container">
						<Canvas rows={rows} cols={rows} grid={grid} setGrid={setGrid} />
						<button
							onClick={() => {
								setGrid(Array.from({ length: rows }, () => Array.from({ length: rows }, () => 0)));
							}}
						>
							Clear
						</button>
						<button
							onClick={() => {
								/*CONVERT GRID TO 1D ARRAY
								Then feed that data to the input neurons
								*/
								const flatten = grid != undefined ? grid.flat(1) : null;
								console.log(flatten);
							}}
						>
							Check
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default NumberNetwork;
