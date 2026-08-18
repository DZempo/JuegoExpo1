import { useCallback, useState } from 'react';
import { localRecordKey } from '@/lib/constants';
import { CharacterId } from '@/types/character.types';

interface UseLocalRecordResult {
  record: number;
  updateRecord: (score: number) => number;
}

export function useLocalRecord(characterId: CharacterId | null): UseLocalRecordResult {
  const readRecord = useCallback((): number => {
    if (!characterId) return 0;
    const raw = window.localStorage.getItem(localRecordKey(characterId));
    return raw ? Number(raw) || 0 : 0;
  }, [characterId]);

  const [record, setRecord] = useState<number>(readRecord);

  const updateRecord = useCallback(
    (score: number): number => {
      if (!characterId) return record;
      const current = readRecord();
      const next = Math.max(current, score);
      window.localStorage.setItem(localRecordKey(characterId), String(next));
      setRecord(next);
      return next;
    },
    [characterId, readRecord, record]
  );

  return { record, updateRecord };
}
