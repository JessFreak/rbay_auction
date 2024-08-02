export const getDeserialized = (id: string, data, deserialize) => {
  return Object.keys(data).length ? deserialize(id, data) : null;
}