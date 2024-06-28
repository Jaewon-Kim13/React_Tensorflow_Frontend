//Interfaces for
export interface Layer {
	name: string;
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
