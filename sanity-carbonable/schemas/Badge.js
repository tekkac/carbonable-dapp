export default {
  name: 'badge',
  type: 'document',
	title: 'Badge',
  of: [
    {
      name: 'name',
      type: 'block',
      title: 'Name'
    }
  ],
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
        name: 'content',
        type: 'array',
        title: 'page section',
        of: [
          {
            type: "block"
          }
        ]
 
     },
  ]
}