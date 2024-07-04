const hexToR=(h:string)=> {return parseInt((cutHex(h)).substring(0,2),16);};
const hexToG=(h:string) => {return parseInt((cutHex(h)).substring(2,4),16);};
const hexToB=(h:string) => {return parseInt((cutHex(h)).substring(4,6),16);};
const cutHex=(h:string) => {return (h.charAt(0) === "#") ? h.substring(1,7):h;};
export const getColorContrast=(hex?:string)=>{
	if(!hex) {
		return "dark";
	}
	const threshold = 130;
	const hRed = hexToR(hex);
	const hGreen = hexToG(hex);
	const hBlue = hexToB(hex);
   
	const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
	if (cBrightness > threshold){
		return "dark";
	} else { 
		return "light";
	}	
};