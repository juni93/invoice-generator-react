import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db, logout } from "../firebase";
import Invoice from './Invoice'

function Dashboard() {
	const [user, loading, error] = useAuthState(auth);
	//const [name, setName] = useState("");
	const history = useHistory();
	/* const fetchUserName = async () => {
		try {
			const query = await db
				.collection("users")
				.where("uid", "==", user?.uid)
				.get();
			const data = await query.docs[0].data();
			//setName(data.name);
		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	}; */
	useEffect(() => {
		if (loading) return;
		if (!user) return history.replace("/");
		//fetchUserName();
	}, [user, loading]);
	return (
		<div className="container">
			<div className="row justify-content-between">
				<div className="col-8">
					<h1 className="mt-3">Invoice Generator</h1>
				</div>
				<div className="col">
					<button className="btn btn-primary mt-3" onClick={logout}>
						Logout
					</button>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col-sm">
					<Invoice />
				</div>
			</div>
		</div>
	);
}
export default Dashboard;