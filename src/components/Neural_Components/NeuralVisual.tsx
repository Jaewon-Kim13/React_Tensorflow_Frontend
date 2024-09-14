import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Layer } from "../../scripts/NeuralScripts";
import { layers, RotateWithOffset } from "@tensorflow/tfjs";
import DropdownMenu from "../DropdownMenu";

import "./css/NeuralVisual.css";
import Canvas from "../Canvas";
import { createHeatmap } from "../../scripts/D3Scripts";
import Popup from "../Popup";
import useForceUpdate from "../../hooks/ForceUpdate";

interface Props {
	layers: Layer[];
	layerIndex: number;
	setLayerIndex: any;
	setLayers: any;
	untrainedWeights: any;
	trainedWeights: any;
}

function NeuralVisual({ layers, setLayerIndex, setLayers, layerIndex, trainedWeights }: Props) {
	const [modelList, setModelList] = useState<string[]>(["Error Fetching Models", "Test"]);
	const [modelName, setModelName] = useState<string>(modelList[0]);

	const [heatMapIndex, setHeatMapIndex] = useState<number[]>();
	const [toggleWeights, setToggleWeights] = useState<boolean>(false);
	const [heatMap, setHeatMap] = useState<any>(null);

	const handleLayerChange = (index: number) => {
		setLayerIndex(index);
	};

	const denseBuilder = (layer: any, index: any) => {
		let divNum = layer.layer.units;
		let jsxArray = [];

		for (let i = 0; i < divNum; i++) {
			jsxArray.push(
				<div
					className="neuron"
					key={i.toString()}
					onClick={() => {
						setHeatMapIndex([index, i]);
						setToggleWeights(!toggleWeights);
					}}
				>{`Unit: ${i}`}</div>
			);
		}

		return jsxArray;
	};

	const conv2DBulder = (layer: any, index: any) => {
		let divNum = layer.layer.filters;
		let jsxArray = [];

		for (let i = 0; i < divNum; i++) {
			jsxArray.push(<div className="neuron" id={`${index},${i}`} onClick={handleNeuron}>{`Filter: ${i}`}</div>);
		}

		return jsxArray;
	};

	const handleNeuron = (event: React.MouseEvent<HTMLDivElement>) => {
		const arr = event.currentTarget.id.split(",").map((curr) => Number(curr));

		console.log("ID: " + arr);
		if (trainedWeights != null) setToggleWeights(true);
		setHeatMapIndex(() => {
			return arr;
		});
		console.log(`Clicked: ${arr} Showing: [${heatMapIndex}] toggle: ${!toggleWeights}`);
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
		const fetchHeatMap = async () => {
			try {
				if (heatMapIndex === undefined) return null;
				await createHeatmap(trainedWeights[heatMapIndex[0]][0][heatMapIndex[1]], "weights");
			} catch (error) {
				console.error(error);
			}
		};
		fetchHeatMap();
	}, [heatMapIndex]);

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
					{trainedWeights != null && toggleWeights && heatMapIndex != undefined && (
						<>
							<Popup state={toggleWeights} setState={setToggleWeights}>
								<div id="weights">{heatMapIndex}</div>
							</Popup>
						</>
					)}
				</div>
				<div className="Network">
					{layers.map((curr, index) => (
						<>
							<div className="layer" onClick={() => handleLayerChange(index)}>
								<div className="layer-title">{`${curr.type}`.padEnd(12, "x")}</div>
								<div key={index + "z"} className={curr.type}>
									{curr.type == "Dense" && denseBuilder(curr, index).map((curr) => curr)}
									{curr.type == "Conv2D" && conv2DBulder(curr, index).map((curr) => curr)}
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
