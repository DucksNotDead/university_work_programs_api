import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const { fio, login, password, role } = createUserDto;
    const query = `
      INSERT INTO users (fio, login, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await this.pool.query(query, [fio, login, password, role]);
    return result.rows[0];
  }

  // Get all users
  async findAll() {
    const result = await this.pool.query('SELECT * FROM users;');
    return result.rows;
  }

  // Get a specific user by ID
  async findOne(id: number) {
    const result = await this.pool.query('SELECT * FROM users WHERE id = $1;', [
      id,
    ]);
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
    return result.rows[0];
  }

  async findByLogin(login: string) {
    const query = `SELECT * FROM users WHERE login = $1;`;
    const result = await this.pool.query(query, [login]);
    return result.rowCount > 0 ? result.rows[0] : null;
  }

  // Update a specific user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { fio, login, password, role } = updateUserDto;
    const query = `
      UPDATE users
      SET fio = COALESCE($2, fio),
          login = COALESCE($3, login),
          password = COALESCE($4, password),
          role = COALESCE($5, role)
      WHERE id = $1
      RETURNING *;
    `;
    const result = await this.pool.query(query, [
      id,
      fio,
      login,
      password,
      role,
    ]);
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
    return result.rows[0];
  }

  // Delete a specific user
  async remove(id: number) {
    const result = await this.pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *;',
      [id],
    );
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
    return result.rows[0];
  }
}
