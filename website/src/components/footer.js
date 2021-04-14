import React from 'react';
import styled from '@emotion/styled';

import Container from './container';

import theme from '../theme';
import { mq } from '../utils';

const Root = styled.footer`
  background: white;
  padding-top: ${theme.space[4]};
  padding-bottom: ${theme.space[5]};
`;

const FooterGrid = styled.div`
  text-align: center;

  ${mq[2]} {
    display: flex;
    align-items: center;
    text-align: left;
  }
`;





const Info = styled.div`
  font-size: ${theme.fontsize[1]};
  color: ${theme.colors.gray};
  opacity: 0.5;

  ${mq[2]} {
    padding-left: ${theme.space[4]};
  }

  a {
    font-weight: 700;
    color: ${theme.colors.gray};
  }
`;

function Footer({ buttons }) {
  return (
    <Root>
      <Container>
        <FooterGrid>
          
          <Info>
            <p>
              <a
                href="https://docs.google.com/document/d/17gdKtmr9aCoaErCZqR1dLMHJWHSjG1nn6_NFDHkGhCU/edit?usp=sharing"
                className="text-link"
              >
               Zpracování osobních údajů
              </a>{' '}
              ·{' '}
              <a
                href="https://docs.google.com/document/d/1V_VEH_rgACdHe_YMtlsr0EA5y3kCxdjBQqVG-1MX_cs/edit?usp=sharing"
                className="text-link"
              >
                Všeobecné podmínky a pravidla webu
              </a>
            </p>
          </Info>
        </FooterGrid>
      </Container>
    </Root>
  );
}

export default Footer;
