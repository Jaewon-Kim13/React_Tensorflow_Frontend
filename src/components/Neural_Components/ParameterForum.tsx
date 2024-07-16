import React, { ChangeEvent, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import {
	activationList,
	lambdaList,
	regularizerList,
	updateLayer,
	Layer,
	layerTypes,
	defaultConv2D,
	defaultFlatten,
	defaultMaxPooling2D,
	defaultDense,
	kernelInitializerList,
} from "../../scripts/NeuralScripts";

import DropdownMenu from "../DropdownMenu";

import "./ParameterForum.css";

interface Props {
	layers: Layer[];
	setLayers: any;
	layerIndex: number;
}

function ParamaterForum({ layers, setLayers, layerIndex }: Props) {
	const getProp = (prop: string) => {
		const update: any = layers[layerIndex].layer;
		return update[prop];
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const layersCopy = [...layers];
		if (
			event.target.className == "strides" ||
			event.target.className == "units" ||
			event.target.className == "filters" ||
			event.target.className == "kernalSize"
		) {
			layersCopy[layerIndex].layer = updateLayer(layersCopy[layerIndex].layer, event.target.className, Number(event.target.value));
		} else {
			layersCopy[layerIndex].layer = updateLayer(layersCopy[layerIndex].layer, event.target.className, event.target.value);
		}

		setLayers(layersCopy);
	};

	const handleMaxPoolChange = (event: ChangeEvent<HTMLInputElement>) => {
		const layersCopy = [...layers];
		layersCopy[layerIndex].layer = updateLayer(layersCopy[layerIndex].layer, event.target.className, [
			Number(event.target.value),
			Number(event.target.value),
		]);
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

	const updateInitializer = (item: string) => {
		const layersCopy = [...layers];
		layersCopy[layerIndex].layer = updateLayer(layersCopy[layerIndex].layer, "kernelInitializer", item);
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

	const updateLayerType = (item: string) => {
		const layersCopy = [...layers];
		layersCopy[layerIndex].type = item;
		switch (item) {
			case "Dense":
				layersCopy[layerIndex].layer = defaultDense;
				break;
			case "Conv2D":
				layersCopy[layerIndex].layer = defaultConv2D;
				break;
			case "Flatten":
				layersCopy[layerIndex].layer = defaultFlatten;
				break;
			case "MaxPooling2D":
				layersCopy[layerIndex].layer = defaultMaxPooling2D;
				break;
		}
		setLayers(layersCopy);
	};

	const getGridSpacing = () => {
		let num: number = Object.keys(layers[layerIndex].layer).length + 2;
		let temp: string = "";
		let size: number = 100 / num;
		for (let i = 0; i < num; i++) {
			temp += size + "% ";
		}
		return temp;
	};

	useEffect(() => {}, [layers]);

	return (
		<>
			<div className="parameter-container" style={{ display: "grid", gridTemplateColumns: getGridSpacing() }}>
				<div className="layer-type-selection">
					<DropdownMenu label="layer-type" items={layerTypes} setState={updateLayerType} state={layers[layerIndex].type} />
				</div>
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
							<input type="range" className="kernelSize" min="1" max="10" onChange={handleChange} value={getProp("kernelSize")} />
						</div>
						<div className="input-container">
							<div>filters</div>
							<input type="range" className="filters" min="1" max="10" onChange={handleChange} value={getProp("filters")} />
						</div>
						<div className="input-container">
							<div>strides</div>
							<input type="range" className="strides" min="1" max="10" onChange={handleChange} value={getProp("strides")} />
						</div>
					</>
				)}
				{(layers[layerIndex].type == "Dense" || layers[layerIndex].type == "Conv2D") && (
					<>
						<DropdownMenu setState={updateActivation} label={"activation"} items={activationList} state={getProp("activation")} />
						<DropdownMenu
							setState={updateRegularizer}
							label={"regularizer"}
							items={regularizerList}
							state={getProp("kernelRegularizer").regularizer}
						/>
						<DropdownMenu setState={updateLambda} label={"lambda"} items={lambdaList} state={getProp("kernelRegularizer").lambda} />
						<DropdownMenu
							label={"kernelInitializer"}
							items={kernelInitializerList}
							setState={updateInitializer}
							state={getProp("kernelInitializer")}
						/>
					</>
				)}
				{layers[layerIndex].type == "MaxPooling2D" && (
					<>
						<div className="input-container">
							<div>Pool Size</div>
							<input type="range" className="poolSize" min="1" max="10" onChange={handleMaxPoolChange} value={getProp("poolSize")[0]} />
						</div>
						<div className="input-container">
							<div>Strides</div>
							<input type="range" className="strides" min="1" max="10" onChange={handleMaxPoolChange} value={getProp("strides")[0]} />
						</div>
					</>
				)}
				{layers[layerIndex].type == "Flatten" && (
					<>
						<div>This layer flattens a two dimension input to a one dimension output</div>
					</>
				)}
			</div>
			<div>{JSON.stringify(layers[layerIndex])}</div>
		</>
	);
}

export default ParamaterForum;
