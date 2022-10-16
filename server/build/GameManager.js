"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const uuid_1 = require("uuid");
class GameManager {
    static generateKey() {
        // Generate a key
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        if (this.pendingGames[result]) {
            return this.generateKey();
        }
        else {
            this.pendingGames[result] = (0, uuid_1.v1)();
            return [result, this.pendingGames[result]];
        }
    }
    static getPendingGame(key) {
        return this.pendingGames[key];
    }
    static clearPendingGame(key) {
        delete this.pendingGames[key];
    }
    static createOngoingGame(id) {
        this.ongoingGames[id] = {};
    }
    static deleteOngoingGame(id) {
        if (this.ongoingGames[id]) {
            delete this.ongoingGames[id];
        }
    }
    static storeValue(id, key, value) {
        this.ongoingGames[id][key] = value;
    }
    static getValue(id, key) {
        return this.ongoingGames[id][key];
    }
}
exports.GameManager = GameManager;
GameManager.pendingGames = {};
GameManager.ongoingGames = {};
