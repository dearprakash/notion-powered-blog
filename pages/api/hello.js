import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const databaseId = process.env.NOTION_DATABASE_ID

export default async (req, res) => {
  const response = await notion.databases.query({ database_id: databaseId });
  res.status(200).json({ response });

};
// export default async function addItem(text) {
//   try {
//     const response = await notion.pages.create({
//       parent: { database_id: databaseId },
//       properties: {
//         title: { 
//           title:[
//             {
//               "text": {
//                 "content": "Yurts in Big Sur, California"
//               }
//             }
//           ]
//         }
//       },
//     })
//     console.log(response)
//     console.log("Success! Entry added.")
//   } catch (error) {
//     console.error(error.body)
//   }
// }
