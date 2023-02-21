import React, { FC, Fragment, memo } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

interface IProps extends IContentLoaderProps {
  loading?: boolean;
  rows?: number;
}

export const Loader: FC<IProps> = memo(({ loading, rows = 5, ...rest }) => {
  const rowHeight = 60;

  if (!loading) return null;

  return (
    <ContentLoader viewBox={`0 0 1500 ${rowHeight * rows}`} {...rest}>
      {new Array(rows).fill(" ").map((el, index) => {
        const contentVerticalPosition = (contentHeight: number) =>
          rows > 1 ? contentHeight + rowHeight * index : contentHeight;
        return (
          <Fragment key={index}>
            <rect
              x="0"
              y={`${contentVerticalPosition(20)}`}
              rx="10"
              ry="4"
              width="24%"
              height="20"
            />
            <rect
              x="25%"
              y={`${contentVerticalPosition(20)}`}
              rx="10"
              ry="4"
              width="24%"
              height="20"
            />
            <rect
              x="50%"
              y={`${contentVerticalPosition(20)}`}
              rx="10"
              ry="4"
              width="24%"
              height="20"
            />
            <rect
              x="75%"
              y={`${contentVerticalPosition(20)}`}
              rx="10"
              ry="4"
              width="24%"
              height="20"
            />
          </Fragment>
        );
      })}
    </ContentLoader>
  );
});
