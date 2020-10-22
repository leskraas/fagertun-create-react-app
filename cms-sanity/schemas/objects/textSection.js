export default {
  type: 'object',
  name: 'textSection',
  title: 'Tekst',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Overskrift',
    },
    {
      name: 'text',
      type: 'portableText',
      title: 'Text',
    },
  ],
  preview: {
    select: {
      heading: 'heading',
    },
    prepare({ heading }) {
      return {
        title: `${heading}`,
        subtitle: 'Text section',
      };
    },
  },
};
