import { CommonCcmsEntity } from './CommonCcmsEntity';
import { DniEntityTypeEnum, CcmsEntity, CcmsEntityKey } from '../entities';
import { slugify } from '../utils';

/**
 * Extract parents info from entity
 * @param entity CCMS (Strapi) entity
 * @returns object with parents
 */
 const extractCmsEntityParents = <TDate = string>(entity: CommonCcmsEntity<TDate>) => {
  const parentEvent = Array.isArray(entity.event) 
    ? entity.event[0] 
    : typeof entity.event === 'object'
    ? entity.event as CommonCcmsEntity<TDate>
    : undefined;

  const parentNetworks = Array.isArray(entity.network)
    ? entity.network as Array<CommonCcmsEntity<TDate>>
    : typeof entity.network === 'object'
    ? [ entity.network as CommonCcmsEntity<TDate> ]
    : undefined;

  const result: Partial<{ parentEvent: CcmsEntityKey, parentNetworks: CcmsEntityKey[] }> = {};

  if (parentEvent) {
    result.parentEvent = { 
      entityId: parentEvent.id, 
      entityType: DniEntityTypeEnum.EVENT,
    };
  } else if (parentNetworks) {
    result.parentNetworks = parentNetworks.map<CcmsEntityKey>(({ id }) => ({ 
      entityId: id, 
      entityType: DniEntityTypeEnum.NETWORK,
    }));
  }

  //#region need to be removed when DB structure will be updated
  const parents: CcmsEntityKey[] = [];
  if (Array.isArray(entity.event)) {
    const parentEvents = entity.event.map(p => { return { entityId: p.id, entityType: DniEntityTypeEnum.EVENT }});
    parents.push(...parentEvents);
  } else if (!!entity.event && typeof entity.event === 'object' && !Array.isArray(entity.event)) {
    const parentEvent = { entityId: (entity.event as CommonCcmsEntity<TDate>)?.id, entityType: DniEntityTypeEnum.EVENT };
    parents.push(parentEvent);
  }
  if (Array.isArray(entity.network)) {
    const parentNetworks = entity.network.map(p => { return { entityId: p.id, entityType: DniEntityTypeEnum.NETWORK }});
    parents.push(...parentNetworks);
  } else if (!!entity.network && typeof entity.network === 'object' && !Array.isArray(entity.network)) {
    const parentNetwork = { entityId: (entity.network as CommonCcmsEntity<TDate>)?.id, entityType: DniEntityTypeEnum.NETWORK };
    parents.push(parentNetwork);
  }
  //#endregion

  if (parentEvent || (parentNetworks && parentNetworks.length > 0) || parents.length > 0) {
    const parentEntityType = parentEvent?.id
      ? DniEntityTypeEnum.EVENT
      : parentNetworks && parentNetworks.length > 0
      ? DniEntityTypeEnum.NETWORK
      : undefined;

    const parentEntityId = parentEvent?.id
      ? parentEvent.id
      : parentNetworks && parentNetworks.length > 0
      ? parentNetworks[0].id
      : undefined;

    return {
      parents,
      parentEntityId,
      parentEntityType,
      ...result
    };
  } else {
    return undefined;
  }
};

/**
 * Converts CCMS entity to DB repository format
 * @param entity CCMS (Strapi) entity
 * @returns 
 */
export const transformEntity = <TDate = string>(
    entity: CommonCcmsEntity<TDate>,
  ): Partial<CcmsEntity> | undefined => {

  if (entity === null || entity === undefined) {
    return undefined;
  }

  const parents = extractCmsEntityParents<TDate>(entity);

  return {
    slug: entity.slug || slugify(entity.title),
    entityInstance: entity,
    ...parents,
  };
}