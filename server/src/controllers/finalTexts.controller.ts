import { Request, Response } from 'express';
import finalTexts from '../data/finalTexts.json';
import { CharacterId, FinalText } from '../types';

const texts: Record<string, FinalText> = finalTexts;

export function getFinalText(req: Request, res: Response): void {
  const characterId = req.params.characterId as CharacterId;
  const text = texts[characterId];

  if (!text) {
    res.status(404).json({ error: `No hay texto final para "${characterId}"` });
    return;
  }

  res.json(text);
}
