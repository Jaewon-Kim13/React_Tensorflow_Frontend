//NOTE I USED CHATGPT I DID NOT CODE THIS MYSELF!!! RECODE BEFORE FINAL COMMIT!
//NEED TO LEARN useEffect and useRef
//change toggle to not change already highlighted cells

import React, { useState, useRef, useEffect } from "react";
import "./Canvas.css";

interface Props {
	rows: number;
	cols: number;
	setGrid: any;
	grid: any;
}

function Canvas({ rows, cols, grid, setGrid }: Props) {
	// State to hold the grid data, which is a 2D array of numbers (0 or 1)
	// State to track if the mouse is being dragged
	const [isDragging, setIsDragging] = useState<boolean>(false);
	// Ref to the grid container element
	const gridRef = useRef<HTMLDivElement>(null);
	// Initialize the grid when the component mounts or when rows/cols change
	useEffect(() => {
		const initialGrid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
		setGrid(initialGrid);

		// Function to handle mouse up event to stop dragging
		const handleMouseUp = () => {
			setIsDragging(false);
		};

		// Add event listener for mouse up on the document
		document.addEventListener("mouseup", handleMouseUp);

		// Clean up the event listener when the component unmounts or rows/cols change
		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [rows, cols]);

	// Handle mouse down event on a cell
	const handleMouseDown = (row: number, col: number) => {
		setIsDragging(true); // Start dragging
		toggleCell(row, col); // Toggle the clicked cell
	};

	// Handle mouse enter event on a cell (during dragging)
	const handleMouseEnter = (row: number, col: number) => {
		if (isDragging) {
			toggleCell(row, col); // Toggle the cell if dragging
		}
	};

	// Toggle the state of a cell at (row, col)
	//rewrite this function to only change cells that equal 0
	const toggleCell = (row: number, col: number) => {
		setGrid((prevGrid: any[]) => {
			const newGrid = prevGrid.map((r: any[], rowIndex: number) =>
				r.map((cell: number, colIndex: number) => (rowIndex === row && colIndex === col ? (cell === 0 ? 1 : 0) : cell))
			);
			return newGrid;
		});
	};

	return (
		<>
			<div className="grid" ref={gridRef}>
				{grid.map((row: any[], rowIndex: number) => (
					<div className="row" key={rowIndex}>
						{row.map((cell: number, colIndex: number) => (
							<div
								className={`cell ${cell === 1 ? "highlighted" : ""}`}
								key={colIndex}
								onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
								onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
							></div>
						))}
					</div>
				))}
			</div>
		</>
	);
}

export default Canvas;
