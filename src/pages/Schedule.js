import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Container from "react-bootstrap/Container";
import SelectCity from "../components/SelectCity";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ScheduleList from "../components/ScheduleList.js";

const Horaires = () => {
	let [scheduleList, setScheduleList] = useState();
	let [cityMount, setCityMount] = useState();
	let [cityDescend, setCityDescend] = useState();
	let [tripsDate, setTripsDate] = useState(new Date().toISOString().substring(0, 10));

	let changeCity = (type, value) => {
		if (type === "mount") {
			setCityMount(value);
		} else if (type === "descend") {
			setCityDescend(value);
		}
	};

	return (
		<>
			<Navigation />
			<main>
				<Container className="text-light">
					<Form className="p-3">
						<h1 className="text-center">Recherche</h1>
						<Row>
							<Col xs={12}>
								<SelectCity type="mount" changeCity={changeCity}></SelectCity>
								<SelectCity type="descend" changeCity={changeCity}></SelectCity>
							</Col>

							<Col xs={12}>
								<Form.Group className="mb-3" controlId="inputDate">
									<Form.Label>Date du trajet :</Form.Label>
									<Form.Control type="date" defaultValue={tripsDate} onChange={(e) => setTripsDate(e.target.value)} />
								</Form.Group>
							</Col>
							<Col xs={12} className="text-center">
								<Button variant="secondary" type="button" onClick={() => setScheduleList(<ScheduleList cityMount={cityMount} cityDescend={cityDescend} tripsDate={tripsDate}></ScheduleList>)}>
									Voir les Horaires
								</Button>
							</Col>
						</Row>
					</Form>
					{scheduleList}
				</Container>
			</main>
		</>
	);
};

export default Horaires;
