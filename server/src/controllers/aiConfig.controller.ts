import { Request, Response } from 'express';
import aiConfig from '../data/aiConfig.json';
import { AIConfig, CharacterId } from '../types';

const configs: Record<string, AIConfig> = aiConfig;

export function getAIConfig(req: Request, res: Response): void {
  const characterId = req.params.characterId as CharacterId;
  const config = configs[characterId];

  if (!config) {
    res.status(404).json({ error: `No hay configuración de IA para "${characterId}"` });
    return;
  }

  res.json(config);
}
