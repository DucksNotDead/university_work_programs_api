import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(login: string, password: string): Promise<any> {
		const user = await this.usersService.findByLogin(login);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any, res: any) {
		const payload = { username: user.login, sub: user.id, role: user.role, fio: user.fio };
		const token = this.jwtService.sign(payload);

		// Устанавливаем токен в cookies
		res.cookie('jwt', token, {
			httpOnly: true, // Защищает cookie от доступа через JavaScript
			secure: process.env.NODE_ENV === 'production', // Только через HTTPS в production
			maxAge: 3600000 * 24,
		});

		return user;
	}

	logout(res: any) {
		// Удаляем cookie с токеном
		res.clearCookie('jwt');
		return { message: 'Logout successful' };
	}
}