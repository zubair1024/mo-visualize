import { RawNodeDatum } from 'react-d3-tree/lib/types/types/common';

export interface IDefaultTags {
  title: string;
  description: string;
  image: string;
  imageType: string;
  websiteUrl: string;
  twitterHandle: string;
}

export interface IMoType {
  versionDesc: string | null;
  parentTypes: number[] | null;
  vendor: unknown;
  typeName: string;
  typeId: number;
  typeVerId: number;
  protocolType: unknown;
}

export interface ID3NodeDatum extends RawNodeDatum {
  attributes: {
    typeId: number;
  };
}
