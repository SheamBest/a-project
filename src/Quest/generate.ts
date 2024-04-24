// src/quests.ts
import db from './quest';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Quest } from './types';

// Function to add a new quest
export async function addQuest(quest: Quest): Promise<void> {
  const questRef = doc(db, 'quests', quest.id);
  await setDoc(questRef, {
    location: quest.location,
    timestamp: serverTimestamp(), // Use server timestamp for consistency
    next: quest.next
  });
}

// Function to update the 'next' field of a quest
export async function updateNextQuest(currentQuestId: string, nextQuestId: string): Promise<void> {
  const currentQuestRef = doc(db, 'quests', currentQuestId);
  await updateDoc(currentQuestRef, {
    next: nextQuestId
  });
}
