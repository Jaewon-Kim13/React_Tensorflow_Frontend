/*NOTE: I am redesigning the site to be one page where you can load predefined models
1.)The models will be stored in a database
2.)There will be set training data stored in the database, so that the user can change the model and retrain it
3.)Maybe add more pages for different types of problems, like 1 for nn and one for reinforcement training (will decied the algorithim later!)
4.)the reseign moves the core sections into their own components for easier readability and combines everything in the Neuralbuilder page
5.)Also note that the only data I will be add for now will be number_data, I might add EMNIST data at a later point
 */

import React, { useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import { Layer } from "../scripts/NeuralScripts";
import NerualNetwork from "../scripts/NeuralNetwork";
import axios from "axios";
import DropdownMenu from "../components/DropdownMenu";

function NumberNetwork() {
	//data
	const [trainingData, setTrainingData] = useState<any>();
	//Grid state info
	const [grid, setGrid] = useState<number[][]>();
	const rows = 28;

	//Neural Netwok
	const [network, setNetwork] = useState<NerualNetwork>();
	const inputShape = 28 * 28;
	const classes = 9;

	const [hiddenLayers, setHiddenLayers] = useState<Layer[]>([
		{  activation: "relu", units: 15, kernelRegularizer: 0 },
		{  activation: "relu", units: 10, kernelRegularizer: 0 },
		{  activation: "relu", units: 5, kernelRegularizer: 0 },
		{  activation: "linear", units: 9, kernelRegularizer: 0 },
	]);

	const [outputLayer, setOutputLayer] = useState<Layer>();
	const [activation, setActivation] = useState();
	const [lambda, setLambda] = useState();
	const [loss, setLoss] = useState();

	//update the page when layers/input layer changes
	useEffect(() => {
		const fetchTrainingData = async () => {
			try {
				const res = await axios.get("http://localhost:8800/number-data");
				setTrainingData(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTrainingData();
	}, [ trainingData]);

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
						<div>{trainingData?.data}</div>
						<DropdownMenu
							label={"pog"}
							items={[
								{
									value: "pog",
									handleOnClick: 1,
									label: "5",
								},
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default NumberNetwork;
