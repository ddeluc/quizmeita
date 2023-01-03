import express from 'express';

import { addFlashcards,
    getModules,
    createModule,
    getModule
} from "../controllers/moduleController.js"

const router = express.Router();

router.get('/', getModules);
router.get('/:id', getModule)
router.post('/', createModule);
router.patch('/:id', addFlashcards)

export default router;