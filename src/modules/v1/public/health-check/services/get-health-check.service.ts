import os from 'os';
import si from 'systeminformation';
import { HealthCheckData } from '@/types/data-type/health-check-data.types.js';

export const getHealthCheckDataService = async (): Promise<HealthCheckData> => {
  try {
    // CPU Usage
    const cpuLoad = await si.currentLoad();

    // Memory Info
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usedMemPercent = (usedMem / totalMem) * 100;

    // Disk Info
    const disks = await si.fsSize();

    // Network Info
    const networkInterfaces = await si.networkInterfaces();

    return {
      cpu: Number(cpuLoad.currentLoad.toFixed(2)),
      memory: {
        total: totalMem,
        used: usedMem,
        usedPercent: Number(usedMemPercent.toFixed(2)),
      },
      disk: disks.map((d) => ({
        fs: d.fs,
        total: d.size,
        used: d.used,
        free: d.size - d.used,
        usedPercent: Number(d.use.toFixed(2)),
      })),
      network: networkInterfaces
        .filter((n) => n.ip4 && !n.virtual) // Filter out virtual or empty network interfaces
        .map((n) => ({
          iface: n.iface,
          ip4: n.ip4,
        })),
    };
  } catch (error) {
    throw error;
  }
};
