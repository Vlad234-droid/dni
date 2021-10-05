import { defineAPI } from '@energon/rest-api-definition';

import { Colleague, ColleagueList, ColleagueListRequestParams, ColleagueRequestParams } from './types';

export const colleagueApiDef = defineAPI((endpoint) => ({
  /**
   * Fetches colleague information for the specified coleagueUUID and effectiveOn date.
   * Parameter `coleagueUUID` is mandatory.
   * @see https://developers.tesco.com/explore/Colleague#/Colleague%20Facts%20API%20V2/get_v2_colleagues
   */
  getColleague: endpoint
    .get('/colleague/v2/colleagues/:colleagueUUID')
    .params<ColleagueRequestParams>()
    .response<Colleague>()
    .build(),

  /**
   * Find colleagues by search parameters mentioned below.
   * Get the list of colleagues by passing at least one of the following search parameters -
   *   `workRelationships.locationUUID`,
   *   `colleagueUUID`,
   *   `externalSystems.iam.id`,
   *   `externalSystems.hcm.id`,
   *   `employeeId`,
   *   `countryCode`,
   *   `externalSystems.sourceSystem`,
   *   `workRelationships.managerUUID`
   * Use effectiveFrom-effectiveTo range parameters to specify date range for which Colleagues data must be effective.
   * Both effectiveFrom and effectiveTo params must be provided or empty.
   * We can fetch fure and past records by providing the past or the future date respectively.
   * Today's date is the default value if none is provided.
   * Use updatedFrom-updatedTo range parameters to specify date time range for which Colleagues data was last updated.
   * @see https://developers.tesco.com/explore/Colleague#/Colleague%20Facts%20API%20V2/get_v2_colleagues__colleagueUUID_
   */
  getColleagues: endpoint
    .get('/colleague/v2/colleagues')
    .params<ColleagueListRequestParams>()
    .response<ColleagueList>()
    .build(),
}));
