// export default async function handler(req, res) {
//   const targetUrl = `http://34.96.206.251:8080${req.url.replace("/api", "")}`;
//   const response = await fetch(targetUrl, {
//     method: req.method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(req.headers.authorization && {
//         authorization: req.headers.authorization,
//       }),
//     },
//     body: ["POST", "PUT", "PATCH"].includes(req.method)
//       ? JSON.stringify(req.body)
//       : undefined,
//   });

//   const data = await response.json();
//   res.status(response.status).json(data);
// }
