import { Router } from 'express';
import { getAIConfig } from '../controllers/aiConfig.controller';

const router = Router();

router.get('/:characterId', getAIConfig);

export default router;
