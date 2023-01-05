import express from 'express';

import { addFlashcards,
    getModules,
    createModule,
    getModule,
    deleteModule
} from "../controllers/moduleController.js"

const router = express.Router();

router.get('/:userId', getModules);
router.get('/:username/:id', getModule);
router.delete('/:id', deleteModule);
router.post('/', createModule);
router.patch('/:id', addFlashcards);

export default router;