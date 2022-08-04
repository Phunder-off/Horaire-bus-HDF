import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

const Navigation = () => {
	return (
		<Navbar bg="light">
			<Container className="d-flex justify-content-center text-center">
				<Row>
					<Col xs={12}>
						<Navbar.Brand className="text-center m-0">Horaires de bus HDF</Navbar.Brand>
					</Col>
					<Col>
						<Nav className="me-auto justify-content-center">
							<NavLink to="/Horaire-bus-HDF/" className="nav-link">
								Accueil
							</NavLink>

							<NavLink to="/Horaire-bus-HDF/horaires" className="nav-link">
								Horaires
							</NavLink>
						</Nav>
					</Col>
				</Row>
			</Container>
		</Navbar>
	);
};

export default Navigation;
