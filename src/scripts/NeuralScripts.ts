import * as tf from "@tensorflow/tfjs";

/*This file contains a set of interfaces, constants, and functions
  that are useful for mainpulating the tensorflow api for my react app

  Below is an example of a tensorflow neural network:
  //Look up tf.layers.dense on Tensorflow.js documentation
/*const model_s = tf.sequential({
  layers: [
    tf.layers.dense({ units: 6, activation: 'relu', name: 'L1', regulaizer: REGFN }),
    tf.layers.dense({ units: 6, activation: 'linear', name: 'L3', regulaizer: REGFN })
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

//Interfaces
export interface Layer {
	name?: string;
	activation: string;
	units: number;
	kernelRegularizer: any;
}

export interface InputLayer {
	activation: string;
	units: number;
	kernelRegularizer: any;
	shape: any;
}

//useful constants
export const lossList = [
	"meanSquaredError",
	"meanAbsoluteError",
	"meanAbsolutePercentageError",
	"meanSquaredLogarithmicError",
	"squaredHinge",
	"hinge",
	"categoricalHinge",
	"logcosh",
	"categoricalCrossentropy",
	"sparseCategoricalCrossentropy",
	"binaryCrossentropy",
	"kullbackLeiblerDivergence",
	"poisson",
	"cosineProximity",
];
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

export const regularizerList = ["l1","l2", "l1l2"]

export const lambdaList = [0.0, 0.001, 0.01, 0.05, 0.1, 0.2, 0.3]

//functions
export function regularizerToFunction(regularizer: string, value: number) {
	let regularizerFunction;
	switch (regularizer) {
		case "l1":
			regularizerFunction = tf.regularizers.l1({l1:value});
			break;
		case "l2":
			regularizerFunction = tf.regularizers.l2({l2:value});
			break;
		case "l1l2":
			regularizerFunction = tf.regularizers.l1l2({l1: value, l2:value});
			break;
	}

	return regularizerFunction
}


export function updateLayer(layer: Layer|InputLayer, ){

}