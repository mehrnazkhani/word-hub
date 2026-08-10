export const readJson = (file: File): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        resolve(parsed);
      } catch (error) {
        reject(new Error("Invalid JSON file."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file."));

    reader.readAsText(file);
  });
};
