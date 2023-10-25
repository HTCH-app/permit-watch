import { expect, test, describe } from 'vitest';
import { AddApplicationStatusUpdateUseCase } from './add-application-status-update.uc';

// type MockedNoteRepositoryTrait = NoteRepositoryTrait & {
//   fetchForId: Mock;
//   existsForId: Mock;
//   save: Mock;
// };

// const MockNotesRepo = vi.fn();
// MockNotesRepo.prototype.fetchForId = vi.fn();
// MockNotesRepo.prototype.existsForId = vi.fn();
// MockNotesRepo.prototype.save = vi.fn();

describe('UC: AddApplicationStatusUpdate', () => {
  // let notesRepo: MockedNoteRepositoryTrait;

  // beforeEach(() => {
  //   notesRepo = new MockNotesRepo();
  // });

  // afterEach(() => {
  //   vi.clearAllMocks();
  // });

  test('exists', () => {
    const useCase = new AddApplicationStatusUpdateUseCase({});
    expect(useCase).toBeDefined();
  });

  // test('can be executed', async () => {
  //   // Arrange
  //   notesRepo.save.mockResolvedValueOnce(Ok());
  //   const useCase = new CreateNoteUseCase({
  //     notesRepo,
  //   });

  //   // Act
  //   const result = await useCase.execute();

  //   // Expect
  //   expect(result.isOk()).toBeTruthy();
  //   expect(notesRepo.save).toBeCalledTimes(1);
  // });

  // test('can be executed with valid input', async () => {
  //   // Arrange
  //   notesRepo.save.mockResolvedValueOnce(Ok());
  //   const useCase = new CreateNoteUseCase({
  //     notesRepo,
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
  //   expect(notesRepo.save).toBeCalledTimes(1);
  // });

  // test('can be executed with invalid input', async () => {
  //   // Arrange
  //   notesRepo.save.mockResolvedValueOnce(Ok());
  //   const useCase = new CreateNoteUseCase({
  //     notesRepo,
  //   });

  //   // Act
  //   const result = await useCase.execute({
  //     name: {
  //       value: 'C',
  //     },
  //   });

  //   // Expect
  //   expect(result.isFail()).toBeTruthy();
  //   expect(notesRepo.save).not.toBeCalled();
  // });
});
