import { useEffect, useState } from "react";
import axios from "axios";

import { DenseLayer, Conv2DLayer, Layer, defaultModel } from "../scripts/NeuralScripts";
//import "./NeuralBuilder.css";

import GraphVisualizer from "../components/Neural_Components/GraphVisualizer";
import ParamaterForum from "../components/Neural_Components/ParameterForum";
import NeuralVisual from "../components/Neural_Components/NeuralVisual";

export default function NeuralBuilder() {
	const [userModels, setUserModels] = useState<any>();
	const [defaultModels, setDefaultModels] = useState<any>();
	const [model, setModel] = useState<any>(null);
	const [results, setResults] = useState<any>(null);
	const [randNum, setRandNum] = useState<number[][]>();
	const [input, setInput] = useState<any>(null);
	const [epochs, setEpochs] = useState<number>(100);

	const [layers, setLayers] = useState<Layer[]>(defaultModel);
	const [layerIndex, setLayerIndex] = useState<number>(0);

	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<ParamaterForum layers={layers} setLayers={setLayers} layerIndex={layerIndex} />
					<div>-------------</div>
					<NeuralVisual layers={layers} setLayerIndex={setLayerIndex} />
					<div>-------------</div>
				</div>
				<div className="input-visual-container">
					<GraphVisualizer />
				</div>
				TEST
				<div className="TEST">
					<button onClick={() => {}}>COMPILE</button>
					<button>Test input</button>
				</div>
			</div>
		</>
	);
}
