import type { Item } from '$services/types';
import { DateTime } from 'luxon';

export const deserialize = (id: string, item: { [key: string]: string }): Item => {
  return {
    id,
    name: item.name,
    description: item.description,
    imageUrl: item.imageUrl,
    highestBidUserId: item.highestBidUserId,
    ownerId: item.ownerId,
    createdAt: DateTime.fromMillis(+item.createdAt),
    endingAt: DateTime.fromMillis(+item.endingAt),
    views: +item.views,
    likes: +item.likes,
    bids: +item.bids,
    price: +item.price,
  };
};
