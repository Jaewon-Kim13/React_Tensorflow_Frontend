import * as tf from "@tensorflow/tfjs";

/*This file contains a set of interfaces, constants, and functions
  that are useful for mainpulating the tensorflow api for my react app

  Below is an example of a tensorflow neural network:
  //Look up tf.layers.dense on Tensorflow.js documentation
/*const model_s = tf.sequential({
  layers: [
    tf.layers.dense({ units: 6, activation: 'relu', name: 'L1', regulaizer: REG_FN }),
    tf.layers.dense({ units: 6, activation: 'linear', name: 'L3', regulaizer: REG_FN })
  ],
  name: 'Simple'
});

model_s.compile({
  loss: 'sparseCategoricalCrossentropy',
  optimizer: tf.train.adam(0.01),
  from_logits: true
});

const model_predict_s = (Xl) => {
  return tf.tidy(() => {
    const predictions = model_s.predict(Xl);
    const softmaxPreds = tf.softmax(predictions);
    return softmaxPreds.argMax(1).dataSync();
  });
}; */

/*
also note:
Adam uses a moving average of the parameters, which means that it can take longer to converge than other optimizers. This may not be a problem for many problems, but for tasks with a large number of parameters or very small data sets, Adam may be too slow.
Adam is sensitive to the scale of the gradients, so it is important to scale your data before training a model with Adam. If the scale of the gradients is not well-tuned, Adam may have trouble converging.
Adam can also be sensitive to the choice of hyperparameters. It is important to tune the learning rate and other hyperparameters carefully to ensure good performance.
So, there is no one-size-fits-all optimizer that works best for every problem, and Adam is no exception.
*/

export interface DenseLayer {
	activation: string;
	units: number;
	kernelRegularizer: { funct: string; lambda: number } | any;
}
export interface Conv2DLayer {
	kernelSize: number; //window size, so if 5, then the window is 5x5
	filters: number; //the number of kernelSize windows that is applied to the data
	strides: number; //the step size of window!
	activation: string;
	kernelRegularizer: { regularizer: string; lambda: number } | any;
	kernelInitializer: string;
}

export interface MaxPooling2D {
	poolSize: number[];
	strides: number[];
}

export interface Flatten{}

export interface Layer {
	type: string;
	layer: DenseLayer | Conv2DLayer | MaxPooling2D | Flatten //adding any to call properties without errors
}

//shared constants and functions
export const activationList = [
	"elu",
	"hardSigmoid",
	"linear",
	"relu",
	"relu6",
	"selu",
	"sigmoid",
	"softmax",
	"softplus",
	"softsign",
	"tanh",
	"swish",
	"mish",
	"gelu",
	"gelu_new",
];
export const regularizerList = ["l1", "l2", "l1l2"];
export const lambdaList = [0.0, 0.001, 0.01, 0.05, 0.1, 0.2, 0.3];

export function updateLayer(layer: DenseLayer | Conv2DLayer, prop: string, value: any) {
	const copy = { ...layer };
	copy[prop as keyof (DenseLayer | Conv2DLayer)] = value;
	return copy;
}

export function convertLayer(layer: DenseLayer | Conv2DLayer) {
	const copy: any = { ...layer };
	copy.kernelRegularizer = regularizerToFunction(layer.kernelRegularizer);
	copy.kernelInitializer = "varianceScaling"; //how the intial weights are distributed
	return copy;
}

export function regularizerToFunction(reg: { regularizer: string; lambda: number }) {
	let regularizerFunction;
	switch (reg.regularizer) {
		case "l1":
			regularizerFunction = tf.regularizers.l1({ l1: reg.lambda });
			break;
		case "l2":
			regularizerFunction = tf.regularizers.l2({ l2: reg.lambda });
			break;
		case "l1l2":
			regularizerFunction = tf.regularizers.l1l2({ l1: reg.lambda, l2: reg.lambda });
			break;
	}

	return regularizerFunction;
}

export const defaultModel: Layer[] = [
	{
		type: "Conv2D",
		layer:{
			kernelSize: 5,
			filters: 8,
			strides: 1,
			activation: 'relu',
			kernelInitializer: 'varianceScaling',
			kernelRegularizer: { regularizer: "l1", lambda: 0}
		}
	},
	{
		type: "MaxPooling2D",
		layer:{
			poolSize: [2, 2],
			strides: [2, 2]
		}
	},
	{
		type: "Conv2D",
		layer:{
			kernelSize: 5,
			filters: 8,
			strides: 1,
			activation: 'relu',
			kernelInitializer: 'varianceScaling',
			kernelRegularizer: { regularizer: "l1", lambda: 0}
		}
	},
	{
		type: "MaxPooling2D",
		layer:{
			poolSize: [2, 2],
			strides: [2, 2]
		}
	},
	{
		type: "Flatten",
		layer:{}
	},
	{
		type: "Dense", 
		layer:{
			activation: "softmax", 
			units:10, 
			kernelInitializer: "varianceScaling", 
			kernelRegularizer: { regularizer: "l1", lambda: 0}
		}
	}
]
