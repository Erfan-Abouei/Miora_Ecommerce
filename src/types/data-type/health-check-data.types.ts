export interface HealthCheckData {
  cpu: number;
  memory: {
    total: number;
    used: number;
    usedPercent: number;
  };
  disk: Array<{
    fs: string;
    total: number;
    used: number;
    free: number;
    usedPercent: number;
  }>;
  network: Array<{
    iface: string;
    ip4: string;
  }>;
}