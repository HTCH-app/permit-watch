import { expect, test, describe, Mock } from 'vitest';
import { SignUpUserUseCase } from './signup-user.uc';
import { UserServiceTrait } from '@permit-watch/domain';
import { Ok } from 'types-ddd';

type MockedUserServiceTrait = UserServiceTrait & {
  registerUser: Mock;
};

const MockUserService = vi.fn();
MockUserService.prototype.registerUser = vi.fn();

describe('UC: CreateApplication', () => {
  let userService: MockedUserServiceTrait;

  beforeEach(() => {
    userService = new MockUserService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('exists', () => {
    const useCase = new SignUpUserUseCase({
      userService,
    });
    expect(useCase).toBeDefined();
  });

  test('can be executed', async () => {
    // Arrange
    userService.registerUser.mockResolvedValueOnce(Ok());
    const useCase = new SignUpUserUseCase({
      userService,
    });

    // Act
    const result = await useCase.execute({});

    // Expect
    expect(result.isOk()).toBeTruthy();
    expect(userService.registerUser).toBeCalledTimes(1);
  });

  // test('can be executed with valid input', async () => {
  //   // Arrange
  //   userService.save.mockResolvedValueOnce(Ok());
  //   const useCase = new CreateNoteUseCase({
  //     userService,
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
  //   expect(userService.save).toBeCalledTimes(1);
  // });

  // test('can be executed with invalid input', async () => {
  //   // Arrange
  //   userService.save.mockResolvedValueOnce(Ok());
  //   const useCase = new CreateNoteUseCase({
  //     userService,
  //   });

  //   // Act
  //   const result = await useCase.execute({
  //     name: {
  //       value: 'C',
  //     },
  //   });

  //   // Expect
  //   expect(result.isFail()).toBeTruthy();
  //   expect(userService.save).not.toBeCalled();
  // });
});
