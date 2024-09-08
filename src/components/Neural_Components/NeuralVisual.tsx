import React, { ChangeEvent, useEffect, useState } from "react";
import { Layer } from "../../scripts/NeuralScripts";
import { layers, RotateWithOffset } from "@tensorflow/tfjs";
import DropdownMenu from "../DropdownMenu";

import "./css/NeuralVisual.css";
import Canvas from "../Canvas";
import { createHeatmap } from "../../scripts/D3Scripts";

interface Props {
	layers: Layer[];
	layerIndex: number;
	setLayerIndex: any;
	setLayers: any;
	untrainedWeights: any;
	trainedWeights: any;
}

function NeuralVisual({ layers, setLayerIndex, setLayers, layerIndex, trainedWeights, untrainedWeights }: Props) {
	const [modelList, setModelList] = useState<string[]>(["Error Fetching Models", "Test"]);
	const [modelName, setModelName] = useState<string>(modelList[0]);

	const [toggleWeights, setToggleWeights] = useState<boolean>(false);
	const [heatMap, setHeatMap] = useState<any>(null);

	const handleLayerChange = (index: number) => {
		setLayerIndex(index);
	};

	const denseBuilder = (layer: any) => {
		let divNum = layer.layer.units;
		let jsxArray = [];

		for (let i = 0; i < divNum; i++) {
			jsxArray.push(<div className="neuron">{`Unit: ${i}`}</div>);
		}

		return jsxArray;
	};

	const conv2DBulder = (layer: any) => {
		let divNum = layer.layer.filters;
		let jsxArray = [];

		for (let i = 0; i < divNum; i++) {
			jsxArray.push(<div className="neuron">{`Filter: ${i}`}</div>);
		}

		return jsxArray;
	};

	const handleLayerSize = (event: any) => {
		const copy = [...layers];
		if (event.target.className == "increase" && layers.length < 11) {
			copy.push({ type: "Flatten", layer: {} });
			setLayers(copy);
		} else if (event.target.className == "decrease" && layers.length > 1) {
			if (layerIndex > layers.length - 2) setLayerIndex(layerIndex - 1);
			copy.pop();
			setLayers(copy);
		}
	};

	useEffect(() => {
		const weightsToVisual = () => {
			const jsxArray = [];
			for (let i = 0; i < layers.length; i++) {
				if (layers[i].type == "Conv2D") {
					const temp: any = layers[i].layer;
					const rowSize = temp.kernelSize;
					let conv2d = (
						<>
							<div className="weights">
								<div className="conv2d-trained">
									{trainedWeights[i][0].map((curr: any, index: any) => {
										createHeatmap(curr, `trained-${i}-${index}`);
										return <div id={`trained-${i}-${index}`} />;
									})}
								</div>
							</div>
						</>
					);
					jsxArray.push(conv2d);
				} else if (layers[i].type == "Dense") {
					let dense = (
						<>
							<div className="weights">
								<div className="dense-trained">
									{trainedWeights[i][0].map((curr: any, index: any) => (
										<div className="dense-weight" key="index">
											{curr}
										</div>
									))}
								</div>
								<div className="dense-untrained"></div>
							</div>
						</>
					);
					jsxArray.push(dense);
				} else {
					jsxArray.push(<div className="weights">no wieght</div>);
				}
			}

			return jsxArray;
		};

		if (trainedWeights != null) {
			setHeatMap(weightsToVisual());
		}
	}, [trainedWeights, toggleWeights]);

	return (
		<>
			<div className="Network-container">
				<div className="layer-update">
					<div className="increment-layers">
						<button className="decrease" onClick={handleLayerSize}>
							-
						</button>
						Layers
						<button className="increase" onClick={handleLayerSize}>
							+
						</button>
					</div>
					{trainedWeights != null && (
						<div
							onClick={() => {
								setToggleWeights(!toggleWeights);
							}}
						>
							Veiw Weights
						</div>
					)}
				</div>
				{toggleWeights && trainedWeights != null && heatMap.map((curr: any, index: any) => curr)}
				<div className="Network">
					{layers.map((curr, index) => (
						<>
							<div className="layer" onClick={() => handleLayerChange(index)}>
								<div className="layer-title">{`${curr.type}`.padEnd(12, "x")}</div>
								<div key={index} className={curr.type}>
									{curr.type == "Dense" && denseBuilder(curr).map((curr) => curr)}
									{curr.type == "Conv2D" && conv2DBulder(curr).map((curr) => curr)}
								</div>
							</div>
						</>
					))}
				</div>
			</div>
		</>
	);
}
export default NeuralVisual;
