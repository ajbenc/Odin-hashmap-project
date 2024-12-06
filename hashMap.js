class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => new Map());
    this.size = 0;
  }

  hash(key) {
    if (typeof key !== "string") {
      throw new TypeError("Key must be a string");
    }
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) >>> 0;
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    if (key === null || key === undefined) {
      throw new Error("Key cannot be null or undefined");
    }
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket.has(key)) {
      bucket.set(key, value); // Update value
    } else {
      bucket.set(key, value);
      this.size++;
    }

    if (this.size / this.capacity > this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    if (key === null || key === undefined) {
      throw new Error("Key cannot be null or undefined");
    }
    const index = this.hash(key);
    const bucket = this.buckets[index];

    return bucket.get(key) || null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    if (key === null || key === undefined) {
      throw new Error("Key cannot be null or undefined");
    }
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket.delete(key)) {
      this.size--;
      return true;
    }

    return false;
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => new Map());
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value); // Rehash existing entries
      }
    }
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => new Map());
    this.size = 0;
  }

  keys() {
    return this.buckets.flatMap((bucket) => Array.from(bucket.keys()));
  }

  values() {
    return this.buckets.flatMap((bucket) => Array.from(bucket.values()));
  }

  entries() {
    return this.buckets.flatMap((bucket) => Array.from(bucket.entries()));
  }

  getLoadFactor() {
    return this.size / this.capacity;
  }

  forEach(callback) {
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        callback(key, value);
      }
    }
  }
}

export default HashMap;
