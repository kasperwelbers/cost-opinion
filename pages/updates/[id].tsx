export async function getStaticPaths({}) {
  const updates = fs.readdirSync("content/pages/updates");
  const paths = updates.map((u) => ({
    params: { id: u.replace(/\.md$/, "") },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
