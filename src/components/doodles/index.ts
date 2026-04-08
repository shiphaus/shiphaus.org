import { TaxiDoodle } from './TaxiDoodle';
import { WindDoodle } from './WindDoodle';
import { NetworkDoodle } from './NetworkDoodle';
import { SnowflakeDoodle } from './SnowflakeDoodle';

export { TaxiDoodle, WindDoodle, NetworkDoodle, SnowflakeDoodle };

export const doodleMap: Record<string, React.ComponentType<{ animate?: boolean }>> = {
  'new-york': TaxiDoodle,
  'chicago': WindDoodle,
  'malaysia': NetworkDoodle,
  'minneapolis': SnowflakeDoodle,
};
