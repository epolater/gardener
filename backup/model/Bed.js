import { Model } from 'expo-sqlite-orm'

export default class Bed extends Model {
  static get tableName() {
    return 'beds'
  }

  static get columnMapping() {
    return {
      id: { type: 'integer', primary_key: true },
      name: { type: 'string', default: '' },
      number: { type: 'integer', default: 1 },
      width: { type: 'float', default: 1 },
      length: { type: 'float', default: 1 },
    }
  }
}