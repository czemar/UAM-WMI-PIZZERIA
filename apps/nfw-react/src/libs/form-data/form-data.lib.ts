export function fromObject(obj: any) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]: [string, any]) => {
      formData.append(key, value);
  });

  return formData;
}