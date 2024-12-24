import { SetMetadata } from '@nestjs/common';
import {ERole} from "../enums";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (keyof typeof ERole)[]) => SetMetadata(ROLES_KEY, roles);