interface RawSqlClient {
  $queryRaw: (query: string) => Promise<unknown>;
}

export function selectOneAllowed(client: RawSqlClient): Promise<unknown> {
  return client.$queryRaw("select 1");
}
