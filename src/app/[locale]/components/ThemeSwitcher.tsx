'use client';

import { useTheme } from 'next-themes';
import { ComponentProps } from 'react';

import { Icons } from './Icons';
type ThemeSwitcherProps = {
  className?: ComponentProps<'button'>['className'];
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <button className={className} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Icons.sun className="dark:hidden" />
      <Icons.moon className="hidden dark:block" />
    </button>
  );
};
