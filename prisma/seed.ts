import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProjects().map((project) => {
      return db.projects.create({ data: project });
    })
  );
}

seed();

function getProjects() {
    return [
        {
           slug: "reforestation-banegas-farm-costa-rica",
           saleDate: new Date('2022-06-21T16:45:01.246Z'),
           contentReady: true,
           estimatedAPR: "51%",
           minterContract: "0x07f8f1b0b96850acd8ee9a1bd53fb61d83a4142c11b50eb2841e82d8fa6855d7"
        },
        {
            slug: "mangroves-las-delicias-panama",
            saleDate: new Date('2022-12-21T16:45:01.246Z'),
            contentReady: true,
            estimatedAPR: "51%",
            minterContract: "0x014a91ee40db7b8568ce12abb7d6097272021f2c8f629cdcb39a0ac7ee33b61c"
         },
         {
             slug: "agroforestry-chaco-paraguay",
             saleDate: new Date('2023-01-21T16:45:01.246Z'),
             contentReady: true,
             estimatedAPR: "51%",
             minterContract: "0x075b32e934b5f47eba8ab4b7461565db6abe11144642a5bc172cb092fc5cffea"
          }
    ]
}