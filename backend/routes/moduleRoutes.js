import express from 'express';

import { getModules } from "../controllers/moduleController.js"
import { createModule } from '../controllers/moduleController.js';
import { getModule } from '../controllers/moduleController.js';

const router = express.Router();

router.get('/', getModules);
router.get('/:id', getModule)
router.post('/', createModule);

export default router;