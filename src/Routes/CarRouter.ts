import express from 'express';
import CarController from '../Controllers/CarController';

const router = express.Router();

router.post('/cars', (req, res) => new CarController(req, res).create());
router.get('/cars', (req, res) => new CarController(req, res).getAll());
router.get('/cars/:id', (req, res) => new CarController(req, res).getById());
router.put('/cars/:id', (req, res) => new CarController(req, res).update());
router.delete('/cars/:id', (req, res) => new CarController(req, res).exclude());

export default router;