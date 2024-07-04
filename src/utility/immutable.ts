
export const merge = <T>(state: T, stateChanges: Partial<T>): T =>{
	return { ...state, ...stateChanges };
};

export const mergeArray =<T>(state: T[], stateChanges: T[]): T[] => {
	return [...state, ...stateChanges];
};
