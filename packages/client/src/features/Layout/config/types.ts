export interface ExtraLayoutProps {
  renderMain: () => JSX.Element;
}

export interface LayoutProps extends ExtraLayoutProps {
  renderHeader: () => JSX.Element;
  renderLeft: () => JSX.Element;
}
