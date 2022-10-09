export default async function prepareUpdatesContent(id) {
  const content = await import(`../content/pages/updates/${id}.md`);
}
