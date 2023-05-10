import { JwtPayload } from 'jsonwebtoken';

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface GenerateTokensPayload {
	email: string;
	username: string;
}

export interface TokenVerificationResult extends JwtPayload, GenerateTokensPayload {}

export interface AuthResult {
	username: string;
	email: string;
	tokens: Tokens;
}
