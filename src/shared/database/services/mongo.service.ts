import { DatabaseConfig } from '../../env/mongo.config';

export function buildMongoUri(config: DatabaseConfig): string {
  const { user, password, cluster, dbPort, database, authSource } = config;

  if (!user || !password || !cluster || !dbPort || !database || !authSource) {
    throw new Error('Falta información en la configuración de MongoDB');
  }

  return `mongodb://${user}:${password}@${cluster}:${dbPort}/${database}?authSource=${authSource}`
}
