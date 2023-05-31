class localCache {
  public static getItem(key: string) {
    const val = localStorage.getItem(key);
    if (val) {
      return val;
    }
    return sessionStorage.getItem(key);
  }

  public static setItem(key: string, value: string, inLocal = true) {
    if (inLocal) {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  public static clear() {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export default localCache;
