import React, { useEffect, useState } from "react";
import axios from "axios";

import * as tf from "@tensorflow/tfjs";
import { Layer, regularizerList, MyLayer, compileModel, JSONData } from "../scripts/NeuralScripts";
import NerualNetwork from "../scripts/NeuralNetwork";
import "./NeuralBuilder.css";

import GraphVisualizer from "../components/Neural_Components/GraphVisualizer";
import InputData from "../components/Neural_Components/InputData";
import NeuralNetwork from "../components/Neural_Components/NeuralNetwork";
import ParamaterForum from "../components/Neural_Components/ParameterForum";
import Test from "../components/Neural_Components/Test";
import { ftruncate } from "fs";
import { json } from "stream/consumers";

export default function NeuralBuilder() {
	//New section for loading/saving model: THIS NEEDS TO BE CONNECTED TO THE DB
	const [userModels, setUserModels] = useState<any>();
	const [defaultModels, setDefaultModels] = useState<any>();
	const [model, setModel] = useState<any>(null);

	//section for data
	const [dataSetName, setDataSetName] = useState<string>("numbers");
	const [dataSetList, setDataSetList] = useState<string[]>([""]);
	const [dataJSON, setDataJSON] = useState<JSONData>({ type: "error", size: [1, 1], data: { x: [[0]], y: [0] } });
	const [shape, setShape] = useState<any>(784);
	const [results, setResults] = useState<any>(null);
	const [input, setInput] = useState<any>(null);

	//States for network parameters **note must convert from mylayer to layer to add to compiler
	const [layers, setLayers] = useState<MyLayer[]>([
		{ activation: "relu", units: 15, regularizer: { regularizer: "l1", lambda: 0 } },
		{ activation: "relu", units: 5, regularizer: { regularizer: "l1", lambda: 0 } },
		{ activation: "relu", units: 3, regularizer: { regularizer: "l1", lambda: 0 } },
	]);
	const [loss, setLoss] = useState<string>("sparseCategoricalCrossentropy");
	const [epoch, setEpoch] = useState<number>(100);
	//used for selecting the layer! needs to interface with the neural network visual
	const [layerIndex, setLayerIndex] = useState<number>(0);

	useEffect(() => {
		//Fetch the data set list on load! in form [{name: string; classes?: number shape: number}] **NOTE WHEN I PRESS COMIPLE IT WILL THEN FETCH
		const fetchTrainingData = async () => {
			try {
				const res = await axios.get("http://localhost:8800/number-data");
				setDataJSON(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		//just for testing!
		setShape(784);
		setDataSetList(["numbers", "TEST"]);
		setDataSetName("numbers");
		fetchTrainingData();
	}, [setDataJSON]);

	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<ParamaterForum
						layers={layers}
						setLayers={setLayers}
						loss={loss}
						setLoss={setLoss}
						layerIndex={layerIndex}
						setDataSetName={setDataSetName}
						dataSetList={dataSetList}
						epoch={epoch}
						setEpoch={setEpoch}
						dataSetName={dataSetName}
					/>
					<NeuralNetwork layers={layers} setLayerIndex={setLayerIndex} />
				</div>
				<div className="input-visual-container">
					<InputData dataSetName={dataSetName} setInput={setInput} dataJSON={dataJSON} />
					<GraphVisualizer />
				</div>
				TEST
				<div className="TEST">
					<button
						onClick={() => {
							setModel(compileModel(layers, loss, { x: dataJSON.data.x, y: dataJSON.data.y, shape: shape }, epoch));
						}}
					>
						COMPILE
					</button>
					<button>Test input</button>
					<div>{JSON.stringify(model)}</div>
				</div>
			</div>
		</>
	);
}
