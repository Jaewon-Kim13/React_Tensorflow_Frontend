import React, { ChangeEvent, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { activationList, lambdaList, regularizerList, updateLayer, Layer } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

//import "./ParameterForum.css";
import { IndexRouteObject } from "react-router";

//Note: I need to add an option for selecting the data set and then fetching the correct dataset form the db and fitting the model to it
interface Props {
	layers: Layer[];
	setLayers: any;
	layerIndex: number;
}

//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression
//Note: onclicking inputlayer set layerindex "-1" onclicking outputlayer set layerindex "-2"
function ParamaterForum({ layers, setLayers, layerIndex }: Props) {
	const handleDropDownChange = () => {};
	const getProp = (prop: string) => {
		const update: any = layers[layerIndex].layer;
		return update[prop];
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const layersCopy = [...layers];
		layersCopy[layerIndex].layer = updateLayer(
			layersCopy[layerIndex].layer,
			event.target.className,
			event.target.value
		);
		setLayers(layersCopy);
	};

	const updateActivation = (item: string) => {
		const layersCopy = [...layers];
		layersCopy[layerIndex].layer = updateLayer(layersCopy[layerIndex].layer, "activation", item);
		setLayers(layersCopy);
	};

	const updateRegularizer = (item: string) => {
		const kernelRegularizer = { ...getProp("kernelRegularizer") };
		kernelRegularizer.regularizer = item;
		const layersCopy = [...layers];
		layersCopy[layerIndex].layer = updateLayer(layersCopy[layerIndex].layer, "kernelRegularizer", kernelRegularizer);
		setLayers(layersCopy);
	};

	const updateLambda = (item: number) => {
		const kernelRegularizer = { ...getProp("kernelRegularizer") };
		kernelRegularizer.lambda = item;
		console.log(kernelRegularizer);
		const layersCopy = [...layers];
		layersCopy[layerIndex].layer = updateLayer(layersCopy[layerIndex].layer, "kernelRegularizer", kernelRegularizer);
		setLayers(layersCopy);
	};

	useEffect(() => {}, [layers]);

	return (
		<>
			<div className="parameter-container">
				{layers[layerIndex].type == "Dense" && (
					<>
						<div className="input-container">
							<div>Units</div>
							<input type="range" className="units" min="1" max="10" onChange={handleChange} value={getProp("units")} />
						</div>
					</>
				)}
				{layers[layerIndex].type == "Conv2D" && (
					<>
						<div className="input-container">
							<div>kernalSize</div>
							<input
								type="range"
								className="kernelSize"
								min="1"
								max="10"
								onChange={handleChange}
								value={getProp("kernelSize")}
							/>
						</div>
						<div className="input-container">
							<div>filters</div>
							<input
								type="range"
								className="filters"
								min="1"
								max="10"
								onChange={handleChange}
								value={getProp("filters")}
							/>
						</div>
						<div className="input-container">
							<div>strides</div>
							<input
								type="range"
								className="strides"
								min="1"
								max="10"
								onChange={handleChange}
								value={getProp("strides")}
							/>
						</div>
					</>
				)}
				{(layers[layerIndex].type == "Dense" || layers[layerIndex].type == "Conv2D") && (
					<>
						<DropdownMenu
							setState={updateActivation}
							label={"activation"}
							items={activationList}
							state={getProp("activation")}
						/>
						<DropdownMenu
							setState={updateRegularizer}
							label={"regularizer"}
							items={regularizerList}
							state={getProp("kernelRegularizer").regularizer}
						/>
						<DropdownMenu
							setState={updateLambda}
							label={"lambda"}
							items={lambdaList}
							state={getProp("kernelRegularizer").lambda}
						/>
					</>
				)}
			</div>
			<div>{JSON.stringify(layers[layerIndex])}</div>
			<div>----------------{JSON.stringify(getProp("kernelRegularizer"))}++++++++++++++++++</div>
		</>
	);
}

export default ParamaterForum;
