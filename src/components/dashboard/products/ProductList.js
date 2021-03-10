import { useState, useEffect } from "react";
import { BASE_URL, PRODUCTS_ENDPOINT } from "../../../constants/api";
import useAxios from "../../../hooks/useAxios";

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

	useEffect(() => {
		async function getAllProducts() {
			try {
				const response = await http.get(`${BASE_URL}${PRODUCTS_ENDPOINT}`);
				setProducts(response.data);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		getAllProducts();
	}, [http]);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>An error happened</div>;
	return (
		<>
			<ul>
				{products.map((product) => {
					return (
						<li key={product.id}>
							<h1>{product.title}</h1>
							<p>{product.description}</p>
						</li>
					);
				})}
			</ul>
		</>
	);
}
