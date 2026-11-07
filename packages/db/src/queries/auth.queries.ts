import { and, eq, or, isNull } from "drizzle-orm";
import { db } from "../connection.js";
import {
  entities,
  InsertToken,
  SafeUser,
  Token,
  tokens,
  User,
  users,
} from "../schemas/index.js";
import { DBRegisterInput } from "@repo/schemas";

/**
 * Get user by email
 * @param - email
 * @returns User without password hash
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  return await db.select().from(users).where(eq(users.email, email)).get();
}

export async function registerUser(data: DBRegisterInput): Promise<User> {
  const { email, passwordHash, ...rest } = data;
  let entity = await db
    .select()
    .from(entities)
    .where(eq(entities.cuit, rest.cuit))
    .get();
  if (!entity) {
    [entity] = await db
      .insert(entities)
      .values({ ...rest })
      .returning();
    if (!entity) throw new Error("Error al crear la entidad");
  }
  const [user] = await db
    .insert(users)
    .values({ email, passwordHash, entityId: entity.id })
    .returning();
  if (!user) throw new Error("Error al crear el usuario");
  return user;
}

export async function generateToken(data: InsertToken): Promise<Token> {
  await db
    .delete(tokens)
    .where(
      and(eq(tokens.userId, data.userId), eq(tokens.userAgent, data.userAgent)),
    );
  const [token] = await db.insert(tokens).values(data).returning();
  if (token === undefined) throw new Error("Error al crear token.");
  return token;
}

export async function getUserByToken(tokenId: string): Promise<SafeUser | undefined> {
  const result = await db
    .select()
    .from(tokens)
    .innerJoin(users, eq(users.id, tokens.userId))
    .where(eq(tokens.id, tokenId))
    .get();
  if (result === undefined) throw new Error("Error al crear token.");
  return result.users;
}
