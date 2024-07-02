import React, { useState } from "react";
import axios from "axios";

import * as tf from "@tensorflow/tfjs";
import { Layer, InputLayer } from "../scripts/NeuralScripts";
import NerualNetwork from "../scripts/NeuralNetwork";

import GraphVisualizer from "../components/Neural_Components/GraphVisualizer";
import InputData from "../components/Neural_Components/InputData";
import NeuralNetwork from "../components/Neural_Components/NeuralNetwork";
import ParamaterForum from "../components/Neural_Components/ParamaterForum";

export default function NeuralBuilder() {
	//state for the whole network: NOTE THIS OBJECT IS IMMUTABLE!!!!
	const [network, setNetwork] = useState<NerualNetwork>();
	//New section for loading/saving model: THIS NEEDS TO BE CONNECTED TO THE DB
	const [userModels, setUserModels] = useState<any>();
	const [defaultModels, setDefaultModels] = useState<any>();
	//States for network parameters
	const [hiddenLayers, setHiddenLayers] = useState<Layer[]>([
		{ name: "L1", activation: "relu", units: 5, kernelRegularizer: tf.regularizers.l2() },
	]);
	const [activation, setActivation] = useState();
	const [lambda, setLambda] = useState();
	const [loss, setLoss] = useState();
	//These States depend on input data and desired output
	const [inputLayer, setInputLayer] = useState<InputLayer>();
	const [inputShape, setInputShape] = useState<number>();

	const [numClasses, setNumClasses] = useState<number>();
	const [outputLayer, setOutputLayer] = useState<Layer>();
	//visualisation will use all layers!!!!

	//used for selecting the layer! needs to interface with the neural network visual
	const [layerIndex, setLayerIndex] = useState<number>(0);

	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<ParamaterForum
						hiddenLayers={hiddenLayers}
						setHiddenLayers={setHiddenLayers}
						activation={activation}
						setActivation={setActivation}
						lambda={lambda}
						setLambda={setLambda}
						loss={loss}
						setLoss={setLoss}
						layerIndex={layerIndex}
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
