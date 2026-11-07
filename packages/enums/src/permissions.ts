export const actions = {
  C: 0,
  R: 1,
  U: 2,
  D: 3,
} as const;
export type Action = typeof actions;

export const resources = {
  ENT: 0,
  AFF: 1,
  MEM: 2,
  ROL: 3,
  TIM: 4,
  TAS: 5,
} as const;
export type Resource = typeof resources;

export function hasPermission(
  actions: [Action, Action],
  resources: [Resource, Resource],
): boolean {
  return (
    actions.every((a) => a === actions[0]) &&
    resources.every((r) => r === resources[0])
  );
}
