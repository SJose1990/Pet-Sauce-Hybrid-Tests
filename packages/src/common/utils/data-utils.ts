import { sample } from 'lodash';

export class DataUtils {
  // creates random Ids
  public static getRandomId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  // gets a random pet name
  public static getRandomPetName(): string {
    const names = ['Varkey', 'Shona', 'Salomi'];
    return sample(names) || 'PetName';
  }

  // creates a list of random tags
  public static generateRandomTags(count: number): { id: number; name: string }[] {
    const tags = [];
    const tagNames = ['super friendly', 'trained', 'energetic'];

    for (let i = 0; i < count; i++) {
      tags.push({
        id: this.getRandomId(),
        name: sample(tagNames) || 'tag'
      });
    }

    return tags;
  }
}
