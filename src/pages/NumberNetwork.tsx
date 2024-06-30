import React, { useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import { Layer, InputLayer } from "../scripts/Interfaces";
import NerualNetwork from "../scripts/NeuralNetwork";

function NumberNetwork() {
	//Grid state info
	const [grid, setGrid] = useState<number[][]>();
	const rows = 28;

	//Neural Netwok
	const [network, setNetwork] = useState<NerualNetwork>();
	const inputShape = 28 * 28;
	const classes = 9;

	const [hiddenLayers, setHiddenLayers] = useState<Layer[]>([
		{ name: "Layer1", activation: "relu", units: 15, kernelRegularizer: 0 },
		{ name: "Layer2", activation: "relu", units: 10, kernelRegularizer: 0 },
		{ name: "Layer3", activation: "relu", units: 5, kernelRegularizer: 0 },
		{ name: "Linear", activation: "linear", units: 9, kernelRegularizer: 0 },
	]);
	const [inputLayer, setInputLayer] = useState<InputLayer>({
		activation: "relu",
		units: 5,
		kernelRegularizer: 0,
		shape: 100,
	});
	const [outputLayer, setOutputLayer] = useState<Layer>();
	const [activation, setActivation] = useState();
	const [lambda, setLambda] = useState();
	const [loss, setLoss] = useState();

	//update the page when layers/input layer changes
	useEffect(() => {}, [hiddenLayers, inputLayer]);

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
						<button onClick={() => parseNumberData()}>Parse DATA</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default NumberNetwork;

function parseNumberData() {

}
