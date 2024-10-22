import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { Link } from './../../../../../navigation';
import { cn } from './../../../lib/utils/cn';

export type BreakpointsListProps = {
  breakpoints?: { href?: string; dynamic?: boolean; children?: ReactNode }[];
  hideOnMobile?: boolean;
};

export const BreakpointsList = ({ breakpoints, hideOnMobile }: BreakpointsListProps) => {
  const t = useTranslations('breakpoints');

  if (!breakpoints) {
    return null;
  }

  return (
    <p className={cn('text-primary flex gap-1 pb-[14px] text-base', hideOnMobile && 'hidden')}>
      {breakpoints.map(({ href, children, dynamic }, index) => (
        <span key={`${href}-${index}`} className={cn('flex gap-1', !href && 'text-gray')}>
          {href ? (
            <Link {...{ href, className: 'text-black' }}>
              {dynamic ? children : t(`panel.links.${children}`)}
            </Link>
          ) : dynamic ? (
            children
          ) : (
            t(`panel.links.${children}`)
          )}
          {index + 1 < breakpoints.length ? <span className="text-gray">&gt;</span> : null}
        </span>
      ))}
    </p>
  );
};
