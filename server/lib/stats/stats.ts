import { promises as fs } from 'node:fs';

export class ImportedInteractor {
  stats: string | null = null;

  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async getStats() {
    if (!this.stats) {
      const data = await fs.readFile(`${this.path}imported.json`, 'utf-8');
      this.stats = JSON.parse(data);
    }

    return this.stats;
  }
}

const modernImportedInteractor = new ImportedInteractor('@dist/client');

export const getImportedStats = () => {
  return modernImportedInteractor.getStats();
};
