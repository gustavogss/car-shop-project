import express from 'express';
import MotoController from '../Controllers/MotorcycleController';

const router = express.Router();

router.post('/motorcycles', (req, res) => new MotoController(req, res).create());
router.get('/motorcycles', (req, res) => new MotoController(req, res).getAll());
router.get('/motorcycles/:id', (req, res) => new MotoController(req, res).getById());
router.put('/motorcycles/:id', (req, res) => new MotoController(req, res).update());
export default router;