import {useState, useEffect } from "react";

const addBodyClass = (className: string) => document.body.classList.add(className);
const removeBodyClass = (className: string) => document.body.classList.remove(className);

const useBodyClass = (className: string | string[]) : void => {
	useEffect(
		() => {
			// Set up
			Array.isArray(className) ? className.map(addBodyClass) : addBodyClass(className);

			// Clean up
			return () => {
				Array.isArray(className) ? className.map(removeBodyClass) : removeBodyClass(className);
			};
		},
		[className]
	);
};

export default useBodyClass;