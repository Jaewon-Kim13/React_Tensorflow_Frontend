import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { Layer } from "../../scripts/NeuralScripts";
import { lossList, activationList, lambdaList, regularizerList, updateMyLayer } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

interface Props {
	hiddenLayers: any;
	setHiddenLayers: any;
	loss: any;
	setLoss: any;
	layerIndex: any;
}

//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression

function ParamaterForum({ hiddenLayers, setHiddenLayers, loss, setLoss, layerIndex }: Props) {
	const [layerToggle, setLayerToggle] = useState<boolean>(false);
	const [advanceToggle, setAdvnaceToggle] = useState<boolean>(false);

	useEffect(() => {}, [hiddenLayers, loss]);

	const lossToDropdownItem = () => {};
	const updateLambda = (value: number) => {
		let copy = [...hiddenLayers];
		updateMyLayer(hiddenLayers[layerIndex], "lambda", value);
		setHiddenLayers(copy);
	};
	const updateRegularizer = (value: string) => {
		let copy = [...hiddenLayers];
		updateMyLayer(copy[layerIndex], "regularizer", value);
		setHiddenLayers(copy);
	};
	const updateActivation = (value: string) => {
		let copy = [...hiddenLayers];
		updateMyLayer(copy[layerIndex], "activation", value);
		setHiddenLayers(copy);
	};

	return (
		<>
			<div className="hidden-layer-parameters">
				<input
					type="checkbox"
					onClick={() => {
						setLayerToggle(!layerToggle);
					}}
				/>
				<div>Select all hidden layers {!layerToggle && "Layer: " + layerIndex}</div>
				<DropdownMenu defaultSelected={loss} setState={setLoss} label={"Loss"} items={lossList} />
				<DropdownMenu
					defaultSelected={hiddenLayers[layerIndex].activation}
					setState={updateActivation}
					label={"Activation"}
					items={activationList}
				/>
				<DropdownMenu
					defaultSelected={hiddenLayers[layerIndex].regularizer.regularizer}
					setState={updateRegularizer}
					label={"regularizer"}
					items={regularizerList}
				/>
				<DropdownMenu
					defaultSelected={hiddenLayers[layerIndex].regularizer.lambda}
					setState={updateLambda}
					label={"Lambda"}
					items={lambdaList}
				/>
			</div>

			<div className="output-layer-parameters">
				TEST:
				{JSON.stringify(hiddenLayers)}
			</div>

			<div className="compiler-parameters"></div>

			<input type="checkbox" onClick={() => {}} />
			<div>Advance settings</div>
			{advanceToggle && <div className="advanced-parameters"></div>}
		</>
	);
}

export default ParamaterForum;
