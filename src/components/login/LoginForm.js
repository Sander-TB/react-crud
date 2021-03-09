import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "../../constants/api";
import FormError from "../common/FormError";

const url = `${BASE_URL}/auth/local`;

const schema = yup.object().shape({
	identifier: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);
	const [, setAuth] = useContext(AuthContext);

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);
		try {
			const response = await axios.post(url, data);
			setAuth(response.data);
		} catch (error) {
			setLoginError(error.toString());
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{loginError && <FormError>{loginError}</FormError>}
				<fieldset disabled={submitting}>
					<div>
						<input name='identifier' placeholder='Username' ref={register} />
						{errors.identifier && (
							<FormError>{errors.identifier.message}</FormError>
						)}
					</div>

					<div>
						<input
							name='password'
							placeholder='Password'
							ref={register}
							type='password'
						/>
						{errors.password && (
							<FormError>{errors.password.message}</FormError>
						)}
					</div>
					<button>{submitting ? "Logging in..." : "Login"}</button>
				</fieldset>
			</form>
		</>
	);
}
