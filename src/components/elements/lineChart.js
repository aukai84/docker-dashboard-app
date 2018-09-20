import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Typography from '@material-ui/core/Typography';
import io from 'socket.io-client';

const data = [
	{ name: 'Mon', cpu: 2200, memory: 3400 },
	{ name: 'Tue', cpu: 1280, memory: 2398 },
	{ name: 'Wed', cpu: 5000, memory: 4300 },
	{ name: 'Thu', cpu: 4780, memory: 2908 },
	{ name: 'Fri', cpu: 5890, memory: 4800 },
	{ name: 'Sat', cpu: 4390, memory: 3800 },
	{ name: 'Sun', cpu: 4490, memory: 4300 }
];

class DashboardLineChart extends Component {
	constructor(props) {
		super(props);
		this.renderUsage = this.renderUsage.bind(this);
	}

	renderUsage() {
		socket.on('event', data => {
			console.log('socketdata', data);
		});
	}

	render() {
		return (
			<ResponsiveContainer width="99%" height={320}>
				<LineChart data={data}>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid vertical={false} strokeDasharray=" 3 3" />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="cpu" stroke="#82ca9d" />
					<Line type="monotone" dataKey="memory" stroke="#8884d8" activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		);
	}
}

export default DashboardLineChart;
