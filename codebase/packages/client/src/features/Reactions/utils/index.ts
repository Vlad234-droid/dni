export const getAddReactionFilters = ({ type, entityId, entityType, uuid }) => ({
  type,
  parent: {
    relatedId: entityId,
    relatedType: `application::${entityType}.${entityType}`,
  },
  externalAuthor: {
    name: 'mocked',
    email: 'mocked@tesco.com',
    externalId: uuid,
  },
});