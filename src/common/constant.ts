export const Tags = {
  HEALTH: 'Health',
  COMMON: 'Common',
};

export enum NodeEnv {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export const apiVersion = '1';

export enum ConnectionName {
  GENERAL = 'General',
}

export const DATA_SOURCE = 'DATA_SOURCE';

export const statusMessages = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'NonAuthoritativeInfo',
  204: 'NoContent',
  205: 'ResetContent',
  206: 'PartialContent',
};

export const HOLIDAYS = [
  {
    date: '02-12-2024',
    title: 'Holiday 1',
    type: 'REGULAR',
  },
  {
    date: '05-02-2024',
    title: 'Holiday 2',
    type: 'FLOATER',
  },
];
