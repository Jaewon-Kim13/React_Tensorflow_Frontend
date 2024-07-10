import React, { ChangeEvent, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import {
	activationList,
	lambdaList,
	regularizerList,
	updateLayer,
	Layer,
} from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

import "./ParameterForum.css";
import { IndexRouteObject } from "react-router";

//Note: I need to add an option for selecting the data set and then fetching the correct dataset form the db and fitting the model to it
interface Props {
	layers: Layer[];
	setLayers: any;
	layerIndex: number;
}

//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression
//Note: onclicking inputlayer set layerindex "-1" onclicking outputlayer set layerindex "-2"
function ParamaterForum({ layers, setLayers, layerIndex}: Props) {
	const handleDropDownChange = () =>{}
	const getProp = (prop: string) =>{
		const update: any = layers[layerIndex].layer
		return update[prop];
	}

	const handleChange = (prop: string, value: any) => {
		const layersCopy = [...layers];
		layersCopy[layerIndex] = updateLayer(layersCopy[layerIndex], prop, value)
	}

	return (
		<>
			<div className="parameter-container">
				{layers[layerIndex].type == "Dense" && 
				<>
					<div>Units</div>
					<input
						type="number"
						value={getProp('units')}
						onChange={}
						placeholder="Enter units"
					/>
				</>

				}
			</div>
		</>
	);
}

export default ParamaterForum;
