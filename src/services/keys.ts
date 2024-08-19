export const pageCacheKey = (pageId: string) => `pagecache#${pageId}`;
export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;

export const usersKey = (userId: string) => `users#${userId}`;
export const usersLikesKey = (userId: string) => `users:likes#${userId}`;
export const usernamesKey = `usernames`;
export const usernamesUniqueKey = `usernames:unique`;

export const itemsKey = (itemId: string) => `items#${itemId}`;
export const itemsViewsKey = (itemId: string) => `items:views#${itemId}`;
export const itemsByViewsKey = 'items:views';
export const itemsByEndingAtKey = 'items:endingAt';
export const bidHistoryKey = (itemId: string) => `history#${itemId}`;
export const itemsByPriceKey = 'items:price';