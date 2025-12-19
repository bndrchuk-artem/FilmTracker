export class InMemoryStorage<T> {
  private storage: Map<string, T> = new Map();

  set(key: string, value: T): void {
    this.storage.set(key, value);
  }

  get(key: string): T | undefined {
    return this.storage.get(key);
  }

  getAll(): T[] {
    return Array.from(this.storage.values());
  }

  delete(key: string): boolean {
    return this.storage.delete(key);
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  clear(): void {
    this.storage.clear();
  }

  find(predicate: (value: T) => boolean): T | undefined {
    return Array.from(this.storage.values()).find(predicate);
  }

  filter(predicate: (value: T) => boolean): T[] {
    return Array.from(this.storage.values()).filter(predicate);
  }
}
