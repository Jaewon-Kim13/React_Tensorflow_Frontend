import React, { useState } from "react";
import axios from "axios";

import { Layer, InputLayer } from "../scripts/Interfaces";
import NerualNetwork from "../scripts/NeuralNetwork";

import GraphVisualizer from "../components/GraphVisualizer";
import InputData from "../components/InputData";
import NeuralNetwork from "../components/NeuralNetwork";
import ParamaterForum from "../components/ParamaterForum";

export default function NeuralBuilder() {
	//state for the whole network: NOTE THIS OBJECT IS IMMUTABLE!!!!
	const [network, setNetwork] = useState<NerualNetwork>();
	//New section for loading/saving model: THIS NEEDS TO BE CONNECTED TO THE DB
	const [userModels, setUserModels] = useState<any>();
	const [defaultModels, setDefaultModels] = useState<any>();
	//States for network parameters
	const [hiddenLayers, setHiddenLayers] = useState<Layer[]>();
	const [activation, setActivation] = useState();
	const [lambda, setLambda] = useState();
	const [loss, setLoss] = useState();
	//These States depend on input data and desired output
	const [inputLayer, setInputLayer] = useState<InputLayer>();
	const [inputShape, setInputShape] = useState<number>();

	const [numClasses, setNumClasses] = useState<number>();
	const [outputLayer, setOutputLayer] = useState<Layer>();
	//visualisation will use all layers!!!!

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
