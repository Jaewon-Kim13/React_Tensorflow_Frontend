import React from "react";
import { MyLayer } from "../../scripts/NeuralScripts";

interface Props {
	layers: MyLayer[];
	setLayerIndex: any;
}

function NeuralNetwork({ layers, setLayerIndex }: Props) {
	const handleLayerOnClick = (index: number) => {
		setLayerIndex(index);
	};
	return (
		<>
			<div>
				{layers.map((layer, index) => (
					<div
						className="layer"
						onClick={() => {
							handleLayerOnClick(index);
						}}
					>{`Layer[${index}]`}</div>
				))}
			</div>
		</>
	);
}

export default NeuralNetwork;
