import { useTranslations } from 'next-intl';
import { LinkProps as NextLinkProps } from 'next/link';

import { Link } from './../../../../../navigation';
import { cn } from './../../../lib/utils/cn';
import { Button, ButtonProps } from './../components/../../Button';
import { Skeleton } from './../components/../../Skeleton/Skeleton';
import { BreakpointsList, BreakpointsListProps } from './BreakpointsList';

export type LinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  nextLinkProps?: Omit<NextLinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;
export type IntroProps = {
  title: string;
  dynamicTitle?: string;
  subTitle?: string;
  button?: { href?: string } & Pick<ButtonProps, 'children' | 'className' | 'handleClick'>;
  link?: Pick<LinkProps, 'href' | 'children'>;
  hideOnMobile?: {
    title?: boolean;
    subTitle?: boolean;
    button?: boolean;
    link?: boolean;
    breakpoints?: boolean;
  };
  dynamic?: { status: string; isLoading: boolean };
} & Pick<BreakpointsListProps, 'breakpoints'>;

export const Intro = ({
  title,
  subTitle,
  button,
  link,
  breakpoints,
  hideOnMobile,
  dynamic
}: IntroProps) => {
  const t = useTranslations('layout');

  if (dynamic && dynamic.status !== 'success' && dynamic.isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton {...{ width: 300, height: 44 }} />
        <Skeleton {...{ width: 200, height: 24 }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row">
      <div>
        <BreakpointsList {...{ breakpoints, hideOnMobile: hideOnMobile?.breakpoints }} />
        <p
          className={cn(
            'text-primary text-2xl md:text-lg md:leading-lg',
            hideOnMobile?.title && 'hidden md:block'
          )}
        >
          {t(title)}
        </p>
        {subTitle ? (
          <p className={cn('mt-2 text-gray md:mt-4', hideOnMobile?.subTitle && 'hidden md:block')}>
            {t(subTitle)}
          </p>
        ) : null}
        {link ? (
          <Link href={link.href} className={hideOnMobile?.link ? 'hidden md:block' : ''}>
            <p className="mt-2 text-navy md:mt-4">{link.children}</p>
          </Link>
        ) : null}
      </div>
      <div>
        {button ? (
          <>
            {button.href ? (
              <Link
                href={button.href}
                className={hideOnMobile?.button ? 'hidden md:block' : 'block'}
              >
                <Button fullWidth={true}>{button.children}</Button>
              </Link>
            ) : (
              <Button handleClick={button.handleClick} fullWidth={true}>
                {button.children}
              </Button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
