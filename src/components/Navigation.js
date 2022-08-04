import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Navigation = () => {
	return (
		<Navbar bg="light">
			<Container>
				<Navbar.Brand>Horaires bus HDF</Navbar.Brand>
				<Nav className="me-auto">
					<NavLink to="/Horaire-bus-HDF/" className="nav-link">Accueil</NavLink>

					<NavLink to="/Horaire-bus-HDF/horaires" className="nav-link">Horaires</NavLink>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Navigation;
