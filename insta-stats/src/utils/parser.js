// src/utils/parser.js
// Parses Instagram data export JSON files into clean app data

export function parseFollowers(json) {
    try {
        const list = Array.isArray(json) ? json : []
        return list.map(entry => {
            const data = entry.string_list_data?.[0] ?? {}
            return {
                username: data.value ?? '',
                href: data.href ?? '',
                followedAt: data.timestamp ? new Date(data.timestamp * 1000).toISOString() : null,
            }
        }).filter(f => f.username)
    } catch {
        return []
    }
}

export function parseFollowing(json) {
    try {
        const list = json?.relationships_following ?? (Array.isArray(json) ? json : [])
        return list.map(entry => {
            const data = entry.string_list_data?.[0] ?? {}
            return {
                username: data.value ?? '',
                href: data.href ?? '',
                followingAt: data.timestamp ? new Date(data.timestamp * 1000).toISOString() : null,
            }
        }).filter(f => f.username)
    } catch {
        return []
    }
}

export function parseProfile(json) {
    try {
        const user = json?.profile_user?.[0]?.string_map_data ?? {}
        return {
            name: user['Name']?.value ?? '',
            username: user['Username']?.value ?? '',
            bio: user['Bio']?.value ?? '',
            joinedAt: user['Date joined']?.timestamp
                ? new Date(user['Date joined'].timestamp * 1000).toISOString()
                : null,
        }
    } catch {
        return {}
    }
}

export function diffSnapshots(prev, current) {
    if (!prev) return { unfollowed: [], newFollowers: [] }
    const prevSet = new Set(prev.map(f => f.username))
    const currSet = new Set(current.map(f => f.username))
    return {
        unfollowed: prev.filter(f => !currSet.has(f.username)),
        newFollowers: current.filter(f => !prevSet.has(f.username)),
    }
}

export function getNotFollowingBack(followers, following) {
    const followerSet = new Set(followers.map(f => f.username))
    return following.filter(f => !followerSet.has(f.username))
}

export function getNotFollowedBack(followers, following) {
    const followingSet = new Set(following.map(f => f.username))
    return followers.filter(f => !followingSet.has(f.username))
}