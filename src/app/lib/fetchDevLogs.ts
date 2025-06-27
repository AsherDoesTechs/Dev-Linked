export const fetchDevlogs = async (page: number, limit = 4) => {
  await new Promise((r) => setTimeout(r, 1000)); // Simulate loading

  return Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i,
    user: `devuser_${page * limit + i}`,
    content: `🚀 Update #${page * limit + i} – Working on something awesome!`,
  }));
};
