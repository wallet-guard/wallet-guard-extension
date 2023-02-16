export async function getAllExtensions(): Promise<chrome.management.ExtensionInfo[]> {
  return chrome.management.getAll()
}

