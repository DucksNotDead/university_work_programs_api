import {Global, Module} from '@nestjs/common';
import {Pool} from 'pg';
import {DatabaseService} from "./database.service";

@Global()
@Module({
	providers: [
		DatabaseService,
		{
			provide: 'PG_CONNECTION',
			useFactory: async () => {
				return new Pool({
					host: process.env.DB_HOST,
					port: parseInt(process.env.DB_PORT, 10),
					user: process.env.DB_USERNAME,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_NAME,
				});
			},
		},
	],
	exports: ['PG_CONNECTION', DatabaseService],
})
export class DatabaseModule {}