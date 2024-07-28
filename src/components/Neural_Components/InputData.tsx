import React, { ChangeEvent, useState } from "react";
import Canvas from "../Canvas";
import { conv2dTranspose, div, Optimizer } from "@tensorflow/tfjs";
import { CompilerSettings, Layer, optimizerList } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";
import axios from "axios";
import { createLineGraph, HistoryData } from "../../scripts/D3Scripts";

interface Props {
	compilerSettings: CompilerSettings;
	setCompilerSettings: any;
	layers: Layer[];
	setResult: any;
	setUntrainedWeights: any;
	setTrainedWeights: any;
}

export default function InputData({ setCompilerSettings, compilerSettings, layers, setResult, setTrainedWeights, setUntrainedWeights }: Props) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const compilerCopy = { ...compilerSettings };
		switch (event.target.className) {
			case "ratio":
				compilerCopy.ratio = Number(event.target.value);
				break;
			case "batch":
				compilerCopy.batchSize = Number(event.target.value);
				break;
			case "noise":
				compilerCopy.noise = Number(event.target.value);
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
		axios
			.post("http://localhost:8804/compile", data)
			.then((response) => {
				console.log(response.data);
				const acc = response.data.history.history.acc;
				const valAcc = response.data.history.history.val_acc;

				const loss = response.data.history.history.loss;
				const valLoss = response.data.history.history.val_loss;

				setResult({ acc: acc[acc.length - 1], valAcc: valAcc[valAcc.length - 1], loss: loss[loss.length - 1], valLoss: valLoss[valLoss.length - 1] });
				setTrainedWeights(response.data.trainedWeights);
				setUntrainedWeights(response.data.untrainedWeights);

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
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
	};

	const updateOptimizerName = (item: string) => {
		const copy = { ...compilerSettings };
		copy.optimizer.name = item;
		setCompilerSettings(copy);
	};

	return (
		<>
			<div className="data-input-container">
				<div className="range-container">
					<div>{`Ratio of training to test data: ${compilerSettings.ratio}%`}</div>
					<input type="range" className="ratio" min="10" max="90" onChange={handleChange} value={compilerSettings.ratio} />
					<div>{`Batch Size: ${Math.pow(2, compilerSettings.batchSize)}`}</div>
					<input type="range" className="batch" min="1" max="10" onChange={handleChange} value={compilerSettings.batchSize} />
					<div>{`Noise: ${compilerSettings.noise / 100}`}</div>
					<input type="range" className="noise" min="0" max="100" onChange={handleChange} value={compilerSettings.noise} />
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
						compile(layers, compilerSettings);
					}}
				>
					COMPILE
				</button>
			</div>
		</>
	);
}
