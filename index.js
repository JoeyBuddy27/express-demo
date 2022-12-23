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
	res.status(200).send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	let course = courses.find(course => course.id == req.params.id);
	if (!course) {
		res.status(404).send('Course not found');
		return;
	}
	res.status(200).send(course);
});

app.post('/api/courses', (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const { error } = validateCourse(req.body);

	if (error) {
		res.status(400).send(error?.details[0]?.message);
		return;
	} else {
		let course = { id: courses.length + 1, name: req.body.name };
		courses = [...courses, course];
		res.status(201).send(course);
	}
});

app.put('/api/courses/:id', (req, res) => {
	let course = courses.find(course => course.id == req.params.id);
	if (!course) {
		res.status(404).send('Course not found');
		return;
	}

	const { error } = validateCourse(course);
	console.log(error);
	if (error) {
		res.status(400).send(error?.details[0]?.message);
		return;
	} else {
		course.name = req.body.name;
		res.status(204).send(course);
	}
});

const port = process.env.PORT || 3001;

const validateCourse = course => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		id: Joi.number(),
	});

	return schema.validate(course);
};

app.delete('/api/courses/:id', (req, res) => {
	let course = courses.find(course => course.id == req.params.id);
	if (!course) {
		res.status(404).send('Course not found');
		return;
	}

	courses = courses.filter(c => c !== course);
	res.status(204).send(courses);
});

app.listen(3001, () => console.log('server listening'));
