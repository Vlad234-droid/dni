import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { buildEventCRUD } from '@dni/mock-server/src/crud';
import { DateTime } from 'luxon';

import { isoDateToFormat, FULL_FORMAT } from 'utils/date';
import { cleanup, act, render } from 'utils/testUtils';
import Loading from 'types/loading';
import { VERTICAL_TILE_TEST_ID, HORIZONTAL_TILE_TEST_ID } from 'features/Tile';
import { DEFAULT_FILTERS } from 'config/constants';

import EventSidebar, { TEST_ID, FILTERS } from './EventSidebar';

describe('<EventSidebar />', () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  describe('#render', () => {
    const props = {
      events: [],
      loading: Loading.PENDING,
      loadEvents: jest.fn(),
      loadCount: jest.fn(),
      loadParticipants: jest.fn(),
      handleClear: jest.fn(),
      participants: {},
      networks: [1, 2],
    };

    it ('should render wrapper' , () => {
      const { getByTestId } = render(<EventSidebar {...props} />);

      expect(getByTestId(TEST_ID)).toBeInTheDocument();
    });

    it('should render error, if provided', () => {
      const newProps = {
        ...props,
        error: 'mocked-error',
      };

      const { getByText, getByTestId } = render(<EventSidebar {...newProps} />);

      expect(getByText('mocked-error')).toBeInTheDocument();
      expect(getByTestId('error')).toBeInTheDocument();
    });

    it('should render Loading state is loading is pending and events are empty', () => {
      const { queryByTestId } = render(<EventSidebar {...props} />);

      expect(queryByTestId('spinner')).toBeInTheDocument();
    });

    it('should render eventsList, if events provided', () => {
      const COLLECTION_SIZE = 2;
      const eventCRUD = buildEventCRUD(COLLECTION_SIZE);

      const events = eventCRUD.findAll();
      const newProps = {
        ...props,
        events,
      };

      const { getByTestId } = render(<EventSidebar {...newProps} />);

      expect(getByTestId('sidebar-events-list')).toBeInTheDocument();
    });

    it('should render empty container, if loading is succeeded and no events', () => {
      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
      };

      const { getByTestId, getByText } = render(<EventSidebar {...newProps} />);

      expect(getByText('Nothing to show')).toBeInTheDocument();
      expect(getByTestId('empty-container')).toBeInTheDocument();
    });

    it('should render large tile, if 1 event in the list', () => {
      const COLLECTION_SIZE = 1;
      const eventCRUD = buildEventCRUD(COLLECTION_SIZE);

      const events = eventCRUD.findAll();

      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
        events,
      };

      const { queryAllByTestId, queryByText } = render(<EventSidebar {...newProps} />);

      expect(queryAllByTestId(VERTICAL_TILE_TEST_ID)).toHaveLength(1);
      expect(queryAllByTestId(HORIZONTAL_TILE_TEST_ID)).toHaveLength(0);
      expect(queryByText('All events')).toBeInTheDocument();
    });

    it('should render 1 large and 1 small tiles, if 2 events in the list', () => {
      const COLLECTION_SIZE = 2;
      const eventCRUD = buildEventCRUD(COLLECTION_SIZE);

      const events = eventCRUD.findAll();

      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
        events,
      };

      const { queryAllByTestId, queryByText } = render(<EventSidebar {...newProps} />);

      expect(queryAllByTestId(VERTICAL_TILE_TEST_ID)).toHaveLength(1);
      expect(queryAllByTestId(HORIZONTAL_TILE_TEST_ID)).toHaveLength(1);
      expect(queryByText('All events')).toBeInTheDocument();
    });

    it('should render 1 large and 2 small tiles, if 3 events in the list', () => {
      const COLLECTION_SIZE = 3;
      const eventCRUD = buildEventCRUD(COLLECTION_SIZE);

      const events = eventCRUD.findAll();

      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
        events,
      };

      const { queryAllByTestId, queryByText } = render(<EventSidebar {...newProps} />);

      expect(queryAllByTestId(VERTICAL_TILE_TEST_ID)).toHaveLength(1);
      expect(queryAllByTestId(HORIZONTAL_TILE_TEST_ID)).toHaveLength(2);
      expect(queryByText('All events')).toBeInTheDocument();
    });

    it('should render On-Air, if event is happening now', () => {
      const COLLECTION_SIZE = 1;
      const eventCRUD = buildEventCRUD(COLLECTION_SIZE);

      const events = eventCRUD.findAll();
      const OnAirEvent = {
        ...events[0],
        startDate: isoDateToFormat(DateTime.now().minus({ days: 1 }).toISO(), FULL_FORMAT),
        endDate: isoDateToFormat(DateTime.now().plus({ days: 2 }).toISO(), FULL_FORMAT),
      };

      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
        events: [OnAirEvent],
      };

      const { queryByText } = render(<EventSidebar {...newProps} />);

      expect(queryByText('On-Air')).toBeInTheDocument();
    });
  });

  describe('#useEffect', async () => {
    afterEach(() => {
      cleanup();
    });

    const props = {
      events: [],
      loading: Loading.IDLE,
      loadEvents: jest.fn(),
      loadCount: jest.fn(),
      loadParticipants: jest.fn(),
      handleClear: jest.fn(),
      participants: {},
      total: 0,
      networks: [1, 2],
    };

    it('should call handleClear, loadEvents', async () => {
      const filters = {
        ...FILTERS,
        ...DEFAULT_FILTERS,
        _publicationState: 'preview',
        published_at_null: false,
        _where: {
          _or: [
            { network_null: true },
            { network_in: [...props.networks] },
          ],
        },
      };

      await act(async () => {
        render(<EventSidebar {...props} />);
      });

      expect(props.handleClear).toHaveBeenCalledTimes(1);
      expect(props.loadEvents).toHaveBeenCalledTimes(1);
      expect(props.loadEvents).toHaveBeenCalledWith(filters);
    });

    it('should call loadParticipants, if empty participants', async () => {
      await act(async () => {
        render(<EventSidebar {...props} />);
      });

      expect(props.loadParticipants).toHaveBeenCalledTimes(1);
    });
  });
});
