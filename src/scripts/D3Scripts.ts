import * as d3 from "d3";

export interface HistoryData {
	epoch: number[];
	history: {
		val_loss: number[];
		val_acc: number[];
		loss: number[];
		acc: number[];
	};
}

interface Point {
	x: number;
	y: number;
}

export function createLineGraph(data: any, container: string, type: "accuracy" | "loss") {
	// Check if data is in the expected format
	if (!data || !data.epoch || !data.history) {
		console.error("Data is not in the expected format");
		return;
	}

	const epochs = data.epoch;
	const history = data.history;

	const margin = { top: 20, right: 20, bottom: 30, left: 50 };
	const width = 600 - margin.left - margin.right;
	const height = 400 - margin.top - margin.bottom;

	const svg = d3
		.select(container)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	const x = d3
		.scaleLinear()
		.domain([0, epochs.length - 1])
		.range([0, width]);

	const y = d3.scaleLinear().range([height, 0]);

	if (type === "accuracy") {
		y.domain([0, 1]);
	} else {
		const maxLoss = Math.max(...history.loss, ...history.val_loss);
		y.domain([0, maxLoss]);
	}

	const line = d3
		.line<Point>()
		.x((d) => x(d.x))
		.y((d) => y(d.y));

	const trainData: Point[] = epochs.map((e: any, i: string | number) => ({
		x: i,
		y: type === "accuracy" ? history.acc[i] : history.loss[i],
	}));

	const valData: Point[] = epochs.map((e: any, i: string | number) => ({
		x: i,
		y: type === "accuracy" ? history.val_acc[i] : history.val_loss[i],
	}));

	svg.append("path").datum(trainData).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 1.5).attr("d", line);

	svg.append("path").datum(valData).attr("fill", "none").attr("stroke", "red").attr("stroke-width", 1.5).attr("d", line);

	svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(epochs.length));

	svg.append("g").call(d3.axisLeft(y));

	svg
		.append("text")
		.attr("x", width / 2)
		.attr("y", 0 - margin.top / 2)
		.attr("text-anchor", "middle")
		.style("font-size", "16px")
		.text(`${type.charAt(0).toUpperCase() + type.slice(1)} over Epochs`);

	const legend = svg
		.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.attr("text-anchor", "end")
		.selectAll("g")
		.data(["Train", "Validation"])
		.enter()
		.append("g")
		.attr("transform", (d, i) => `translate(0,${i * 20})`);

	legend
		.append("rect")
		.attr("x", width - 19)
		.attr("width", 19)
		.attr("height", 19)
		.attr("fill", (d, i) => (i === 0 ? "steelblue" : "red"));

	legend
		.append("text")
		.attr("x", width - 24)
		.attr("y", 9.5)
		.attr("dy", "0.32em")
		.text((d) => d);
}
