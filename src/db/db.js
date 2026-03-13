import pgPromise from "pg-promise";

const pgp = pgPromise()

export const db = pgp("postgresql://postgres.ssptuhjmpzzhmodbswfq:SahilGarg123@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres")