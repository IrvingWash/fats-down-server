import { JwtPayload } from 'jsonwebtoken';

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface GenerateTokensPayload {
	username: string;
	email: string;
}

export interface TokenVerificationResult extends JwtPayload, GenerateTokensPayload {}
