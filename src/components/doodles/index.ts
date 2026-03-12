import { TaxiDoodle } from './TaxiDoodle';
import { WindDoodle } from './WindDoodle';
import { NetworkDoodle } from './NetworkDoodle';

export { TaxiDoodle, WindDoodle, NetworkDoodle };

export const doodleMap: Record<string, React.ComponentType<{ animate?: boolean }>> = {
  'new-york': TaxiDoodle,
  'chicago': WindDoodle,
  'malaysia': NetworkDoodle,
};
