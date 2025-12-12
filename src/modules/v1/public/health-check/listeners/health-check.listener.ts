import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';
import { HealthCheckData } from '@/types/modules/v1/health-check/data/health-check-data.type';

eventEmitter.on(PublicEventName.HEALTH_CHECK_PASSED, (serverData: HealthCheckData) => {
  // get health check notification !
});
