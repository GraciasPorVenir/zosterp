interface IUsersInAFIP {
  legalName: string;
  legalType: string;
}

export const usersInAFIP: Record<string, IUsersInAFIP> = {
  20486780127: {
    legalName: "Juan Perez",
    legalType: "PERSONA FISICA",
  },
} as const;
