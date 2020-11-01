import { TFunction } from '../@types/i18next.overrides'

export default class BaseService {
  constructor(protected readonly t: TFunction) {}
}
