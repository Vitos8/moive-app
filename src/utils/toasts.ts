import {toast} from 'react-toastify'

export const onError = (error:string) => toast.error(error, {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true, 
	pauseOnHover: true,
	draggable: true,
	theme: "colored",
});

export const onSucces = (msg:string) => toast.success("🦄  "+ msg, {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: "light",
});

export const onSuccesFavourite = (msg:string) => toast.success("🦄  "+ msg, {
	position: "top-center",
	autoClose: 1000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: "light",
});


export const onAddToFavourite = (msg:string) =>  toast.info('🦄 Wow so easy!', {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "colored",
});