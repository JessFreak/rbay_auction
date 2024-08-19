import { itemsByPriceKey } from '$services/keys';
import { getItemsBy } from '$services/queries/items/get-by';

export const itemsByPrice = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
  return getItemsBy(itemsByPriceKey, order, offset, count);
};
