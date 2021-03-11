import * as yup from "yup";

export const productSchema = yup.object().shape({
	title: yup.string().required("Please enter a name"),
	price: yup.number().required("Please enter a valid price"),
	description: yup.string().required("Please provide a description"),
	image_url: yup.string().required("Please provide an image url"),
});
