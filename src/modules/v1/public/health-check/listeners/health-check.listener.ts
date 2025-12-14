import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { HealthCheckData } from '@/types/modules/v1/public/health-check/data/health-check-data.type';

eventEmitter.on(PublicEventName.HEALTH_CHECK_PASSED, (serverData: HealthCheckData): void => {
  // get health check notification !
});
