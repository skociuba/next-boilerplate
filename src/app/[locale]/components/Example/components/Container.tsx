import { cn } from './../../../lib/utils/cn';

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => (
  <div className={cn('mx-auto w-full max-w-screen-lg px-7', 'md:px-9 lg:px-0', className)}>
    {children}
  </div>
);
