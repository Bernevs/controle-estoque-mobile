export async function readPDF(base64: string) {
  const response = await fetch("http://192.168.100.247:3000/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64 }),
  });

  return response;
}
