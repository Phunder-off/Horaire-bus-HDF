import React, { useEffect, useState } from "react";

import stops from "../data/stops";
import stop_times from "../data/stop_times";
import calendar from "../data/calendar";
import trips from "../data/trips";
import ScheduleCard from "./ScheduleCard";
import Row from "react-bootstrap/Row";

const ScheduleList = ({ cityMount, cityDescend, tripsDate, tripsTime }) => {
	const [potentialTrips, setPotentialTrips] = useState([]);

	useEffect(() => {
		
		let potentialStopMount = [];
		let potentialStopDescend = [];

		let potentialTripsMount = [];
		let potentialTripsDescend = [];

		potentialStopMount = stops.filter((city) => city.stop_name.includes(cityMount.toUpperCase() + " -")).map((city) => city.stop_id);
		potentialStopDescend = stops.filter((city) => city.stop_name.includes(cityDescend.toUpperCase() + " -")).map((city) => city.stop_id);

		potentialTripsMount = stop_times.filter((stop_time) => potentialStopMount.includes(stop_time.stop_id)).map((stop_time) => stop_time.trip_id);
		potentialTripsDescend = stop_times.filter((stop_time) => potentialStopDescend.includes(stop_time.stop_id)).map((stop_time) => stop_time.trip_id);

		let tripsIds = potentialTripsMount.filter((potentialTripMount) => potentialTripsDescend.includes(potentialTripMount));

		let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

		let services = calendar.filter((service) => service[days[new Date(tripsDate).getDay()]]).map((service) => service.service_id);

		setPotentialTrips(trips.filter((trip) => tripsIds.includes(trip.trip_id) && services.includes(trip.service_id)).map((trip) => [trip.trip_id, trip.trip_headsign, trip.service_id]));
	}, [cityMount, cityDescend, tripsDate, tripsTime]);

	return (
		<Row className="p-3">
			<hr />
			<h2 className="mb-3 text-center">Horaires</h2>
			<hr />
			{potentialTrips.map((potentialTrip) => (
				<ScheduleCard tripId={potentialTrip[0]} tripName={potentialTrip[1]} serviceId={potentialTrip[2]} cityMount={cityMount} cityDescend={cityDescend} tripsDate={tripsDate} tripsTime={tripsTime}></ScheduleCard>
			))}
		</Row>
	);
};

export default ScheduleList;
