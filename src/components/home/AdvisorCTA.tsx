import React from 'react';
import { ArrowRight, Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Block } from '../blocks/Block';
import { Reveal } from '../motion/Reveal';

interface AdvisorCTAProps {
  onOpenAdvisor: () => void;
}

// The page's closing field: one action, the visit details beside it.
export const AdvisorCTA: React.FC<AdvisorCTAProps> = ({ onOpenAdvisor }) => (
  <section id="final-cta-section" className="relative overflow-hidden bg-block-orange text-ink">
    <div className="absolute inset-0 bg-dots pointer-events-none opacity-60" aria-hidden="true" />
    <Container className="relative section-y">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-12 lg:gap-16 items-end">
        <Reveal>
          <h2 className="text-display text-ink max-w-[14ch]">Come and see a class.</h2>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-ink/85 max-w-[52ch]">
            Book a free demo class to see the lab, look through the course plan and meet the mentors. An advisor then
            suggests the right course and batch for your child.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button variant="blue" size="lg" onClick={onOpenAdvisor} rightIcon={<ArrowRight className="w-5 h-5" />}>
              Book a free demo class
            </Button>
            <Button variant="secondary" size="lg" href="/contact">
              Visit the lab
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-start gap-1 stack-depth text-[15px] sm:text-base">
          <Block color="ink" hat>
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Putalisadak, Kathmandu
          </Block>
          <Block color="white">
            <Clock className="w-4 h-4" aria-hidden="true" />
            Sunday to Friday, 7 AM to 7 PM
          </Block>
          <Block color="white" tab={false}>
            <Mail className="w-4 h-4" aria-hidden="true" />
            <a href="mailto:info@navyaedtech.com" className="underline decoration-2 underline-offset-4 hover:decoration-block-blue">
              info@navyaedtech.com
            </a>
          </Block>
        </Reveal>
      </div>
    </Container>
  </section>
);
