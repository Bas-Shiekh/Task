class LangService {
  private static langName = "i18nextLng";

  public static getToken(): string | null {
    return localStorage.getItem(this.langName);
  }

  public static setToken(lang: string): void {
    localStorage.setItem(this.langName, lang);
  }

  public static destroyToken(): void {
    localStorage.removeItem(this.langName);
  }
}

export default LangService;
