import { expect, test, describe, Mock } from 'vitest';
import { AddApplicationStatusUpdateUseCase } from './add-application-status-update.uc';
import { ApplicationRepoTrait } from '@permit-watch/domain';
import { Ok } from 'types-ddd';

type MockedApplicationRepositoryTrait = ApplicationRepoTrait & {
  fetchForId: Mock;
  save: Mock;
};

const MockApplicationRepo = vi.fn();
MockApplicationRepo.prototype.fetchForId = vi.fn();
MockApplicationRepo.prototype.save = vi.fn();

describe('UC: AddApplicationStatusUpdate', () => {
  let applicationRepo: MockedApplicationRepositoryTrait;

  beforeEach(() => {
    applicationRepo = new MockApplicationRepo();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('exists', () => {
    const useCase = new AddApplicationStatusUpdateUseCase({
      applicationRepo,
    });
    expect(useCase).toBeDefined();
  });

  test('can be executed', async () => {
    // Arrange
    applicationRepo.save.mockResolvedValueOnce(Ok());
    const useCase = new AddApplicationStatusUpdateUseCase({
      applicationRepo,
    });

    // Act
    const result = await useCase.execute({});

    // Expect
    expect(result.isOk()).toBeTruthy();
    expect(applicationRepo.save).toBeCalledTimes(1);
  });

  // test('can be executed with valid input', async () => {
  //   // Arrange
  //   applicationRepo.save.mockResolvedValueOnce(Ok());
  //   const useCase = new CreateNoteUseCase({
  //     applicationRepo,
  //   });

  //   // Act
  //   const result = await useCase.execute({
  //     name: {
  //       value: 'Custom Note',
  //     },
  //     body: {
  //       value: 'Custom Note Body',
  //     },
  //   });

  //   // Expect
  //   expect(result.isOk()).toBeTruthy();
  //   expect(applicationRepo.save).toBeCalledTimes(1);
  // });

  // test('can be executed with invalid input', async () => {
  //   // Arrange
  //   applicationRepo.save.mockResolvedValueOnce(Ok());
  //   const useCase = new CreateNoteUseCase({
  //     applicationRepo,
  //   });

  //   // Act
  //   const result = await useCase.execute({
  //     name: {
  //       value: 'C',
  //     },
  //   });

  //   // Expect
  //   expect(result.isFail()).toBeTruthy();
  //   expect(applicationRepo.save).not.toBeCalled();
  // });
});
