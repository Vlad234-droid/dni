declare module '@beans/carousel' {
  declare type Props = {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
    activeItem?: number;
    ariaLabels?: {
      backwardControl: string;
      container: string;
      forwardControl: string;
      pauseControl: string;
      playControl: string;
    };
    autoPlay?: boolean;
    className?: string;
    hideControls?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onChange?: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onControlClick?: Function;
    root?: boolean;
    styles?: string[];
  };

  declare type PromoProps = {
    ariaLabels?: {
      pauseControl: string;
      playControl: string;
    } & Props['ariaLabels'];
    rotationInterval?: number;
  } & Props;
  declare type ContentProps = {
    ariaLabels?: {
      item: string;
    } & Props['ariaLabels'];
    itemName: string;
    itemWidth:
      | string
      | {
          aboveDesktop: string;
          aboveDesktopLarge: string;
          aboveMobile: string;
          aboveMobileLarge: string;
          aboveTablet: string;
          aboveTabletLarge: string;
          global: string;
        };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme?: any;
  } & Props;

  declare const PromoCarousel: React.FC<PromoProps> & {
    Container;
    CarouselItem;
    Controls;
    Control;
    ControlsContainer;
    ItemsContainer;
  };
  declare const ContentCarousel: React.FC<ContentProps>;

  export { ContentCarousel, PromoCarousel };
}
