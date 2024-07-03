import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { Layer } from "../../scripts/NeuralScripts";
import { lossList, activationList, lambdaList, regularizerList } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

interface Props {
	hiddenLayers: any;
	setHiddenLayers: any;
	lambda: any;
	setLambda: any;
	loss: any;
	setLoss: any;
	layerIndex: any;
	regularizer: any;
	setRegularizer: any;
}

//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression

function ParamaterForum({
	hiddenLayers,
	setHiddenLayers,
	lambda,
	setLambda,
	loss,
	setLoss,
	layerIndex,
	regularizer,
	setRegularizer,
}: Props) {
	const [layerToggle, setLayerToggle] = useState<boolean>(false);
	const [advanceToggle, setAdvnaceToggle] = useState<boolean>(false);

	useEffect(() => {}, [hiddenLayers, lambda, loss]);

	const updateLayer = () => {};

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
				<DropdownMenu defaultSelected={loss} label={"Loss"} items={lossList} />
				<DropdownMenu
					defaultSelected={hiddenLayers[layerIndex].activation}
					label={"Activation"}
					items={activationList}
				/>
				<DropdownMenu defaultSelected={regularizer} label={"regularizer"} items={regularizerList} />
				<DropdownMenu defaultSelected={lambda} label={"Lambda"} items={lambdaList} />
			</div>

			<div className="output-layer-parameters"></div>

			<div className="compiler-parameters"></div>

			<input type="checkbox" onClick={() => {}} />
			<div>Advance settings</div>
			{advanceToggle && <div className="advanced-parameters"></div>}
		</>
	);
}

const lossToDropdownItem = () => {};

export default ParamaterForum;
