import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { Layer } from "../../scripts/NeuralScripts";
import { lossList, activationList } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

interface Props {
	hiddenLayers: any;
	setHiddenLayers: any;
	activation: any;
	setActivation: any;
	lambda: any;
	setLambda: any;
	loss: any;
	setLoss: any;
	layerIndex: any;
}

//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression

function ParamaterForum({
	hiddenLayers,
	setHiddenLayers,
	activation,
	setActivation,
	lambda,
	setLambda,
	loss,
	setLoss,
	layerIndex,
}: Props) {
	const [layerToggle, setLayerToggle] = useState<boolean>(false);

	useEffect(() => {}, [hiddenLayers, activation, lambda, loss]);

	const updateLayer = () => {};

	return (
		<>
			<div>
				<input
					type="checkbox"
					onClick={() => {
						setLayerToggle(!layerToggle);
					}}
				/>
				<div>Select all layers {!layerToggle && "Layer: " + layerIndex}</div>
				<DropdownMenu defaultSelected="" label={"Lambda"} items={[{ label: "shit", value: "pog" }]} />
				<DropdownMenu label={"Loss"} items={[{ label: "shit", value: "pog" }]} />
				<DropdownMenu
					label={"Activation"}
					items={[
						{ label: "shit", value: "pog" },
						{ label: "dick", value: "pog" },
					]}
				/>
				<button onClick={() => {}}>Change</button>
			</div>
		</>
	);
}

export default ParamaterForum;
