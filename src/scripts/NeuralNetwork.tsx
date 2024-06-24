import { layers, regularizers, softmax } from "@tensorflow/tfjs";
const tensorflow = require("@tensorflow/tfjs-node");

/*
Note:
-need to add normalization
-need to test
*/
export default class NerualNetwork {
	lambda: number;
	model: any;
	inputLayer: InputLayer;
	hiddenLayers: Layer[];
	isRegularized: boolean;
	outputLayer: Layer;
	optimizer: any;
	lossFunction: any;
	hasCompiled: boolean;

	constructor(inputLayer: InputLayer, hiddenLayers: Layer[], outputLayer: Layer) {
		this.model = tensorflow.sequential();
		this.outputLayer = outputLayer;
		this.inputLayer = inputLayer;
		this.hiddenLayers = hiddenLayers;
		this.isRegularized = false;
		this.lambda = -1;
		this.optimizer = tensorflow.train.adam(1);
		this.lossFunction = "categoricalCrossentropy";
		this.hasCompiled = false;
	}

	addLayers(x: number) {
		for (let i = 0; i < x; i++) {
			this.hiddenLayers.push(structuredClone(this.hiddenLayers[this.hiddenLayers.length - 1]));
		}
	}

	addRegularization(lambda: number) {
		this.inputLayer.kernelRegularizer = tensorflow.regularizers.l2(lambda);
		for (let i = 0; i < this.hiddenLayers.length; i++) {
			this.hiddenLayers[i].kernelRegularizer = tensorflow.regularizers.l2(lambda);
		}
	}

	removeRegularization() {
		this.inputLayer.kernelRegularizer = null;
		for (let i = 0; i < this.hiddenLayers.length; i++) {
			this.hiddenLayers[i].kernelRegularizer = null;
		}
	}

	compile(input: any, output: any, epochs: number) {
		let histroy: string[] = [];
		this.model.add(tensorflow.layers.dense(this.inputLayer));
		for (let i = 0; i < this.hiddenLayers.length; i++) {
			this.model.add(tensorflow.layers.dense(this.hiddenLayers[i]));
		}
		//edit its wrong look in ml notes: A.L.A. wk2 multi classification
		if (this.outputLayer.activation == "softmax") {
			let linear = structuredClone(this.outputLayer);
			linear.activation = "linear";
			this.model.add(tensorflow.layers.dense(linear));
		}
		this.model.add(tensorflow.layers.dense(this.outputLayer));

		this.model.compile({ optimizer: this.optimizer, loss: this.lossFunction });

		this.model.fit(input, output, {
			epochs: epochs,
			callbacks: {
				onEpochEnd: (epoch: any, log: { loss: any }) => histroy.push(`Epoch ${epoch}: loss = ${log.loss}`),
			},
		});
	}

	//finish
	predict() {
		if (!this.hasCompiled) return "ERROR: HAS NOT COMIPLED";
		//this.model.predict
	}
}

export interface Layer {
	name: string;
	activation: string;
	units: number;
	kernelRegularizer?: any;
}

export interface InputLayer {
	activation: string;
	units: number;
	kernelRegularizer?: any;
	shape: any;
}
