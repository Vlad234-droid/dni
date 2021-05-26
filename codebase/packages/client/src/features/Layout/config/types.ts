export interface ExtraLayoutProps {
  renderMain: () => JSX.Element;
  withBackground?: boolean;
}

export interface LayoutProps extends ExtraLayoutProps {
  renderHeader: () => JSX.Element;
  renderLeft: () => JSX.Element;
}
