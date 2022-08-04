import React, { useEffect, useState } from "react";
import Cities from "../data/cities";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SelectCity = ({ type, changeCity }) => {
	const [citiesDisplay, setCitiesDisplay] = useState([]);
	const [searchCity, setSearchCity] = useState("");
	const [textType, setTextType] = useState();

	useEffect(() => {
		setCitiesDisplay(Cities);
		if (type === "mount") {
			setTextType("de depart");
		} else if (type === "descend") {
			setTextType("d'arrivée");
		}
	}, [type]);

	useEffect(() => {
		setCitiesDisplay(Cities.filter((city) => city.name.toUpperCase().includes(searchCity.toUpperCase()) || city.name.replaceAll("-", " ").toUpperCase().includes(searchCity.toUpperCase())));
	}, [searchCity]);

	useEffect(() => {
		if (citiesDisplay[0] != null) {
			document.querySelector(`#cities_select_${type}`).value = citiesDisplay[0].name;
			changeCity(type, citiesDisplay[0].name);
		}
	}, [citiesDisplay, type]);

	return (
		<Form.Group className="mb-3" controlId={`select_${type}`}>
			<Form.Label>Ville {textType} :</Form.Label>
			<Row>
				<Col>
					<Form.Control
						className="mb-2 d-flex"
						type="text"
						htmlFor={`cities_${type}`}
						onChange={(e) => {
							setSearchCity(e.target.value);
						}}
					/>
				</Col>
				<Col>
					<Form.Select name={`cities_select_${type}`} id={`cities_select_${type}`} onChange={(e) => changeCity(type, e.target.value)}>
						{citiesDisplay.map((city) => (
							<option value={city.name}>{city.name.replaceAll("-", " ")}</option>
						))}
					</Form.Select>
				</Col>
			</Row>

			
		</Form.Group>
	);
};

export default SelectCity;
