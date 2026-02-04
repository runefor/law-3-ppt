const BASE_PATH = "/law-3-ppt";

/**
 * 정적 asset 경로에 basePath 프리픽스를 추가합니다.
 *
 * next/image, next/link는 basePath를 자동 처리하지만,
 * `<img>`, `<video>`, `new Image()` 등 raw HTML 태그는 수동 처리가 필요합니다.
 *
 * @param path - 슬래시(/)로 시작하는 asset 경로
 * @returns basePath가 프리픽스된 경로
 */
export function assetPath(path: string): string {
  if (!path || !path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
