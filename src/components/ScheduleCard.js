import React, { useEffect, useState } from "react";

import stop_times from "../data/stop_times";
import allStops from "../data/stops";
import calendar from "../data/calendar";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const ScheduleCard = ({ tripId, tripName, serviceId, cityMount, cityDescend, tripsDate, tripsTime }) => {
	const [liStops, setLiStops] = useState([]);
	const [visibilityCard, setVisibilityCard] = useState(false);
	const [dateService, setDateService] = useState("");

	useEffect(() => {
		let stops = stop_times.filter((stop_time) => stop_time.trip_id === tripId && stop_time.arrival_time.replace(":", "") >= tripsTime.replace(":", ""));

		let stopMountIndex = 0;
		let stopDescendIndex = 0;


		calendar.forEach((service) => {if (service.service_id === serviceId) {

			let start = `${service.start_date.substring(6,8)}/${service.start_date.substring(4,6)}/${service.start_date.substring(0,4)}`;
			let end = `${service.end_date.substring(6,8)}/${service.end_date.substring(4,6)}/${service.end_date.substring(0,4)}`;

			setDateService(`Du ${start} au ${end}`)
		}})

		let templiStops = [];
		stops.forEach((stop) => {
			let stopName;

			allStops.forEach((stopInfo) => {
				if (stopInfo.stop_id === stop.stop_id) {
					stopName = stopInfo.stop_name;

					if (stopName.startsWith(`${cityMount.toUpperCase()} - `) && stopMountIndex === 0) {
						stopMountIndex = 2;
					} else if (stopName.startsWith(`${cityDescend.toUpperCase()} - `) && stopDescendIndex === 0) {
						stopDescendIndex = stopMountIndex * 2;
					}
				}
			});

			if (stopName.startsWith(`${cityMount.toUpperCase()} - `) || stopName.startsWith(`${cityDescend.toUpperCase()} - `)) {
				templiStops.push([stop.arrival_time, stopName, "fw-bold"]);
			} else {
				templiStops.push([stop.arrival_time, stopName, ""]);
			}
		});

		setLiStops(templiStops);
		setVisibilityCard(stopDescendIndex === 4);
	}, [tripId, cityDescend, cityMount, tripName, tripsTime,serviceId]);

	if (visibilityCard) {
		return (
			<Col xs={12} xl={6} className="mb-3 text-dark">
				<Card>
					<Card.Header>{tripName}</Card.Header>
					<Card.Body>
						<Card.Text className="small">{dateService}</Card.Text>
						<ul>
							{liStops.map((li) => (
								<li className={`${li[2]}`}>
									{li[0]} : {li[1]}
								</li>
							))}
						</ul>
					</Card.Body>
				</Card>
			</Col>
		);
	} else {
		return;
	}
};

export default ScheduleCard;
