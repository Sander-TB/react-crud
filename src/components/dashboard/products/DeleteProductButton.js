import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { BASE_URL, PRODUCTS_ENDPOINT } from "../../../constants/api";

export default function DeleteProductButton({ id, title }) {
	const [error, setError] = useState(null);

	const http = useAxios();
	const history = useHistory();

	const url = `${BASE_URL}${PRODUCTS_ENDPOINT}/${id}`;

	async function handleDelete() {
		const confirmDelete = window.confirm(
			`Are you sure you want to delete this product: ${title}?`
		);
		if (confirmDelete) {
			try {
				await http.delete(url);
				history.push("/dashboard/products");
			} catch (error) {
				setError(error);
			}
		}
	}
	return (
		<button type='button' onClick={handleDelete}>
			{error ? "Error" : "DELETE PRODUCT"}
		</button>
	);
}
DeleteProductButton.propTypes = {
	id: PropTypes.number.isRequired,
};
