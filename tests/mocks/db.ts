import { mock, type Mock } from 'bun:test';

/**
 * Minimal interface for a Drizzle-like chainable query builder.
 */
export interface MockChain {
  from: Mock<() => MockChain>;
  where: Mock<() => MockChain>;
  limit: Mock<(n: number) => MockChain>;
  offset: Mock<(n: number) => MockChain>;
  orderBy: Mock<() => MockChain>;
  returning: Mock<() => MockChain>;
  values: Mock<() => MockChain>;
  set: Mock<(v: unknown) => MockChain>;
  $onUpdate: Mock<() => MockChain>;
  then: (onFulfilled: (value: unknown) => unknown) => Promise<unknown>;
  mockResolve: (value: unknown) => void;
}

/**
 * Minimal interface for a Drizzle-like database client.
 */
export interface MockDb {
  select: Mock<(fields?: unknown) => MockChain>;
  insert: Mock<(table: unknown) => MockChain>;
  update: Mock<(table: unknown) => MockChain>;
  delete: Mock<(table: unknown) => MockChain>;
  transaction: Mock<(cb: (db: MockDb) => Promise<unknown>) => Promise<unknown>>;
}

/**
 * Mock Drizzle Implementation
 */
export const createMockDb = () => {
  let resolvedValue: unknown = [];

  const chain: MockChain = {
    from: mock(() => chain),
    where: mock(() => chain),
    limit: mock(() => chain),
    offset: mock(() => chain),
    orderBy: mock(() => chain),
    returning: mock(() => chain),
    values: mock(() => chain),
    set: mock(() => chain),
    $onUpdate: mock(() => chain),
    then: (onFulfilled) => Promise.resolve(resolvedValue).then(onFulfilled),
    mockResolve: (value: unknown) => {
      resolvedValue = value;
    },
  };

  const dbMock: MockDb = {
    select: mock(() => chain),
    insert: mock(() => chain),
    update: mock(() => chain),
    delete: mock(() => chain),
    transaction: mock(async (cb: (db: MockDb) => Promise<unknown>) => cb(dbMock)),
  };

  return { dbMock, chain };
};
