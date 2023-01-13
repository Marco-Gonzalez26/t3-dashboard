import { getToken } from "next-auth/jwt";



export default async (req: any, res: any) => {
  const token = await getToken({ req });

  console.log(token);
  res.status(200).json("Hola");
};
