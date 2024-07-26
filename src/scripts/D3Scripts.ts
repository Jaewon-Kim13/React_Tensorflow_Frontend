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
	d3.select(container).html("");
	// Check if data is in the expected format
	if (!data || !data.epoch || !data.history) {
		console.error("Data is not in the expected format");
		return;
	}

	const epochs = data.epoch;
	const history = data.history;

	const margin = { top: 40, right: 85, bottom: 50, left: 60 };
	let width = 0;
	let height = 0;

	const svg = d3
		.select(container)
		.append("svg")
		.style("width", "100%")
		.style("height", "auto")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 600 400");

	const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

	const x = d3.scaleLinear().domain([0, epochs.length - 1]);
	const y = d3.scaleLinear();

	const line = d3
		.line<Point>()
		.x((d) => x(d.x))
		.y((d) => y(d.y));

	const xAxis = g.append("g");
	const yAxis = g.append("g");

	const trainPath = g.append("path").attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 1.5);

	const valPath = g.append("path").attr("fill", "none").attr("stroke", "red").attr("stroke-width", 1.5);

	const title = g.append("text").attr("text-anchor", "middle").style("font-size", "16px");

	const legend = g.append("g").attr("font-family", "sans-serif").attr("font-size", 10).attr("text-anchor", "end");

	function updateGraph() {
		const containerWidth = parseInt(d3.select(container).style("width"), 10);
		width = containerWidth - margin.left - margin.right;
		height = Math.min(400, containerWidth * 0.67) - margin.top - margin.bottom;

		svg.attr("viewBox", `0 0 ${containerWidth} ${height + margin.top + margin.bottom}`);

		x.range([0, width]);
		y.range([height, 0]);

		if (type === "accuracy") {
			y.domain([0, 1]);
		} else {
			const maxLoss = Math.max(...history.loss, ...history.val_loss);
			y.domain([0, maxLoss]);
		}

		const trainData: Point[] = epochs.map((e: any, i: number) => ({
			x: i,
			y: type === "accuracy" ? history.acc[i] : history.loss[i],
		}));

		const valData: Point[] = epochs.map((e: any, i: number) => ({
			x: i,
			y: type === "accuracy" ? history.val_acc[i] : history.val_loss[i],
		}));

		trainPath.datum(trainData).attr("d", line);
		valPath.datum(valData).attr("d", line);

		xAxis.attr("transform", `translate(0,${height})`).call(
			d3
				.axisBottom(x)
				.ticks(Math.min(epochs.length, width / 50))
				.tickSizeOuter(0)
		);

		yAxis.call(d3.axisLeft(y));

		title
			.attr("x", width / 2)
			.attr("y", -margin.top / 2 + 10)
			.text(`${type.charAt(0).toUpperCase() + type.slice(1)} over Epochs`);

		legend
			.attr("transform", `translate(${width + 80},${height - 50})`)
			.selectAll("g")
			.data(["Train", "Validation"])
			.join("g")
			.attr("transform", (d, i) => `translate(0,${i * 25})`)
			.call((g) =>
				g
					.append("rect")
					.attr("x", -19)
					.attr("width", 19)
					.attr("height", 19)
					.attr("fill", (d, i) => (i === 0 ? "steelblue" : "red"))
			)
			.call((g) =>
				g
					.append("text")
					.attr("x", -24)
					.attr("y", 9.5)
					.attr("dy", "0.32em")
					.text((d) => d)
			);
	}

	updateGraph();

	window.addEventListener("resize", updateGraph);

	// Return a function to remove the event listener when the component unmounts
	return () => {
		window.removeEventListener("resize", updateGraph);
	};
}
