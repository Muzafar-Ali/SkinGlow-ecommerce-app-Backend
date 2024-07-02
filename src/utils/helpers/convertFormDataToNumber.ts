
export const convertFormDataToNumber = (formData: any) => {
  ["price", "stock"].forEach((key) => {
    const value = formData[key];
    try {
      formData[key] = Number(value);
    } catch (error) {
      console.error(`Error converting field '${key}' to number:`, error);
      // You can choose to throw a specific error here or ignore the conversion
    }
  });
}
