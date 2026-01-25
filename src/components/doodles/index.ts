import { TaxiDoodle } from './TaxiDoodle';
import { WindDoodle } from './WindDoodle';
import { FlatironsDoodle } from './FlatironsDoodle';
import { NetworkDoodle } from './NetworkDoodle';

export { TaxiDoodle, WindDoodle, FlatironsDoodle, NetworkDoodle };

export const doodleMap: Record<string, React.ComponentType<{ animate?: boolean }>> = {
  'new-york': TaxiDoodle,
  'chicago': WindDoodle,
  'boulder': FlatironsDoodle,
  'malaysia': NetworkDoodle,
};
