import React, { useState } from "react";
import Canvas from "../components/Canvas";
function NumberNetwork() {
	const [grid, setGrid] = useState<number[][]>([]);
	const rows = 20;

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
						<Canvas rows={rows} cols={rows} grid={grid} setGrid={setGrid} />
						<button
							onClick={() => {
								setGrid(Array.from({ length: rows }, () => Array.from({ length: rows }, () => 0)));
							}}
						>
							Clear
						</button>
						<button
							onClick={() => {
								/*CONVERT GRID TO 1D ARRAY*/
							}}
						>
							Check
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default NumberNetwork;
