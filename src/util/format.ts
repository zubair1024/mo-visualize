import { ID3NodeDatum, IMoType } from './types';

const getChildren = (typeId: number, data: IMoType[]) => {
  const children = data.filter((item) => {
    if (item.parentTypes && item.parentTypes.length) {
      return item.parentTypes.indexOf(typeId) > -1;
    }
  });
  return children;
};

export const formatMoTypesTodD3Data = (data: IMoType[]) => {
  // set the root
  const root = data.filter((i) => i.typeVerId === -1)[0];
  const result: ID3NodeDatum = {
    name: root.typeName,
    attributes: { typeId: root.typeId },
  };

  const children = getChildren(result.attributes.typeId, data);
  result.children = children.map((i) => ({
    name: i.typeName,
    attributes: { typeId: i.typeId },
  }));

  return result;
};
