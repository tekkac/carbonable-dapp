export default {

    name: 'project',
    type: 'document',
    title: 'Projet',
    fields: [
        {
           name: 'name',
           type: 'string',
           title: 'Name',

        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: 'title',
                maxLenght: 96,
            },
 
         },
         {
            name: 'saleIsOpen',
            type: 'boolean',
            title: 'Sale status',
 
         },
         {
            name: 'isSoldOut',
            type: 'boolean',
            title: 'Sold out status',
 
         },
         {
            name: 'contentReady',
            type: 'boolean',
            title: 'Readiness',
 
         },
         {
            name: 'saleDate',
            type: 'date',
            title: 'Sale date',
 
         },
         {
            name: 'text',
            type: 'text',
            title: 'Sale date',
            options: {
                isHighlighted: true
              }
 
         },
       
    ]
    
}