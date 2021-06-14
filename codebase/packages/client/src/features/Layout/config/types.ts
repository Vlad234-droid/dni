export interface ExtraLayoutProps {
  renderMain: () => JSX.Element;
}

export interface LayoutProps extends ExtraLayoutProps {
  renderTopHeader: () => JSX.Element;
  renderMainHeader: () => JSX.Element;
  renderHeader: () => JSX.Element;
  renderLeft: () => JSX.Element;
}
