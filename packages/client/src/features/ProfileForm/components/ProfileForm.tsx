import React, { FC } from 'react';

import { TextInput, FieldWrapper } from 'features/Common';
import InfoPanel, { InfoPanelType } from 'features/InfoPanel';

import profileData from '../config/data';
import surveyData from '../config/survey';
import { getFieldLabel } from '../utils';
import {
  Wrapper,
  LeftContent,
  RightContent,
  Section,
  SectionTitle,
} from './styled';

const ProfileForm: FC = () => (
  <Wrapper>
    <LeftContent>
      <form>
        <Section>
          <SectionTitle>Generic Data</SectionTitle>
          <>
            {Object.entries(profileData.genericData).map(([field, value]) => (
              <FieldWrapper key={field}>
                <TextInput
                  name={field}
                  label={getFieldLabel(field)}
                  defaultValue={value}
                  id={field}
                  required
                  disabled
                />
              </FieldWrapper>
            ))}
          </>
        </Section>
        <Section>
          <SectionTitle>D&I Data</SectionTitle>
          <>
            {Object.entries(profileData.dniData).map(([field, value]) => (
              <FieldWrapper key={field}>
                <TextInput
                  name={field}
                  label={getFieldLabel(field)}
                  defaultValue={value}
                  id={field}
                  required
                  disabled
                />
              </FieldWrapper>
            ))}
          </>
        </Section>
      </form>
    </LeftContent>
    <RightContent>
      <InfoPanel
        type={InfoPanelType.WARNING}
        title={surveyData.title}
        content={surveyData.description}
        footnote={surveyData.footnote}
        infoLink='/'
        isSmall
      />
    </RightContent>
  </Wrapper>
);

export default ProfileForm;
