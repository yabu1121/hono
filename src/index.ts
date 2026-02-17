import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './db/schema'

async function main() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not set')
    }

    const client = postgres(process.env.DATABASE_URL, { prepare: false })
    // スキーマを渡すことで、dbクエリの結果に型がつきます
    const db = drizzle(client, { schema });

    // 動作確認: ユーザー一覧を取得（最初は空配列が返るはずです）
    const users = await db.select().from(schema.usersTable);
}

main();
