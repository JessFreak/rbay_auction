import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { itemsKey } from '$services/keys';
import { deserialize } from './deserialize';
import { getDeserialized } from '$services/utils/object';

export const getItem = async (id: string) => {
  const item = await client.hGetAll(itemsKey(id));

  return getDeserialized(id, item, deserialize);
};

export const getItems = async (ids: string[]) => {
  const commands = ids.map((id) => {
    return client.hGetAll(itemsKey(id));
  });

  const results = await Promise.all(commands);
  return results.map((item, i) => {
    return getDeserialized(ids[i], item, deserialize);
  });
};

export const createItem = async (attrs: CreateItemAttrs) => {
  const id = genId();

  await client.hSet(itemsKey(id), serialize(attrs));

  return id;
};
