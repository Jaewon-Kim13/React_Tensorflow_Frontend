import React, { ChangeEvent, useState } from "react";
import Canvas from "../Canvas";
import { div, Optimizer } from "@tensorflow/tfjs";
import { CompilerSettings, Layer, optimizerList } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

interface Props {
	compilerSettings: CompilerSettings;
	setCompilerSettings: any;
	layers: Layer[];
}

export default function InputData({ setCompilerSettings, compilerSettings, layers }: Props) {
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
					<div>{`Batch Size: ${compilerSettings.batchSize}`}</div>
					<input type="range" className="batch" min="1" max="32" onChange={handleChange} value={compilerSettings.batchSize} />
					<div>{`Noise: ${compilerSettings.noise / 100}`}</div>
					<input type="range" className="noise" min="0" max="100" onChange={handleChange} value={compilerSettings.noise} />
					<div>{`Epochs: ${compilerSettings.epochs}`}</div>
					<input type="range" className="epochs" min="1" max="100" onChange={handleChange} value={compilerSettings.epochs} />
				</div>
				<div className="optimizer-container">
					<DropdownMenu label="Optimizer" items={optimizerList} setState={updateOptimizerName} state={compilerSettings.optimizer.name} />
					<div className="range-container">
						<div>{`Learning Rate: ${compilerSettings.optimizer.learningRate / 100}`}</div>
						<input type="range" className="learning" min="1" max="100" onChange={handleChange} value={compilerSettings.optimizer.learningRate} />
					</div>
				</div>
			</div>
			<div>{`Compiler Setting Test: ${JSON.stringify(compilerSettings)}`}</div>
		</>
	);
}
