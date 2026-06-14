// src/utils/storage.js
// All localStorage reads/writes go through here

const PREFIX = 'instatrack'

export const storage = {
    getAccounts() {
        return JSON.parse(localStorage.getItem(`${PREFIX}:accounts`) || '[]')
    },

    saveAccounts(accounts) {
        localStorage.setItem(`${PREFIX}:accounts`, JSON.stringify(accounts))
    },

    getAccount(username) {
        return JSON.parse(localStorage.getItem(`${PREFIX}:account:${username}`) || 'null')
    },

    saveAccount(username, data) {
        localStorage.setItem(`${PREFIX}:account:${username}`, JSON.stringify(data))
    },

    getSnapshots(username) {
        return JSON.parse(localStorage.getItem(`${PREFIX}:snapshots:${username}`) || '[]')
    },

    saveSnapshots(username, snapshots) {
        localStorage.setItem(`${PREFIX}:snapshots:${username}`, JSON.stringify(snapshots))
    },

    deleteAccount(username) {
        const accounts = this.getAccounts().filter(a => a !== username)
        this.saveAccounts(accounts)
        localStorage.removeItem(`${PREFIX}:account:${username}`)
        localStorage.removeItem(`${PREFIX}:snapshots:${username}`)
    },
}