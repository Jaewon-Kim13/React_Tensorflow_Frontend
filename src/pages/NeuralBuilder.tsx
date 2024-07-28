import { useEffect, useState } from "react";

import { DenseLayer, Conv2DLayer, Layer, defaultModel, CompilerSettings, defaultCompilerSetttings } from "../scripts/NeuralScripts";
import "./NeuralBuilder.css";

import GraphVisualizer from "../components/Neural_Components/GraphVisualizer";
import ParamaterForum from "../components/Neural_Components/ParameterForum";
import NeuralVisual from "../components/Neural_Components/NeuralVisual";
import InputData from "../components/Neural_Components/InputData";
import axios from "axios";
import { createLineGraph, HistoryData } from "../scripts/D3Scripts";

export default function NeuralBuilder() {
	const [userModels, setUserModels] = useState<any>();
	const [defaultModels, setDefaultModels] = useState<any>();
	const [model, setModel] = useState<any>(null);
	const [untrainedWeights, setUntrainedWeights] = useState<any>(null);
	const [trainedWeights, setTrainedWeights] = useState<any>(null);

	const [result, setResult] = useState<any>({ acc: 0, loss: 0, valAcc: 0, valLoss: 0 });
	const [compilerSettings, setCompilerSettings] = useState<CompilerSettings>(defaultCompilerSetttings);
	const [layers, setLayers] = useState<Layer[]>(defaultModel);
	const [layerIndex, setLayerIndex] = useState<number>(0);

	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<ParamaterForum layers={layers} setLayers={setLayers} layerIndex={layerIndex} />
				</div>
				<div className="Network-Compiler-Conatainer">
					<InputData
						compilerSettings={compilerSettings}
						setCompilerSettings={setCompilerSettings}
						layers={layers}
						setResult={setResult}
						setUntrainedWeights={setUntrainedWeights}
						setTrainedWeights={setUntrainedWeights}
					/>
					<NeuralVisual
						layers={layers}
						setLayerIndex={setLayerIndex}
						setLayers={setLayers}
						layerIndex={layerIndex}
						untrainedWeights={untrainedWeights}
						trainedWeights={trainedWeights}
					/>
					<div className="compile-data">
						<div id="accuracy-chart"></div>
						<div id="loss-chart"></div>
						<div className="final-results">
							<div>
								Training set: accuracy: {(result.acc * 100).toFixed(2)}% loss: {result.loss.toFixed(2)}
							</div>
							<div>
								Validation set: accuracy: {(result.valAcc * 100).toFixed(2)}% loss: {result.valLoss.toFixed(2)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
