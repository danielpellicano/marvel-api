export default async function handler(req: any, res: any) {
  // Using a fetch here but could be any async operation to an external source
  const response = await fetch(
    "https://gateway.marvel.com:443/v1/public/characters?apikey=55d7da261234d478c5daea8fecf2248e"
  );
  const jsonData = await response.json();
  res.status(200).json(jsonData);
}
