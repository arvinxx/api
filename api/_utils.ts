export const success = <T = any>(data: T) => {
  return { success: true, data };
};
