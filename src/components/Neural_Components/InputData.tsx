import React, { useState } from "react";
import Canvas from "../Canvas";

export default function InputData() {
	const [grid, setGrid] = useState<number[][]>(Array.from({ length: 28 }, () => Array.from({ length: 28 }, () => 0)));
	const [toggleValues, setToggleVaues] = useState<boolean>(false);
	return (
		<>
			<Canvas rows={28} cols={28} grid={grid} setGrid={setGrid} drawable={true} showValues={toggleValues} />
			<button
				onClick={() => {
					setGrid(Array.from({ length: 28 }, () => Array.from({ length: 28 }, () => 0)));
				}}
			>
				Clear
			</button>
			<button
				onClick={() => {
					setToggleVaues(!toggleValues);
				}}
			>
				Show Values
			</button>
			<div>GRID</div>
			<div>POG {grid.toString()} ERS</div>
			<div>GRID END</div>
		</>
	);
}
