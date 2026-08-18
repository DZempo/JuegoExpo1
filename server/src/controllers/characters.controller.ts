import { Request, Response } from 'express';
import characters from '../data/characters.json';

export function getCharacters(_req: Request, res: Response): void {
  res.json(characters);
}
