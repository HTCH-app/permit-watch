const createApplication = async () => {
  const res = await fetch(`http://localhost:4200/api/create-application`, {
    next: { revalidate: 10 },
  });

  const data = await res.json();
  return data;
};

export const IndexPage = async () => {
  await createApplication();
  return <div>ok</div>;
};

export default IndexPage;
