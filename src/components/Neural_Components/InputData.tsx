import React, { ChangeEvent, useEffect, useState } from "react";
import Canvas from "../Canvas";
import { conv2dTranspose, div, Optimizer } from "@tensorflow/tfjs";
import { CompilerSettings, Layer, optimizerList } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";
import axios from "axios";
import { createLineGraph, HistoryData } from "../../scripts/D3Scripts";
import Popup from "../Popup";

interface Props {
	compilerSettings: CompilerSettings;
	setCompilerSettings: any;
	layers: Layer[];
	setResult: any;
	setUntrainedWeights: any;
	setTrainedWeights: any;
}

export default function InputData({ setCompilerSettings, compilerSettings, layers, setResult, setTrainedWeights, setUntrainedWeights }: Props) {
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasCompiled, setHasCompiled] = useState<boolean>(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const compilerCopy = { ...compilerSettings };
		switch (event.target.className) {
			case "ratio":
				compilerCopy.ratio = Number(event.target.value);
				break;
			case "batch":
				compilerCopy.batchSize = Number(event.target.value);
				break;
			case "epochs":
				compilerCopy.epochs = Number(event.target.value);
				break;
			case "learning":
				compilerCopy.optimizer.learningRate = Number(event.target.value);
		}
		setCompilerSettings(compilerCopy);
	};

	const compile = async (layers: Layer[], compilerSettings: CompilerSettings) => {
		const data = { layers: layers, compilerSettings: compilerSettings };
		console.log(compilerSettings);
		axios
			.post("http://localhost:8804/compile", data)
			.then((response) => {
				console.log(response.data);
				const acc = response.data.history.history.acc;
				const valAcc = response.data.history.history.val_acc;

				const loss = response.data.history.history.loss;
				const valLoss = response.data.history.history.val_loss;

				setResult({ acc: acc[acc.length - 1], valAcc: valAcc[valAcc.length - 1], loss: loss[loss.length - 1], valLoss: valLoss[valLoss.length - 1] });

				const fixedTrainedWeights = [];
				const fixedUntrainedWeights = [];
				for (let i = 0; i < layers.length; i++) {
					let temp = response.data.trainedWeights[i];
					let temp1 = response.data.untrainedWeights[i];
					if (layers[i].type == "Conv2D") {
						temp = [convertConv2DWeights(temp[0]), temp[1]];
						temp1 = [convertConv2DWeights(temp1[0]), temp1[1]];
					} else if (layers[i].type == "Dense") {
						temp = [convertDenseWeights(temp[0]), temp[1]];
						temp1 = [convertDenseWeights(temp1[0]), temp1[1]];
					}
					fixedTrainedWeights.push(temp);
					fixedUntrainedWeights.push(temp1);
				}
				setTrainedWeights(fixedTrainedWeights);
				setUntrainedWeights(fixedUntrainedWeights);
				//console.log(fixedTrainedWeights);

				const formattedData: HistoryData = {
					epoch: response.data.history.epoch,
					history: {
						val_loss: response.data.history.history.val_loss,
						val_acc: response.data.history.history.val_acc,
						loss: response.data.history.history.loss,
						acc: response.data.history.history.acc,
					},
				};

				createLineGraph(formattedData, "#accuracy-chart", "accuracy");
				createLineGraph(formattedData, "#loss-chart", "loss");

				setHasCompiled(true);
				setLoading(false);
			})
			.catch((error) => {
				console.log("Model Error");
				setLoading(false);
				setError(true);
			});
	};

	const updateOptimizerName = (item: string) => {
		const copy = { ...compilerSettings };
		copy.optimizer.name = item;
		setCompilerSettings(copy);
	};

	return (
		<>
			<Popup state={error} setState={setError}>
				<div className="error-message">Model Structure Error! Please review your model to make sure it is valid!</div>
			</Popup>

			<Popup state={loading} setState={setLoading}>
				<div className="loading-message">Loading!!!!</div>
			</Popup>
			<div className="data-input-container">
				<div className="range-container">
					<div>{`Ratio of training to test data: ${compilerSettings.ratio}%`}</div>
					<input type="range" className="ratio" min="10" max="90" onChange={handleChange} value={compilerSettings.ratio} />
					<div>{`Batch Size: ${Math.pow(2, compilerSettings.batchSize)}`}</div>
					<input type="range" className="batch" min="1" max="10" onChange={handleChange} value={compilerSettings.batchSize} />
					<div>{`Epochs: ${compilerSettings.epochs}`}</div>
					<input type="range" className="epochs" min="1" max="10" onChange={handleChange} value={compilerSettings.epochs} />
				</div>
				<div className="optimizer-container">
					<DropdownMenu label="Optimizer" items={optimizerList} setState={updateOptimizerName} state={compilerSettings.optimizer.name} />
					<div className="range-container">
						<div>{`Learning Rate: ${compilerSettings.optimizer.learningRate / 100}`}</div>
						<input type="range" className="learning" min="1" max="100" onChange={handleChange} value={compilerSettings.optimizer.learningRate} />
					</div>
				</div>
				<button
					onClick={() => {
						setLoading(true);
						compile(layers, compilerSettings);
					}}
				>
					COMPILE
				</button>
				{hasCompiled && (
					<>
						<button
							onClick={() => {
								setHasCompiled(false);
							}}
						>
							SAVE MODEL
						</button>
						<div>Click on the Filter's or Dense neurons to view their weights!</div>
					</>
				)}
			</div>
		</>
	);
}

const convertConv2DWeights = (weights: number[][][][]) => {
	const kernelSize = weights.length;
	const numFilters = weights[0][0][0].length;
	const filters: number[][][] = [];

	for (let i = 0; i < numFilters; i++) {
		filters.push([]);
		for (let j = 0; j < kernelSize; j++) {
			filters[i].push([]);
		}
	}

	for (let i = 0; i < kernelSize; i++) {
		for (let j = 0; j < kernelSize; j++) {
			for (let k = 0; k < numFilters; k++) {
				filters[k][j].push(weights[j][i][0][k]);
			}
		}
	}

	return filters;
};

const convertDenseWeights = (weights: number[][]) => {
	console.log("inside convert, input is: " + weights.length + "x" + weights[0].length);
	let units: number[][] = [];
	for (let i = 0; i < weights.length; i++) {
		for (let j = 0; j < weights[i].length; j++) {
			if (units.length < j + 1) units.push([]);
			units[j].push(weights[i][j]);
		}
	}
};
