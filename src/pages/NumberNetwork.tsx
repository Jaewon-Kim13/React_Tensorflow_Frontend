import React from "react";
import Canvas from "../components/Canvas";
function NumberNetwork() {
	return (
		<>
			<div className="neural-container">
				<div className="parameter-network-container">
					<div className="parameter-container">Parameters</div>
					<div className="network-container">Network</div>
				</div>
				<div className="input-visual-container">
					<div className="input-container"></div>
					<div className="visual-container">
						Visualize
						<Canvas rows={20} cols={20} />
					</div>
				</div>
			</div>
		</>
	);
}

export default NumberNetwork;
