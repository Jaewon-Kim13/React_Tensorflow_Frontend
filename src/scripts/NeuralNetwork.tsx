import { layers, regularizers, softmax } from "@tensorflow/tfjs";
const tensorflow = require("@tensorflow/tfjs-node");
import { Layer, InputLayer } from "./Interfaces";

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
	outputLayer: Layer;

	optimizer: Object;
	lossFunctions: any;

	isRegularized: boolean;
	hasCompiled: boolean;

	constructor(inputLayer: InputLayer, hiddenLayers: Layer[], outputLayer: Layer) {
		this.model = tensorflow.sequential();
		this.outputLayer = outputLayer;
		this.inputLayer = inputLayer;
		this.hiddenLayers = hiddenLayers;
		this.isRegularized = false;
		this.lambda = -1;
		//add more optimizer options here
		this.optimizer = { adam: tensorflow.train.adam(0.01), sgd: tensorflow.train.sgd() };
		//add more loss function options here
		this.lossFunctions = ["sigmoid", "softmax", "mean"];
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
		this.isRegularized = true;
	}

	removeRegularization() {
		this.inputLayer.kernelRegularizer = tensorflow.regularizers.l2(0);
		for (let i = 0; i < this.hiddenLayers.length; i++) {
			this.hiddenLayers[i].kernelRegularizer = tensorflow.regularizers.l2(0);
		}
		this.isRegularized = false;
	}

	compile() {
		this.hasCompiled = true;
		this.model.add(tensorflow.layers.dense(this.inputLayer));
		for (let i = 0; i < this.hiddenLayers.length; i++) {
			this.model.add(tensorflow.layers.dense(this.hiddenLayers[i]));
		}
		this.model.add(tensorflow.layers.dense(this.outputLayer));
		//change later: these opt and loss values are just for testing/protyping
		let opt = tensorflow.train.adam(0.01);
		let loss = tensorflow.losses.sparseCategoricalCrossentropy({ fromLogits: true });
		this.model.compile({ optimizer: opt, loss: loss });
	}

	fit(input: any, output: any, epochs: number) {
		let history: string[] = [];
		if (!this.hasCompiled) return "ERROR: HAS NOT COMIPLED";
		this.model.fit(input, output, {
			epochs: epochs,
			callbacks: {
				onEpochEnd: (epoch: any, log: { loss: any }) => history.push(`Epoch ${epoch}: loss = ${log.loss}`),
			},
		});

		return history;
	}

	//finish
	predict(X: any) {
		if (!this.hasCompiled) return "ERROR: HAS NOT COMIPLED";
		//fix later: add the ablility to run the addtional mapping
		let logits = this.model.predict(X);
		const f_X = tensorflow.softmax(logits);
		return f_X.print();
	}
}
