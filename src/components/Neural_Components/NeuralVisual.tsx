import React, { ChangeEvent } from "react";
import { Layer } from "../../scripts/NeuralScripts";

interface Props {
	layers: Layer[];
	setLayerIndex: any;
}

function NeuralVisual({ layers, setLayerIndex }: Props) {
	const handleLayerChange = (index: number) => {
		setLayerIndex(index);
	};
	return (
		<>
			{layers.map((curr, index) => (
				<div onClick={() => handleLayerChange(index)} key={index}>
					{`Layer[${index}]:`}
				</div>
			))}
		</>
	);
}

export default NeuralVisual;
