import React, { useEffect, useState } from "react";
import axios from "axios";

import * as tf from "@tensorflow/tfjs";
import { Layer, regularizerList, MyLayer } from "../scripts/NeuralScripts";
import NerualNetwork from "../scripts/NeuralNetwork";

import GraphVisualizer from "../components/Neural_Components/GraphVisualizer";
import InputData from "../components/Neural_Components/InputData";
import NeuralNetwork from "../components/Neural_Components/NeuralNetwork";
import ParamaterForum from "../components/Neural_Components/ParamaterForum";

export default function NeuralBuilder() {
	//New section for loading/saving model: THIS NEEDS TO BE CONNECTED TO THE DB
	const [userModels, setUserModels] = useState<any>();
	const [defaultModels, setDefaultModels] = useState<any>();

	//section for data
	const [dataSet, setDataSet] = useState<string>();
	const [dataSetList, setDataSetList] = useState<string[]>();
	const [data, setData] = useState<any>();
	const [shape, setShape] = useState<any>();

	//States for network parameters **note must convert from mylayer to layer to add to compiler
	const [layers, setLayers] = useState<MyLayer[]>([
		{ activation: "relu", units: 5, regularizer: { regularizer: "l1", lambda: 0 } },
	]);
	const [loss, setLoss] = useState<string>("sparseCategoricalCrossentropy");
	const [epoch, setEpoch] = useState<number>(100);
	//used for selecting the layer! needs to interface with the neural network visual
	const [layerIndex, setLayerIndex] = useState<number>(0);

	useEffect(() => {
		//Fetch the data set list on load! in form {name: string; classes?: number shape: number} **NOTE WHEN I PRESS COMIPLE IT WILL THEN FETCH
	}, []);

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
						setDataSet={setDataSet}
						epoch={epoch}
						setEpoch={setEpoch}
					/>
					<NeuralNetwork />
				</div>
				<div className="input-visual-container">
					<InputData />
					<GraphVisualizer />
				</div>
			</div>
		</>
	);
}
