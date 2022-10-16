import { v1 } from 'uuid'

export class GameManager {
  private static pendingGames: Record<string, string> = {}
  private static ongoingGames: Record<string, Record<string, string | Array<string> | Array<Array<string>> | Array<Record<string, string>>>> = {}

  static generateKey(): Array<string> {
    // Generate a key
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    if (this.pendingGames[result]) {
      return this.generateKey()
    }
    else {
      this.pendingGames[result] = v1()
      return [result, this.pendingGames[result]]
    }
  }

  static getPendingGame(key: string) {
    return this.pendingGames[key]
  }

  static clearPendingGame(key: string) {
    delete this.pendingGames[key]
  }

  static createOngoingGame(id: string) {
    this.ongoingGames[id] = {}
  }
  
  static deleteOngoingGame(id: string) {
    if (this.ongoingGames[id]) {
      delete this.ongoingGames[id]
    }
  }

  static storeValue(id:string, key: string, value: string | Array<string> | Array<Array<string>> | Array<Record<string, string>>) {
    this.ongoingGames[id][key] = value
  }

  static getValue(id: string, key: string) {
    return this.ongoingGames[id][key]
  }
}