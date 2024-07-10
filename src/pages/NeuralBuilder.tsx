import { useEffect, useState } from "react";
import axios from "axios";

import { DenseLayer, Conv2DLayer } from "../scripts/NeuralScripts";
import "./NeuralBuilder.css";

import GraphVisualizer from "../components/Neural_Components/GraphVisualizer";
import InputData from "../components/Neural_Components/InputData";
import NeuralNetwork from "../components/Neural_Components/NeuralNetwork";
import ParamaterForum from "../components/Neural_Components/ParameterForum";

export default function NeuralBuilder() {
	const [userModels, setUserModels] = useState<any>();
	const [defaultModels, setDefaultModels] = useState<any>();
	const [model, setModel] = useState<any>(null);
	const [results, setResults] = useState<any>(null);
	const [randNum, setRandNum] = useState<number[][]>();
	const [input, setInput] = useState<any>(null);
	const [epochs, setEpochs] = useState<number>(100);

	const [isDense, setIsDense] = useState<boolean>(true);
	const [denseLayers, setDenseLayers] = useState<DenseLayer[]>();
	const [conv2DLayers, setConv2DLayers] = useState<Conv2DLayer[]>();
	const [denseIndex, setDenseIndex] = useState<number>(0);
	const [conv2DIndex, setConv2dIndex] = useState<number>(0);

	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<ParamaterForum
						isDense={isDense}
						setIsDense={setIsDense}
						conv2DLayers={conv2DLayers}
						setConv2DLayers={setConv2DLayers}
						denseLayers={denseLayers}
						setDenseLayers={setDenseLayers}
						denseIndex={denseIndex}
						conv2dIndex={conv2DIndex}
					/>
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
