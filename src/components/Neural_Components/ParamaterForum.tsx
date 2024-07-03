import React, { ChangeEvent, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import { Layer } from "../../scripts/NeuralScripts";
import { lossList, activationList, lambdaList, regularizerList, updateMyLayer } from "../../scripts/NeuralScripts";
import DropdownMenu from "../DropdownMenu";

//Note: I need to add an option for selecting the data set and then fetching the correct dataset form the db and fitting the model to it
interface Props {
	layers: any;
	setLayers: any;
	loss: any;
	setLoss: any;
	layerIndex: any;
	setDataSet: any;
	epoch: number;
	setEpoch: any;
}

//Note: The sigmoid function is used for the two-class logistic regression, whereas the softmax function is used for the multiclass logistic regression
//Note: onclicking inputlayer set layerindex "-1" onclicking outputlayer set layerindex "-2"
function ParamaterForum({ layers, setLayers, loss, setLoss, layerIndex, setDataSet, epoch, setEpoch }: Props) {
	const [layerToggle, setLayerToggle] = useState<boolean>(false);
	const [advanceToggle, setAdvnaceToggle] = useState<boolean>(false);

	const updateLambda = (value: number) => {
		let copy = [...layers];
		updateMyLayer(layers[layerIndex], "lambda", value);
		setLayers(copy);
	};
	const updateRegularizer = (value: string) => {
		let copy = [...layers];
		updateMyLayer(copy[layerIndex], "regularizer", value);
		setLayers(copy);
	};
	const updateActivation = (value: string) => {
		let copy = [...layers];
		updateMyLayer(copy[layerIndex], "activation", value);
		setLayers(copy);
	};
	const updateUnits = (value: number) => {
		let copy = [...layers];
		updateMyLayer(copy[layerIndex], "units", value);
		setLayers(copy);
	};

	const handleUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(event.target.value);
		updateUnits(value);
	};

	const handleEpochChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(event.target.value);
		setEpoch(value);
	};

	useEffect(() => {}, [layers, loss]);

	return (
		<>
			<div className="parameter-container">
				<div className="layer-toggle-container">
					<input
						type="checkbox"
						onClick={() => {
							setLayerToggle(!layerToggle);
						}}
					/>
					<div>Select all layers {!layerToggle && "Layer: " + layerIndex}</div>
				</div>
				<div className="unit-input-container">
					<div>Units</div>
					<input type="number" value={layers[layerIndex].units} onChange={handleUnitChange} placeholder="Enter units" />
				</div>
				<DropdownMenu
					defaultSelected={layers[layerIndex].activation}
					setState={updateActivation}
					label={"Activation"}
					items={activationList}
				/>
				<DropdownMenu
					defaultSelected={layers[layerIndex].regularizer.regularizer}
					setState={updateRegularizer}
					label={"regularizer"}
					items={regularizerList}
				/>
				<DropdownMenu
					defaultSelected={layers[layerIndex].regularizer.lambda}
					setState={updateLambda}
					label={"Lambda"}
					items={lambdaList}
				/>
			</div>
			<div className="compiler-parameters">
				Other options
				<DropdownMenu defaultSelected={loss} setState={setLoss} label={"Loss"} items={lossList} />
				<div className="unit-input-container">
					<div>Epochs</div>
					<input type="number" value={epoch} onChange={handleEpochChange} placeholder="Enter units" />
				</div>
			</div>
			<div className="advance-container">
				This is for mapping the a linear output to a different loss function!
				<input
					type="checkbox"
					onClick={() => {
						setAdvnaceToggle(!advanceToggle);
					}}
				/>
				<div>Advance settings</div>
				{advanceToggle && <div className="advanced-parameters">Cuck</div>}
			</div>
			<div className="test div">
				{JSON.stringify(layers[layerIndex])} -- epoch={epoch} -- loss = {loss}
			</div>
		</>
	);
}

export default ParamaterForum;
