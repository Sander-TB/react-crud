import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import DashboardPage from "../DashboardPage";
import Heading from "../../layout/Heading";
import useAxios from "../../../hooks/useAxios";
import { BASE_URL, PRODUCTS_ENDPOINT } from "../../../constants/api";
import { productSchema } from "../../../schemas/productSchema";
import DeleteProductButton from "./DeleteProductButton";

export default function EditProduct() {
	const [product, setProduct] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [fetchingProduct, setFetchingProduct] = useState(true);
	const [updatingProduct, setUpdatingProduct] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	const [updateError, setUpdateError] = useState(null);

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(productSchema),
	});

	const http = useAxios();
	const { id } = useParams();
	const url = `${BASE_URL}${PRODUCTS_ENDPOINT}/${id}`;

	useEffect(() => {
		async function getProduct() {
			try {
				const response = await http.get(url);
				setProduct(response.data);
			} catch (error) {
				setFetchError(error.toString());
			} finally {
				setFetchingProduct(false);
			}
		}
		getProduct();
	}, [http, url]);

	async function onSubmit(data) {
		setUpdatingProduct(true);
		setUpdateError(null);
		setUpdated(false);

		try {
			const response = await http.put(url, data);
			console.log(response.data);
			setUpdated(true);
		} catch (error) {
			setUpdateError(error.toString());
		} finally {
			setUpdatingProduct(false);
		}
	}

	if (fetchingProduct) return <div>Loading...</div>;

	if (fetchError) return <div>Error loading product</div>;

	return (
		<DashboardPage>
			<Heading content='Edit Product' />
			<h3>{product.title}</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				{updated && <div className='success'>The product was updated</div>}

				{updateError && <FormError>{updateError}</FormError>}
				<div>
					<img src={product.image_url} width='100%' alt={product.title} />
				</div>
				<fieldset disabled={updatingProduct}>
					<div className='product-row'>
						<label>Title</label>
						<input
							name='title'
							defaultValue={product.title}
							placeholder='Title'
							ref={register}
						/>
						{errors.title && <FormError>{errors.title}</FormError>}
					</div>

					<div className='product-row'>
						<label>Price</label>
						<input
							name='price'
							defaultValue={product.price}
							placeholder='Price'
							ref={register}
						/>
						{errors.price && <FormError>{errors.price}</FormError>}
					</div>

					<div className='product-row'>
						<label>Description</label>
						<input
							name='description'
							defaultValue={product.description}
							placeholder='Description'
							ref={register}
						/>
						{errors.description && <FormError>{errors.description}</FormError>}
					</div>

					<div className='product-row'>
						<label>Image URL</label>
						<input
							name='image_url'
							defaultValue={product.image_url}
							placeholder='Image url'
							ref={register}
						/>
						{errors.image_url && <FormError>{errors.image_url}</FormError>}
					</div>

					<button>Update</button>
					<hr />
					<DeleteProductButton id={product.id} title={product.title} />
				</fieldset>
			</form>
		</DashboardPage>
	);
}
