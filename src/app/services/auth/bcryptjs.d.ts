declare module 'bcryptjs' {
  export function compareSync(s: string, hash: string): boolean;
  export function hashSync(s: string, salt: number | string): string;
  export function genSaltSync(rounds?: number): string;
}
