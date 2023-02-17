// https://github.com/panstromek/zebra-rs/blob/82d616225930b3ad423a2c6d883c79b94ee08ba6/webzebra/src/stopToken.ts

export function createStopToken(): string {
  return URL.createObjectURL(new Blob())
}

export function stop(stopToken: string): void {
  return URL.revokeObjectURL(stopToken)
}

export function checkStopToken(stopToken: string): boolean {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", stopToken, false)
  try {
    xhr.send(null)
  } catch {
    return true
  }
  return false
}
