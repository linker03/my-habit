import clsx from 'clsx';
import type { SVGProps } from 'react';
import style from './icon.module.css';

interface IIconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

const Icon = ({ name, ...props }: IIconProps) => {
  return (
    <svg
      role="img"
      aria-label="icon"
      {...props}
      className={clsx(props.className, style.icon, style.small)}
    >
      <use href={`icons/${name}.svg#${name}`} />
    </svg>
  );
};

export { Icon };
