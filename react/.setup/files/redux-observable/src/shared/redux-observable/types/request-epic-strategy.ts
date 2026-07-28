export const LIST_OF_REQUEST_EPIC_STRATEGIES = ['latest', 'queue', 'ignore', 'parallel'] as const;

export type RequestEpicStrategy = (typeof LIST_OF_REQUEST_EPIC_STRATEGIES)[number];
