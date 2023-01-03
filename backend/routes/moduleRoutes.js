import express from 'express';

import { getModules } from "../controllers/moduleController.js"
import { createModule } from '../controllers/moduleController.js';

const router = express.Router();

router.get('/', getModules);
router.post('/', createModule);

export default router;