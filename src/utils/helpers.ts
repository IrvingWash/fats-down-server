export function ensureDefined<T>(value: T | undefined, message?: string): T {
	if (value === undefined) {
		throw new Error(message ?? 'Value is undefined');
	}

	return value;
}

export function todo(): never {
	throw new Error('Todo');
}
