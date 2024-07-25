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

	const [results, setResults] = useState<any>(null);

	const [compilerSettings, setCompilerSettings] = useState<CompilerSettings>(defaultCompilerSetttings);
	const [layers, setLayers] = useState<Layer[]>(defaultModel);
	const [layerIndex, setLayerIndex] = useState<number>(0);

	const compile = async (layers: Layer[], compilerSettings: CompilerSettings) => {
		const data = { layers: layers, compilerSettings: compilerSettings };
		axios
			.post("http://localhost:8804/compile", data)
			.then((response) => {
				setResults(response.data);
				const formattedData: HistoryData = {
					epoch: response.data.history.epoch,
					history: {
						val_loss: response.data.history.history.val_loss,
						val_acc: response.data.history.history.val_acc,
						loss: response.data.history.history.loss,
						acc: response.data.history.history.acc,
					},
				};
				console.log(history);

				createLineGraph(formattedData, "#accuracy-chart", "accuracy");
				createLineGraph(formattedData, "#loss-chart", "loss");
			})
			.catch((error) => {
				console.log("ERROR: " + error);
			});
	};

	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<ParamaterForum layers={layers} setLayers={setLayers} layerIndex={layerIndex} />
				</div>
				<div className="Network-Compiler-Conatainer">
					<InputData compilerSettings={compilerSettings} setCompilerSettings={setCompilerSettings} layers={layers} setLayers={setLayers} />
					<NeuralVisual layers={layers} setLayerIndex={setLayerIndex} setLayers={setLayers} layerIndex={layerIndex} />
				</div>
				<div className="input-visual-container">
					<GraphVisualizer />
				</div>
				<div className="TEST">
					<div>{JSON.stringify(layers[layerIndex])}</div>
					<div>{`Compiler Setting Test: ${JSON.stringify(compilerSettings)}`}</div>
					<button
						onClick={() => {
							compile(layers, compilerSettings);
						}}
					>
						COMPILE
					</button>
					<div>{JSON.stringify(results)}</div>
					<div id="accuracy-chart"></div>
					<div id="loss-chart"></div>
				</div>
			</div>
		</>
	);
}
