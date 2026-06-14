// src/utils/pin.js
// Hashes PINs using SHA-256 so we never store them plain

export async function hashPin(pin) {
    const encoded = new TextEncoder().encode(pin)
    const buffer = await crypto.subtle.digest('SHA-256', encoded)
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

export async function verifyPin(pin, hash) {
    const attempt = await hashPin(pin)
    return attempt === hash
}