// src/types.ts
export interface Quest {
    id: string;
    location: {
      lat: number;
      lng: number;
    };
    timestamp: Date;
    next: string | null;  // Reference to the next quest ID or null if it's the last quest
  }
  