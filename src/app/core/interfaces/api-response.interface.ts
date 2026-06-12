export interface ApiResponse<T> {
	meta: Meta;
	data: T;
}

export interface Meta {
	transactionID: string;
	status: string;
	statusCode: number;
	timestamp: string;
	message: string;
}
