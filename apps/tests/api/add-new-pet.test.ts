import testConfig from '@test-config';
import { PetApi, PetStatus } from '@test/api/pet-api';
import { DataUtils } from '@test/common/utils/data-utils';

describe('Pet Store API -  Add Pet Suite', () => {
  let petApi: PetApi;

  beforeAll(() => {
    petApi = new PetApi(testConfig);
  });

  test('[TC-PET-01]: Add pet request with valid payload', async () => {
    const petId = DataUtils.getRandomId();
    const petName = DataUtils.getRandomPetName();
    const petTags = DataUtils.generateRandomTags(2);
    const petPhotos = ['https://cdn.petstore.com/images/dogs/golden-retriever-playing.jpg'];

    const payload = {
      id: petId,
      category: { id: 1, name: 'Dogs' },
      name: petName,
      photoUrls: petPhotos,
      tags: petTags,
      status: PetStatus.Available
    };
    const response = await petApi.addPet(payload);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(petId);
    expect(response.data.name).toBe(petName);
    expect(response.data.status).toBe(PetStatus.Available);
    expect(response.data.photoUrls).toContain(petPhotos[0]);
    expect(response.data.photoUrls).toContain(
      'https://cdn.petstore.com/images/dogs/golden-retriever-playing.jpg'
    );
    expect(response.data.tags[0].name).toBe(petTags[0].name);
  });

  test('[TC-PET-02]: Add pet with missing mandatory fields', async () => {
    const payload = {
      id: DataUtils.getRandomId(),
      status: PetStatus.Sold
    };
    const response = await petApi.addPet(payload);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(payload.id);
  });

  test('[TC-PET-03]: Add pet with multiple photo urls', async () => {
    const payload = {
      id: DataUtils.getRandomId(),
      name: 'Cat',
      photoUrls: [
        'https://cdn.petstore.com/images/cats/maine-coon-resting.jpg',
        'https://cdn.petstore.com/images/cats/siamese-window.jpg'
      ],
      status: PetStatus.Available
    };

    const response = await petApi.addPet(payload);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(payload.id);
    expect(response.data.photoUrls.length).toBe(2);
  });

  test('[TC-PET-04]: Add pet without id should auto generate id', async () => {
    const petName = DataUtils.getRandomPetName();
    const payload = {
      name: petName,
      photoUrls: ['https://cdn.petstore.com/images/dogs/golden-retriever-playing.jpg'],
      status: PetStatus.Available
    };
    const response = await petApi.addPet(payload);
    expect(response.status).toBe(200);
    expect(response.data.id).toBeDefined();
    expect(response.data.name).toBe(petName);
  });

  test('[TC-PET-05]: Add Pet with the same Id', async () => {
    const duplicateId = DataUtils.getRandomId();
    const pet1 = { id: duplicateId, name: 'First', photoUrls: [], status: PetStatus.Available };
    const pet2 = { id: duplicateId, name: 'Second', photoUrls: [], status: PetStatus.Available };
    const response1 = await petApi.addPet(pet1);
    expect(response1.status).toBe(200);
    const response2 = await petApi.addPet(pet2);
    expect(response2.status).toBe(200);
  });

  test('[TC-PET-06]: Add pet with string in the id field', async () => {
    // Passing a string where an integer is expected
    const response = await petApi.addPet({
      id: 'not-an-integer',
      name: 'Dog',
      status: PetStatus.Pending
    });
    expect(response.status).toBe(500);
  });

  test('[TC-PET-07]: Add Pet with special characters in the name', async () => {
    const payload = {
      id: DataUtils.getRandomId(),
      name: 'á, é, í, ó, ú',
      photoUrls: ['https://pets.com/photo1.jpg'],
      status: PetStatus.Available
    };
    const response = await petApi.addPet(payload);
    expect(response.status).toBe(200);
  });

  test('[TC-PET-08]: Add Pet with malformed JSON body', async () => {
    const response = await petApi.apiRequest({
      method: 'POST',
      url: '/pet',
      data: '{ "name": "oops , "photoUrls": [] }',
      headers: { 'Content-Type': 'application/json' }
    });

   expect(response.status).toBe(500);
  });

  test('[TC-PET-09]: Add a pet with invalid endpoint path', async () => {
    const response = await petApi.apiRequest({
      method: 'POST',
      url: '/pet/route/does/not/exist',
      data: { name: 'DOg' }
    });
    expect(response.status).toBe(404);
  });

  test('[TC-PET-10]: Add a pet with unsupported content type', async () => {
    const response = await petApi.apiRequest({
      method: 'POST',
      url: '/pet',
      data: 'name=test',
      headers: { 'Content-Type': 'text/plain' }
    });
    expect(response.status).toBe(415);
  });

  test('[TC-PET-11]: Add a pet with undefined status value', async () => {
    const pet1 = { id: 123, name: 'First', photoUrls: [], status: 'incorrect_status' };
    const response = await petApi.addPet(pet1);
    expect(response.status).toBe(200);
  });
});
