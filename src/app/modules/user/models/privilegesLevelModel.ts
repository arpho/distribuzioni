export class PrivilegesLevelModel {
  public level: number;
  public key: string;

  constructor(level: { key: string; level: number }) {
    this.level = level.level;
    this.key = level.key;
  }
  isAllowed(Level: PrivilegesLevelModel) {
    return this.level <= Level.level;
  }
}
