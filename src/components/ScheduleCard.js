import React, { useEffect, useState } from "react";

import stop_times from "../data/stop_times";
import allStops from "../data/stops";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const ScheduleCard = ({ tripId, tripName, cityMount, cityDescend }) => {
	const [liStops, setLiStops] = useState();
	const [visibilityCard, setVisibilityCard] = useState();

	useEffect(() => {
		let stops = stop_times.filter((stop_time) => stop_time.trip_id === tripId);

		let stopMountIndex = 0;
		let stopDescendIndex = 0;

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
	
		
	}, [tripId, cityDescend, cityMount, tripName]);

	if (visibilityCard) {
		return (
			<Col xs={12} xl={6} className="mb-3 text-dark">
				<Card>
					<Card.Header>{tripName}</Card.Header>
					<Card.Body>
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
