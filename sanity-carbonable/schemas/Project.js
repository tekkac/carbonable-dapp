export default {

    name: "Name",
    slug: "Slug",
    saleIsOpen: "Sale Status",
    isSoldOut: "Soldout Status",
    saleDate: "sale date",
    contentReady: "readiness",
    fields: [
        {
           name: "Banegas Farm",
           slug: "reforestation-banegas-farm-costa-rica",
           saleIsOpen: false,
           isSoldOut: true,
           saleDate: new Date('2022-06-21T16:45:01.246Z'),
           contentReady: true
        },
        {
            name: "Las delicias",
            slug: "mangroves-las-delicias-panama",
            saleIsOpen: true,
            isSoldOut: false,
            saleDate: new Date('2022-12-21T16:45:01.246Z'),
            contentReady: true
         },
         {
             name: "Chaco Agroforestry",
             slug: "agroforestry-chaco-paraguay",
             saleIsOpen: true,
             isSoldOut: false,
             saleDate: new Date('2023-01-21T16:45:01.246Z'),
             contentReady: false
          }
    ]
    
}