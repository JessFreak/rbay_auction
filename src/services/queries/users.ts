import type { CreateUserAttrs, User } from '$services/types';
import { genId } from '$services/utils';
import { client } from "$services/redis";
import { usersKey, usernamesUniqueKey, usernamesKey } from "$services/keys";
import { getDeserialized } from '$services/utils/object';

export const getUserByUsername = async (username: string) => {
  const decimalId = await client.zScore(usernamesKey, username);

  if (!decimalId) {
    throw new Error('User does not exist');
  }

  const id = decimalId.toString(16);
  return getUserById(id);
};

export const getUserById = async (id: string): Promise<User> => {
  const user = await client.hGetAll(usersKey(id));

  return getDeserialized(id, user, deserialize);
};

export const createUser = async (attrs: CreateUserAttrs) => {
  const exists = await client.sIsMember(usernamesUniqueKey, attrs.username);
  if (exists) {
    throw new Error('Username is taken');
  }

  const id = genId();
  await client.hSet(usersKey(id), serialize(attrs));
  await client.sAdd(usernamesUniqueKey, attrs.username);
  await client.zAdd(usernamesKey, {
    value: attrs.username,
    score: parseInt(id, 16),
  });

  return id;
};

const serialize = (user: CreateUserAttrs) => {
  return {
    username: user.username,
    password: user.password,
  };
}

const deserialize = (id: string, user: { [key: string]: string }): User => {
  return {
    id,
    username: user.username,
    password: user.password,
  };
}
