import { index, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const shortLinks = pgTable(
	'short_links',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		clerkUserId: text('clerk_user_id').notNull(),
		shortCode: text('short_code').notNull(),
		url: text('url').notNull(),
		createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		shortCodeUnique: uniqueIndex('short_links_short_code_key').on(table.shortCode),
		clerkUserIdIdx: index('short_links_clerk_user_id_idx').on(table.clerkUserId),
	})
);

export type ShortLink = typeof shortLinks.$inferSelect;
export type NewShortLink = typeof shortLinks.$inferInsert;
