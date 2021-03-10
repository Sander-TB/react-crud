import { Link } from "react-router-dom";
import Heading from "../layout/Heading";

export default function DashboardPage({ children }) {
	return (
		<>
			<Heading content='Dashboard' />
			<nav>
				Sections: <Link to='/dashboard/products'>Products</Link>
			</nav>
			{children ? children : <p>Please select a page</p>}
		</>
	);
}
