import Heading from "../../layout/Heading";
import DashboardPage from "../DashboardPage";
import ProductList from "../products/ProductList";

export default function ProductsPage() {
	return (
		<DashboardPage>
			<Heading size='3' content='Products' />
			<ProductList />
		</DashboardPage>
	);
}
