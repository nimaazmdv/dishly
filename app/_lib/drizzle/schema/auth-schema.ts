import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { id, timestamps } from "../helpers";
import { recipes } from "./recipes";
import { likes } from "./likes";

export const users = pgTable("users", {
  id,
  name: t.text().notNull(),
  email: t.text().unique().notNull(),
  emailVerified: t.boolean().default(false).notNull(),
  image: t.text(),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  likes: many(likes),
}));

export const sessions = pgTable("sessions", {
  id,
  token: t.text().unique().notNull(),
  expiresAt: t.timestamp().notNull(),
  ipAddress: t.text(),
  userAgent: t.text(),
  ...timestamps,

  userId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const accounts = pgTable("accounts", {
  id,
  accountId: t.text().notNull(),
  providerId: t.text().notNull(),
  accessToken: t.text(),
  refreshToken: t.text(),
  idToken: t.text(),
  accessTokenExpiresAt: t.timestamp(),
  refreshTokenExpiresAt: t.timestamp(),
  scope: t.text(),
  password: t.text(),
  ...timestamps,

  userId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const verifications = pgTable("verifications", {
  id,
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.timestamp().notNull(),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
