import React, { ChangeEvent, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import {
	activationList,
	lambdaList,
	regularizerList,
	updateLayer,
	DenseLayer,
	Conv2DLayer,
} from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

import "./ParameterForum.css";
import { IndexRouteObject } from "react-router";

//Note: I need to add an option for selecting the data set and then fetching the correct dataset form the db and fitting the model to it
interface Props {
	isDense: boolean;
	setIsDense: any;
	conv2DLayers: Conv2DLayer[];
	setConv2DLayers: any;
	denseLayers: DenseLayer[];
	setDenseLayers: any;
	denseIndex: number;
	conv2dIndex: number;
}

//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression
//Note: onclicking inputlayer set layerindex "-1" onclicking outputlayer set layerindex "-2"
function ParamaterForum({ isDense, setDenseLayers, setConv2DLayers, denseLayers, conv2DLayers }: Props) {
	return (
		<>
			<div className="parameter-container">
				<div className="layer-parameter-container">
					<div className="unit-input-container">
						<div>Units</div>
						<input
							type="number"
							value={layers[layerIndex].units}
							onChange={handleUnitChange}
							placeholder="Enter units"
						/>
					</div>
					<DropdownMenu
						defaultSelected={layers[layerIndex].activation}
						setState={updateActivation}
						label={"Activation"}
						items={activationList}
						layerState={layers[layerIndex]}
					/>
					<DropdownMenu
						defaultSelected={layers[layerIndex].regularizer.regularizer}
						setState={updateRegularizer}
						label={"Regularizer"}
						items={regularizerList}
						layerState={layers[layerIndex]}
					/>
					<DropdownMenu
						defaultSelected={layers[layerIndex].regularizer.lambda}
						setState={updateLambda}
						label={"Lambda"}
						items={lambdaList}
						layerState={layers[layerIndex]}
					/>
				</div>
			</div>
		</>
	);
}

export default ParamaterForum;
