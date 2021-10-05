import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Accordion, AccordionGroup } from '@beans/accordion';
import { Partner as PartnerType } from '../../config/formFields';
import Partner from '../Partner';
// import CreatePartner from '../CreatePartner';

type Props = {
  partners: Array<PartnerType>;
};

type AccordionState = { action: string; id: number };

const PartnerList = ({ partners }: Props) => {
  const [accordion, setAccordion] = useState<AccordionState | undefined>();
  const handleChange = ({ action, id }: AccordionState) => {
    if (action) {
      setAccordion({ action, id });
    }
  };

  useEffect(() => {
    return () => console.log('unmount');
  });
  
  return (
    <Wrapper>
      <AccordionGroup accordion={accordion} onChange={handleChange}>
        {partners.map((p) => (
          <Accordion
            onChange={console.log}
            key={p.id}
            id={p.id}
            label={<Partner partner={p} />}
          >
            {/* <CreatePartner
              partner={p}
              onCancel={() => setAccordion(undefined)}
            /> */}
          </Accordion>
        ))}
      </AccordionGroup>
    </Wrapper>
  );
};

export default PartnerList;

const Wrapper = styled.div`
  background: white;
`;
