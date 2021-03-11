import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import Heading from "../../layout/Heading";
import DashboardPage from "../DashboardPage";
import { BASE_URL, PRODUCTS_ENDPOINT } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";
import { productSchema } from "../../../schemas/productSchema";

export default function AddProducts() {
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	const history = useHistory();
	const http = useAxios();

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(productSchema),
	});

	const url = `${BASE_URL}${PRODUCTS_ENDPOINT}`;

	async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);

		try {
			const response = await http.post(url, data);
			console.log(response);
			history.push("/dashboard/products");
		} catch (err) {
			serverError(err.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<DashboardPage>
			<Heading content='Add product' />
			<form onSubmit={handleSubmit(onSubmit)}>
				{serverError && <FormError>{serverError}</FormError>}
				<fieldset disabled={submitting}>
					<div className='product-row'>
						<label>Title</label>
						<input name='title' placeholder='Title' ref={register} />
						{errors.title && <FormError>{errors.title}</FormError>}
					</div>

					<div className='product-row'>
						<label>Price</label>
						<input name='price' placeholder='Price' ref={register} />
						{errors.price && <FormError>{errors.price}</FormError>}
					</div>

					<div className='product-row'>
						<label>Description</label>
						<input
							name='description'
							placeholder='Description'
							ref={register}
						/>
						{errors.description && <FormError>{errors.description}</FormError>}
					</div>

					<div className='product-row'>
						<label>Image URL</label>
						<input name='image_url' placeholder='Image url' ref={register} />
						{errors.image_url && <FormError>{errors.image_url}</FormError>}
					</div>

					<button>{submitting ? "Submitting..." : "Submit"}</button>
				</fieldset>
			</form>
		</DashboardPage>
	);
}
