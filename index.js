const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let courses = [
	{
		id: 1,
		name: 'course1',
	},
	{
		id: 2,
		name: 'course2',
	},
	{
		id: 3,
		name: 'course3',
	},
];

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	let course = courses.find(course => course.id == req.params.id);
	if (!course) res.status(404).send('Not found');
	res.send(course);
});

app.post('/api/courses', (req, res) => {
	const minNameLength = 3;
	if (!req.body.name || req.body.name.length < minNameLength) {
		res.status(400).send(`Name required, minimum ${minNameLength}`);
		return;
	} else {
		let course = { id: courses.length + 1, name: req.body.name };
		courses = [...courses, course];
		res.send(course);
	}
});

const port = process.env.PORT || 3001;

app.listen(3001, () => console.log('server listening'));
