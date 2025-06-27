export const fetchGitHubProjects = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  return res.json();
};