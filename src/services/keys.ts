export const pageCacheKey = (pageId: string) => `pagecache#${pageId}`;

export const usersKey = (userId: string) => `users#${userId}`;

export const usersLikesKey = (userId: string) => `users:likes#${userId}`;

export const usernamesKey = `usernames`;

export const usernamesUniqueKey = `usernames:unique`;

export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;

export const itemsKey = (itemId: string) => `items#${itemId}`;