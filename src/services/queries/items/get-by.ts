import { client } from '$services/redis';
import { itemsKey } from '$services/keys';
import { deserialize } from '$services/queries/items/deserialize';

export const getItemsBy = async (key: string, order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
  let results: any = await client.sort(key, {
      GET: [
        '#',
        `${itemsKey('*')}->name`,
        `${itemsKey('*')}->views`,
        `${itemsKey('*')}->endingAt`,
        `${itemsKey('*')}->imageUrl`,
        `${itemsKey('*')}->price`,
      ],
      BY: 'score',
      DIRECTION: order,
      LIMIT: { offset, count },
    },
  );

  const items = [];
  while (results.length) {
    const [id, name, views, endingAt, imageUrl, price, ...rest] = results;
    const item = deserialize(id, { name, views, endingAt, imageUrl, price });
    items.push(item);
    results = rest;
  }

  return items;
};