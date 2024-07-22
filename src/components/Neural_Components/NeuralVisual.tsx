import React, { ChangeEvent } from "react";
import { Layer } from "../../scripts/NeuralScripts";
import { RotateWithOffset } from "@tensorflow/tfjs";
import "./NeuralVisual.css";

interface Props {
	layers: Layer[];
	layerIndex: number;
	setLayerIndex: any;
	setLayers: any;
}

function NeuralVisual({ layers, setLayerIndex, setLayers, layerIndex }: Props) {
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

	return (
		<>
			<div className="Network-container">
				<div className="layer-update">
					<button className="decrease" onClick={handleLayerSize}>
						-
					</button>
					Layers
					<button className="increase" onClick={handleLayerSize}>
						+
					</button>
				</div>
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
