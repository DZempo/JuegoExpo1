import { Router } from 'express';
import { getCharacters } from '../controllers/characters.controller';

const router = Router();

router.get('/', getCharacters);

export default router;
