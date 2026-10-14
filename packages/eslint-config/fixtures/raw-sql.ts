interface RawSqlClient {
  $queryRaw: (query: string) => Promise<unknown>;
}

export function selectOne(client: RawSqlClient): Promise<unknown> {
  return client.$queryRaw("select 1");
}
