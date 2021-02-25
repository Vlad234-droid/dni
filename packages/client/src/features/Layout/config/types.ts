export interface ConfigLayoutProps {
  withBackground?: boolean;
  withPaddings?: boolean;
}

export interface ExtraLayoutProps extends ConfigLayoutProps {
  renderCenter: () => JSX.Element;
  renderRight?: () => JSX.Element;
}

export interface LayoutProps extends ExtraLayoutProps {
  renderHeader: () => JSX.Element;
  renderFooter: () => JSX.Element;
  renderLeft: () => JSX.Element;
}
