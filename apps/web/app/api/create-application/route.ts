// import { useCases } from '@permit-watch/infra';
export async function GET(request: Request) {
  try {
    // const result = await useCases.createApplicationUseCase.execute({});
    // if (result.isFail()) return new Response(result.error(), { status: 400 });
    return new Response(
      JSON.stringify({
        message: 'ok',
      })
    );
  } catch (error) {}
  return new Response('Something went wrong', { status: 400 });
}
