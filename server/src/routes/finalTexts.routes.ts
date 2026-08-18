import { Router } from 'express';
import { getFinalText } from '../controllers/finalTexts.controller';

const router = Router();

router.get('/:characterId', getFinalText);

export default router;
