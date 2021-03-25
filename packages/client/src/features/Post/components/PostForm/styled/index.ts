import styled from 'styled-components';

const PostPublisherAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const PostPublisherAvatarBox = styled.div`
  margin-right: 6px;
`;

const PostPublishersSelectBox = styled.div`
  max-width: 465px;
  flex-grow: 1;
`;

const PostFormFieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;
`;

const PostFormInputSubmit = styled.input.attrs(() => ({
  type: 'submit',
}))`
  margin-top: 24px;
  padding: 9px 19px 7px;
  font-size: 16px;
  line-height: 24px;
  border-radius: 30px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  outline: 0;
  border: 0;
  color: #ffffff;
  background-color: #00539f;
`;

const PostHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostContent = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
`;

const PostContentBox = styled.div`
  max-width: 465px;
  flex-grow: 1;
`;

const PostFormWrapper = styled.form`
  max-width: 561px;
  padding: 24px;
  border: 1px solid #d9e5f1;
  background-color: #e6eef5;
`;

export {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublishersSelectBox,
  PostFormFieldset,
  PostFormInputSubmit,
  PostHead,
  PostContent,
  PostContentBox,
  PostFormWrapper,
};
