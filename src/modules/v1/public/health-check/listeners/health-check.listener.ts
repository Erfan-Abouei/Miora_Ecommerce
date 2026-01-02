import type { HealthCheckData } from '@/types/modules/v1/public/health-check/data/health-check-data.type';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.HEALTH_CHECK_PASSED, (_serverData: HealthCheckData): void => {
  // get health check notification !
});
