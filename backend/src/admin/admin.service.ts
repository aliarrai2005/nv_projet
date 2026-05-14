import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface Admin {
  id: number;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class AdminService {
  private readonly filePath = path.join(process.cwd(), 'src/data/admin.json');

  constructor(private jwtService: JwtService) {}

  private async readAdmins(): Promise<Admin[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async validateAdmin(email: string, password: string): Promise<Omit<Admin, 'password'> | null> {
    const admins = await this.readAdmins();
    const admin = admins.find(a => a.email === email);
    if (!admin) return null;
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return null;
    // Retourne l'admin sans le mot de passe
    const { password: _, ...safeAdmin } = admin;
    return safeAdmin;
  }

  async login(loginDto: { email: string; password: string }) {
    const admin = await this.validateAdmin(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token, admin };
  }
}