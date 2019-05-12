export class RoleModel {
  public level: number;
  public key: string;

  constructor(level: { key: string; level: number }) {
    this.level = level.level;
    this.key = level.key;
  }
  isAllowed(Level: RoleModel) {
    return this.level <= Level.level;
  }
}
