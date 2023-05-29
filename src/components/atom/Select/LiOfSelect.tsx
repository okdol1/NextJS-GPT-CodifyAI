import { MouseEvent, PropsWithChildren } from "react";

interface P extends PropsWithChildren, React.HTMLProps<HTMLLIElement> {
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
}

const LiOfSelect: React.FC<P> = ({ onClick, children, ...props }) => {
  return (
    <li
      className={`flex py-3 px-5 items-center cursor-pointer rounded-default hover:bg-grey-100
    `}
      onClick={onClick}
      {...props}
    >
      {children}
    </li>
  );
};

export default LiOfSelect;
