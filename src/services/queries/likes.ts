import { client } from '$services/redis';
import { itemsKey, usersLikesKey } from '$services/keys';
import { getItems } from '$services/queries/items';

export const userLikesItem = async (itemId: string, userId: string) => {
  return client.sIsMember(usersLikesKey(userId), itemId);
};

export const likedItems = async (userId: string) => {
  const ids = await client.sMembers(usersLikesKey(userId));
  return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string) => {
  const inserted = await client.sAdd(usersLikesKey(userId), itemId);

  if (inserted) {
    return client.hIncrBy(itemsKey(itemId), 'likes', 1);
  }
};

export const unlikeItem = async (itemId: string, userId: string) => {
  const removed = await client.sRem(usersLikesKey(userId), itemId);

  if (removed) {
    return client.hIncrBy(itemsKey(itemId), 'likes', -1);
  }
};

export const commonLikedItems = async (firstUserId: string, secondUserId: string) => {
  const ids = await client.sInter([usersLikesKey(firstUserId), usersLikesKey(secondUserId)]);

  return getItems(ids);
};
