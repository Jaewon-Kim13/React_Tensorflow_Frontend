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

	const [result, setResult] = useState<any>("Compile to see results!");

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
					<InputData compilerSettings={compilerSettings} setCompilerSettings={setCompilerSettings} layers={layers} setResult={setResult} />
					<NeuralVisual layers={layers} setLayerIndex={setLayerIndex} setLayers={setLayers} layerIndex={layerIndex} />
					<div className="graphs">
						<div id="accuracy-chart"></div>
						<div id="loss-chart"></div>
					</div>
				</div>
				<div className="input-visual-container">
					<GraphVisualizer />
				</div>
			</div>
		</>
	);
}
