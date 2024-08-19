import { itemsByViewsKey } from '$services/keys';
import { getItemsBy } from '$services/queries/items/get-by';

export const itemsByViews = async (order: 'DESC' | 'ASC' = 'DESC', offset = 0, count = 10) => {
  return getItemsBy(itemsByViewsKey, order, offset, count);
};
