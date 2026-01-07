import type { HealthCheckData } from '@/types';
import { eventEmitter } from '@/config';
import { PublicEventName } from '@/constants';

eventEmitter.on(PublicEventName.HEALTH_CHECK_PASSED, (_serverData: HealthCheckData): void => {
  // get health check notification !
});
