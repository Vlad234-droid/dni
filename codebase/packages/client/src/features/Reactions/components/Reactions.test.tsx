import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { cleanup, fireEvent, render, screen, act } from 'utils/testUtils';
import { EntityType } from 'types/entity';

import Reactions from './Reactions';
import { ContentType, ReactionType } from '../config/types';

describe('<Reactions />', () => {
  const mock = new MockAdapter(axios);
  const props = {
    entityId: 12345,
    entityType: EntityType.POST,
    addReaction: jest.fn(),
    deleteReaction: jest.fn(),
    reactions: {
      [ReactionType.SURPRISE]: 0,
      [ReactionType.SMILE]: 12,
      [ReactionType.LAUGH]: 8,
      [ReactionType.LIKE]: 65,
      [ReactionType.HEART]: 76,
    }
  };

  const userReaction = {
    type: ReactionType.HEART,
    id: props.entityId,
    reactionId: 2345,
    parent: {
      id: props.entityId,
      relatedId: props.entityId,
      relatedType: ContentType.POST,
    },
    externalAuthor: {
      email: 'mocked@tesco.com',
      username: 'mocked',
      id: 123,
    },
  };

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  describe('#render', () => {
    it('should return wrapper', () => {
      const { getByTestId } = render(<Reactions {...props} />);

      expect(getByTestId('reactions')).toBeInTheDocument();
    });

    it('should render items for each reaction type', () => {
      const { getByTestId } = render(<Reactions {...props} />);

      Object.keys(props.reactions).forEach((reaction) => {
        expect(getByTestId(`reactions-item-${reaction}`)).toBeInTheDocument();
      });
    });

    it('should render total reactions count', () => {
      const { getByTestId } = render(<Reactions {...props} />);

      expect(getByTestId('reactions-total-count')).toHaveTextContent('161');
    });

    it('should render reactions count by type', () => {
      const { getByTestId } = render(<Reactions {...props} />);

      Object.keys(props.reactions).forEach((reaction) => {
        expect(getByTestId(`reactions-count-${reaction}`)).toBeInTheDocument();
      });
    });

    it('it should render active icon for active user reaction', () => {
      const newProps = {
        ...props,
        userReaction,
      };

      const { getByTestId } = render(<Reactions {...newProps} />);

      expect(getByTestId(`reaction-icon-${newProps.userReaction.type}`)).toHaveStyle(`background-image: url(icon-${newProps.userReaction.type}-active.svg)`);
    });
  });

  describe('#handleReactionClick', () => {
    it('should not call props.addReaction or props.deleteReaction, !uuid', () => {
      const newProps = {
        ...props,
        userReaction,
      };

      render(<Reactions {...newProps} />);

      fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.LIKE}`));

      expect(newProps.deleteReaction).not.toHaveBeenCalled();
      expect(newProps.addReaction).not.toHaveBeenCalled();
    });

    it('should call props.addReaction with selected reaction data, !props.userReaction', async () => {
      const newProps = {
        ...props,
        uuid: 'mocked-uuid',
        addReaction: jest.fn(() => ({ payload: true })),
      };
      const expected = {
        type: ReactionType.LIKE,
        parent: {
          relatedId: newProps.entityId,
          relatedType: ContentType[newProps.entityType.toUpperCase()],
        },
        externalAuthor: {
          name: 'mocked-uuid',
          email: 'mocked-uuid@tesco.com',
          externalId: newProps.uuid,
        },
      };

      const { getByTestId } = render(<Reactions {...newProps} />);
      await act(async () => {
        fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.LIKE}`));
      });

      expect(newProps.deleteReaction).not.toHaveBeenCalled();
      expect(newProps.addReaction).toHaveBeenCalledWith(expected);

      expect(getByTestId(`reactions-count-${ReactionType.LIKE}`)).toHaveTextContent('66');
      expect(getByTestId('reactions-total-count')).toHaveTextContent('162');
    });

    it('should not call props.addReaction, if something was called already', async () => {
      const newProps = {
        ...props,
        uuid: 'mocked-uuid',
        addReaction: jest.fn(() => ({ payload: false })),
      };

      const { getByTestId } = render(<Reactions {...newProps} />);
      await act(async () => {
        fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.LIKE}`));
      });
      await act(async () => {
        fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.LIKE}`));
      });

      expect(newProps.deleteReaction).not.toHaveBeenCalled();
      expect(newProps.addReaction).toHaveBeenCalledTimes(1);

      expect(getByTestId(`reactions-count-${ReactionType.LIKE}`)).toHaveTextContent('66');
      expect(getByTestId('reactions-total-count')).toHaveTextContent('162');
    });

    it('should call props.deleteReaction, if props.userReaction already exists and click was fired on props.userReaction.type', async () => {
      const newProps = {
        ...props,
        uuid: 'mocked-uuid',
        deleteReaction: jest.fn(() => ({ payload: true })),
        userReaction,
      };

      const { getByTestId } = render(<Reactions {...newProps} />);
      await act(async () => {
        fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.HEART}`));
      });

      expect(newProps.addReaction).not.toHaveBeenCalled();
      expect(newProps.deleteReaction).toHaveBeenCalledWith({
        uuid: newProps.uuid,
        reactionId: newProps.userReaction.reactionId,
        entityId: newProps.entityId,
      });

      expect(getByTestId(`reactions-count-${ReactionType.HEART}`)).toHaveTextContent('75');
      expect(getByTestId('reactions-total-count')).toHaveTextContent('160');
    });

    it('should not call props.deleteReaction, if something was called already', async () => {
      const newProps = {
        ...props,
        uuid: 'mocked-uuid',
        userReaction,
        deleteReaction: jest.fn(() => ({ payload: false })),
        addReaction: jest.fn(() => ({ payload: false })),
      };

      const { getByTestId } = render(<Reactions {...newProps} />);
      await act(async () => {
        fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.HEART}`));
      });
      await act(async () => {
        fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.HEART}`));
      });

      expect(newProps.addReaction).not.toHaveBeenCalled();
      expect(newProps.deleteReaction).toHaveBeenCalledTimes(1);

      expect(getByTestId(`reactions-count-${ReactionType.HEART}`)).toHaveTextContent('75');
      expect(getByTestId('reactions-total-count')).toHaveTextContent('160');
    });

    it('should call props.deleteReaction and props.addReaction, if props.userReaction already exists and click was fired on another reaction type', async () => {
      const newProps = {
        ...props,
        uuid: 'mocked-uuid',
        userReaction,
        deleteReaction: jest.fn(() => ({ payload: true })),
        addReaction: jest.fn(() => ({ payload: true })),
      };

      const { getByTestId } = render(<Reactions {...newProps} />);
      await act(async () => {
        fireEvent.click(screen.getByTestId(`reactions-item-${ReactionType.SMILE}`));
      });

      expect(newProps.deleteReaction).toHaveBeenCalledWith({
        uuid: newProps.uuid,
        reactionId: newProps.userReaction.reactionId,
        entityId: newProps.entityId,
      });

      expect(newProps.addReaction).toHaveBeenCalledWith({
        type: ReactionType.SMILE,
        parent: {
          relatedId: newProps.entityId,
          relatedType: ContentType[newProps.entityType.toUpperCase()],
        },
        externalAuthor: {
          name: 'mocked-uuid',
          email: 'mocked-uuid@tesco.com',
          externalId: newProps.uuid,
        },
      });

      expect(getByTestId(`reactions-count-${ReactionType.HEART}`)).toHaveTextContent('75');
      expect(getByTestId(`reactions-count-${ReactionType.SMILE}`)).toHaveTextContent('13');
      expect(getByTestId('reactions-total-count')).toHaveTextContent('161');
    });
  });
});
