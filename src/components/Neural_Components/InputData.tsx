import React, { useState } from "react";
import Canvas from "../Canvas";

interface Props {
	dataSetName: string;
	dataJSON: any;
	setInput: any;
}

export default function InputData({ dataSetName, setInput, dataJSON }: Props) {
	const [rows, setRows] = useState<number>(28);
	const [grid, setGrid] = useState<number[][]>(
		Array.from({ length: rows }, () => Array.from({ length: rows }, () => 0))
	);

	const updateGridInput = () => {
		setInput(grid.flat());
	};

	//Sets Input in the form [x[],y]
	const fetchRandomNumberData = () => {
		try {
			let randIndex = Math.floor(Math.random() * 9999 + 1);
			let x = dataJSON.data.x[randIndex];
			let y = dataJSON.data.y[randIndex];
			let newGrid = arrayToMatrix(rows, [...x]);
			console.log(newGrid, y);
			setInput([x, y]);
			setGrid(newGrid);
		} catch (error) {
			console.log("Error fetching input data");
		}
	};

	const arrayToMatrix = (rowLen: number, array: any[]) => {
		let matrix: any[][] = [[]];
		while (array.length) matrix.push(array.splice(0, rowLen));
		return matrix;
	};

	return (
		<>
			{dataSetName == "numbers" && (
				<>
					<Canvas rows={rows} cols={rows} grid={grid} setGrid={setGrid} />
					<button onClick={updateGridInput}>Submit</button>
					<button onClick={fetchRandomNumberData}>Get random number</button>
					<button
						onClick={() => {
							setGrid(Array.from({ length: rows }, () => Array.from({ length: rows }, () => 0)));
						}}
					>
						Clear
					</button>
					<div>GRID</div>
					<div>POG {grid.toString()} ERS</div>
					<div>GRID END</div>
				</>
			)}
		</>
	);
}
