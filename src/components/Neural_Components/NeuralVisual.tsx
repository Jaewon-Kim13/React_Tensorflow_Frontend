import React, { ChangeEvent } from "react";
import { Layer } from "../../scripts/NeuralScripts";
import { RotateWithOffset } from "@tensorflow/tfjs";
import "./NeuralVisual.css";

interface Props {
	layers: Layer[];
	setLayerIndex: any;
}

function NeuralVisual({ layers, setLayerIndex }: Props) {
	const handleLayerChange = (index: number) => {
		setLayerIndex(index);
	};

	const denseBuilder = (layer: any) => {
		let divNum = layer.layer.units;
		let jsxArray = [];

		for (let i = 0; i < divNum; i++) {
			jsxArray.push(<div>{`Unit: ${i}`}</div>);
		}

		return jsxArray;
	};

	const conv2DBulder = (layer: any) => {
		let divNum = layer.layer.filters;
		let jsxArray = [];

		for (let i = 0; i < divNum; i++) {
			jsxArray.push(<div>{`Filter: ${i}`}</div>);
		}

		return jsxArray;
	};

	const getGridSpacing = () => {
		let num: number = layers.length;
		let temp: string = "";
		let size: number = 100 / num;
		for (let i = 0; i < num; i++) {
			temp += size + "% ";
		}
		return temp;
	};

	return (
		<>
			<div className="Network" style={{ display: "grid", gridTemplateColumns: getGridSpacing() }}>
				{layers.map((curr, index) => (
					<div onClick={() => handleLayerChange(index)} key={index} className="layer">
						<div>{`Layer Type: ${curr.type}`}</div>
						{curr.type == "Dense" && denseBuilder(curr).map((curr) => curr)}
						{curr.type == "Conv2D" && conv2DBulder(curr).map((curr) => curr)}
						{curr.type == "Flatten" && <div>Flatten Layer</div>}
						{curr.type == "MaxPooling2D" && <div>MaxPooling2D Layer</div>}
					</div>
				))}
			</div>
		</>
	);
}

export default NeuralVisual;
