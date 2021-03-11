import { Link } from "react-router-dom";
import Heading from "../../layout/Heading";
import DashboardPage from "../DashboardPage";
import ProductList from "../products/ProductList";

export default function ProductsPage() {
	return (
		<DashboardPage>
			<Heading size='3' content='Products' />
			<Link to='/dashboard/products/add'>ADD NEW PRODUCT</Link>
			<ProductList />
		</DashboardPage>
	);
}
